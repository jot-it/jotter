"use client";
import editorConfig from "@/config/editor";
import { useSelf } from "@/lib/userStore";
import LexicalAutoLinkPlugin from "@/plugins/AutolinkPlugin";
import CodeActionsPlugin from "@/plugins/CodeActionPlugin/CodeActionPlugin";
import CodeHighlightPlugin from "@/plugins/CodeHighlightPlugin";
import { ImagePlugin } from "@/plugins/ImagePlugin";
import ListMaxIndentLevelPlugin from "@/plugins/ListMaxIndentLevelPlugin";
import MARKDOWN_TRANFORMS from "@/plugins/MarkdownShortcutPlugin/transformers";
import ToolbarPlugin from "@/plugins/ToolbarPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import ErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import dynamic from "next/dynamic";
import { lazy, useCallback, useMemo, useState } from "react";
import useGettingStarted from "./useGettingStarted";

type BaseEditor = {
  initialConfig?: InitialConfigType;

  /**
   * The initial state of an empty editor as a markdown-formatted string
   */
  initialMarkdown?: string;
};

type EditorWithCollab = BaseEditor & {
  documentId: string;
  collaboration: boolean;
};

type EditorProps = BaseEditor | EditorWithCollab;

const ComponentPickerPlugin = dynamic(
  () => import("@/plugins/CommandPickerPlugin"),
  { ssr: false },
);

const CollaborationPlugin = dynamic(
  () => import("@/plugins/CollaborationPlugin"),
  { ssr: false },
);

const TreeViewPlugin = lazy(() => import("@/plugins/TreeViewPlugin"));

function Editor(props: EditorProps) {
  const user = useSelf();
  const [editorContainer, setEditorContainer] = useState<HTMLDivElement>();
  const isCollab = "collaboration" in props && props.collaboration;
  const initialTutorial = useGettingStarted(props.initialMarkdown);

  const config = useMemo(() => {
    return {
      ...editorConfig,
      editorState: isCollab ? null : initialTutorial,
    };
  }, [initialTutorial, isCollab]);

  const onRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setEditorContainer(node);
    }
  }, []);

  return (
    <LexicalComposer initialConfig={config}>
      <div
        className="prose relative mx-auto my-12 max-w-3xl px-4 pb-7 dark:prose-invert 
      prose-code:block prose-code:rounded-md prose-code:border prose-code:border-slate-700 prose-code:bg-neutral-900
      prose-code:p-4 prose-code:pt-10 prose-code:before:content-none prose-code:after:content-none lg:pb-0"
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
        <MarkdownShortcutPlugin transformers={MARKDOWN_TRANFORMS} />
        <CodeHighlightPlugin />
        <HistoryPlugin />

        {editorContainer && (
          <>
            <ToolbarPlugin container={editorContainer} />
            <ComponentPickerPlugin container={editorContainer} />
          </>
        )}
        {process.env.NODE_ENV === "development" ? <TreeViewPlugin /> : <></>}
        <CodeActionsPlugin />
        <ListPlugin />
        <ListMaxIndentLevelPlugin />
        <TabIndentationPlugin />
        <ImagePlugin />
        {isCollab && (
          <CollaborationPlugin
            id={props.documentId}
            username={user?.name}
            cursorColor={user?.color}
            initialEditorState={initialTutorial}
          />
        )}
      </div>
    </LexicalComposer>
  );
}

export default Editor;
