"use client";
import editorConfig from "@/config/editor-config";
import { useSelf } from "@/lib/collaboration";
import LexicalAutoLinkPlugin from "@/plugins/AutolinkPlugin";
import CodeActionsPlugin from "@/plugins/CodeActionPlugin/CodeActionPlugin";
import CodeHighlightPlugin from "@/plugins/CodeHighlightPlugin";
import { ImagePlugin } from "@/plugins/ImagePlugin";
import ListMaxIndentLevelPlugin from "@/plugins/ListMaxIndentLevelPlugin";
import MarkdownShortcutsPlugin from "@/plugins/MarkdownShortcutPlugin";
import ToolbarPlugin from "@/plugins/ToolbarPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import ErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import dynamic from "next/dynamic";
import { lazy, useCallback, useState } from "react";

const ComponentPickerPlugin = dynamic(
  () => import("@/plugins/CommandPickerPlugin"),
  { ssr: false },
);

const CollaborationPlugin = dynamic(
  () => import("@/plugins/CollaborationPlugin"),
  { ssr: false },
);

const TreeViewPlugin = lazy(() => import("@/plugins/TreeViewPlugin"));

type EditorProps = {
  documentId: string;
};

function Editor(props: EditorProps) {
  const [editorContainer, setEditorContainer] = useState<HTMLDivElement>();

  const onRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setEditorContainer(node);
    }
  }, []);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div
        className="prose relative mx-auto my-12 max-w-3xl px-4 pb-7 dark:prose-invert 
      prose-code:before:content-none prose-code:after:content-none lg:pb-0"
        ref={onRef}
      >
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
        <MarkdownShortcutsPlugin />
        <CodeHighlightPlugin />
        <HistoryPlugin />

        {editorContainer && (
          <>
            <ToolbarPlugin container={editorContainer} />
            <ComponentPickerPlugin container={editorContainer} />
          </>
        )}
        {process.env.NODE_ENV === "development" && <TreeViewPlugin />}
        <CodeActionsPlugin />
        <ListPlugin />
        <ListMaxIndentLevelPlugin />
        <TabIndentationPlugin />
        <ImagePlugin />
        <CollaborationPlugin id={props.documentId} />

        <CheckListPlugin />
      </div>
    </LexicalComposer>
  );
}

export default Editor;
