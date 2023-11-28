"use client";
import { useSelf } from "@/lib/userStore";
import LexicalAutoLinkPlugin from "@/plugins/AutolinkPlugin";
import CodeHighlightPlugin from "@/plugins/CodeHighlightPlugin";
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
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import dynamic from "next/dynamic";
import { lazy, useCallback, useState } from "react";
import theme from "./theme";
import CodeActionsPlugin from "@/plugins/CodeActionPlugin/CodeActionPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import ListMaxIndentLevelPlugin from "@/plugins/ListMaxIndentLevelPlugin";
import { useAtomValue } from "jotai";
import { isCollabAtom } from "@/lib/collaboration";

const ComponentPickerPlugin = dynamic(
  () => import("@/plugins/CommandPickerPlugin"),
  { ssr: false },
);

const CollaborationPlugin = dynamic(
  () => import("@/plugins/CollaborationPlugin"),
  { ssr: false },
);
const TreeViewPlugin = lazy(() => import("@/plugins/TreeViewPlugin"));

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
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    CodeNode,
  ],
};

function Editor({ params }: { params: { id: string } }) {
  const [editorContainer, setEditorContainer] = useState<HTMLDivElement>();
  const documentId = params.id;
  const user = useSelf();
  const isCollab = useAtomValue(isCollabAtom);

  const onRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setEditorContainer(node);
    }
  }, []);

  return (
    <div
      className="prose relative mx-auto my-12 max-w-3xl px-4 pb-7 dark:prose-invert 
      prose-code:block prose-code:rounded-md prose-code:border prose-code:border-slate-700 prose-code:bg-neutral-900
      prose-code:p-4 prose-code:pt-10 prose-code:before:content-none prose-code:after:content-none lg:pb-0"
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
        <LexicalAutoLinkPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <CodeHighlightPlugin />
        <HistoryPlugin />

        {editorContainer ? (
          <>
            <ToolbarPlugin container={editorContainer} />
            <ComponentPickerPlugin container={editorContainer} />
          </>
        ) : (
          <></>
        )}
        {process.env.NODE_ENV === "development" ? <TreeViewPlugin /> : <></>}
        <CodeActionsPlugin />
        <ListPlugin />
        <ListMaxIndentLevelPlugin />
        <TabIndentationPlugin />

        {isCollab ? (
          <>
            <CollaborationPlugin
              id={documentId}
              username={user?.name}
              cursorColor={user?.color}
            />
          </>
        ) : (
          <></>
        )}
      </LexicalComposer>
    </div>
  );
}

export default Editor;
