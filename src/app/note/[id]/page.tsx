"use client";
import NoSSR from "@/components/NoSSR";
import ToolbarPlugin from "@/plugins/ToolbarPlugin";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import ErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  LexicalEditor,
} from "lexical";
import {$createHeadingNode} from "@lexical/rich-text"
import { WebsocketProvider } from "y-websocket";
import {CollaborationPlugin} from "@lexical/react/LexicalCollaborationPlugin";
import { useCallback, useState } from "react";
import theme from "./theme";
import * as Y from "yjs";
import { useParams } from "next/navigation";

function initialEditorState(editor: LexicalEditor): void {
  const root = $getRoot();
  const headingPlaceholder = $createHeadingNode("h1");
  root.append(headingPlaceholder);
}

const editorConfig: InitialConfigType = {
  editorState: null,
  namespace: "My Editor",
  theme,
  onError(error, editor) {
    console.log(error);
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

function Editor() {
  const [editorContainer, setEditorContainer] = useState<HTMLDivElement>();
  const params = useParams();

  const onRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setEditorContainer(node);
    }
  }, []);
  
  return (
    <div
      className="prose relative mx-auto my-12 max-w-3xl px-4 dark:prose-invert pb-7 lg:pb-0"
      ref={onRef}
    >
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="focus:outline-none" />}
          placeholder={
            <p className="absolute left-4 top-0 m-0 dark:text-gray-400">
              Begin your story...
            </p>
          }
          ErrorBoundary={ErrorBoundary}
        />
        <AutoFocusPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

        {editorContainer ? <ToolbarPlugin container={editorContainer} />: <></>}
        <NoSSR>
          <CollaborationPlugin
            id={params.id}
            //@ts-expect-error LexicalComposer doesn't have a type for this
            providerFactory={(id, yjsDocMap) => {
              const doc = new Y.Doc();
              yjsDocMap.set(id, doc);

              const provider = new WebsocketProvider(
                "ws://localhost:1234",
                id,
                doc,
              );
              return provider;
            }}
            // Optional initial editor state in case collaborative Y.Doc won't
            // have any existing data on server. Then it'll user this value to populate editor.
            // It accepts same type of values as LexicalComposer editorState
            // prop (json string, state object, or a function)
            initialEditorState={initialEditorState}
            shouldBootstrap={true}
          />
        </NoSSR>
      </LexicalComposer>
    </div>
  );
}

export default Editor;
