"use client";
import ToolbarPlugin from "@/plugins/ToolbarPlugin";
import TreeViewPlugin from "@/plugins/TreeViewPlugin";
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
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $createHeadingNode, HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { $getRoot, LexicalEditor } from "lexical";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import theme from "./theme";
import AutoLinkPlugin from "@/plugins/AutolinkPlugin";
import { ListEndPlugin } from "@/plugins/ListPlugin";

const ComponentPickerPlugin = dynamic(
  () => import("@/plugins/CommandPickerPlugin"),
  { ssr: false },
);

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

const CollaborationPlugin = dynamic(
  () =>
    import("@lexical/react/LexicalCollaborationPlugin").then(
      (module) => module.CollaborationPlugin,
    ),
  { ssr: false },
);

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
      className="prose relative mx-auto my-12 max-w-3xl px-4 pb-7 dark:prose-invert lg:pb-0"
      ref={onRef}
    >
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="focus:outline-none" />}
          placeholder={
            <p className="absolute left-4 top-0 m-0 dark:text-gray-400">
              Press{" "}
              <span className="rounded bg-gray-200 px-2 py-1 dark:bg-slate-800">
                /
              </span>{" "}
              for commands...
            </p>
          }
          ErrorBoundary={ErrorBoundary}
        />
        <AutoFocusPlugin />
        <AutoLinkPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <HistoryPlugin />
        <ListEndPlugin />

        {editorContainer ? (
          <>
            <ToolbarPlugin container={editorContainer} />
            <ComponentPickerPlugin container={editorContainer} />
          </>
        ) : (
          <></>
        )}

        {process.env.NODE_ENV === "development" ? <TreeViewPlugin /> : <></>}

        {/* <CollaborationPlugin
            id="yjs-plugin"
            providerFactory={(id, yjsDocMap) => {
              const doc = new Y.Doc();
              yjsDocMap.set(id, doc);

              const provider = new WebsocketProvider(
                "ws://localhost:1234",
                id,
                doc
              );
              return provider;
            }}
            // Optional initial editor state in case collaborative Y.Doc won't
            // have any existing data on server. Then it'll user this value to populate editor.
            // It accepts same type of values as LexicalComposer editorState
            // prop (json string, state object, or a function)
            initialEditorState={initialEditorState}
            shouldBootstrap={false}
          />
        )} */}
      </LexicalComposer>
    </div>
  );
}

export default Editor;
