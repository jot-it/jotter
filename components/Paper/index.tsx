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
import theme from "./theme";

import dynamic from "next/dynamic";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

const CollaborationPlugin = dynamic(
  () =>
    import("@lexical/react/LexicalCollaborationPlugin").then(
      (module) => module.CollaborationPlugin
    ),
  { ssr: false }
);

function initialEditorState(editor: LexicalEditor): void {
  const root = $getRoot();
  const paragraph = $createParagraphNode();
  const text = $createTextNode("Welcome to collab!");
  paragraph.append(text);
  root.append(paragraph);
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

function Paper() {
  return (
    <div className="flex justify-center py-6">
      <div className="min-h-[1056px] w-[816px] bg-white py-12 px-10 shadow-xl">
        <LexicalComposer initialConfig={editorConfig}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="focus:outline-none" />}
            placeholder={<></>}
            ErrorBoundary={ErrorBoundary}
          />
          <AutoFocusPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <CollaborationPlugin
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
            shouldBootstrap={true}
          />
        </LexicalComposer>
      </div>
    </div>
  );
}

export default Paper;
