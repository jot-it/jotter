import useMatchMedia from "@/hooks/useMatchMedia";
import { $isCodeHighlightNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
  BaseSelection,
  COMMAND_PRIORITY_EDITOR,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import useLexicalCommand from "../useLexicalCommand";
import Toolbar from "./Toolbar";
import { getSelectedNode } from "./utils";

type ToolbarPluginProps = {
  /**
   * The container surrounding the editor.
   * This is used to calculate the position of the toolbar, so it must have
   * `position: relative`
   */
  container: HTMLDivElement;
};

function ToolbarPlugin(props: ToolbarPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [show, setShow] = useState(false);
  const isMobileScreen = useMatchMedia("(max-width: 1023px)");

  const updateToolbarVisibility = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      setShow(isSelectionInside(editor) && isTextualSelection(selection));
    });
  }, [editor]);

  useLexicalCommand(
    SELECTION_CHANGE_COMMAND,
    () => {
      updateToolbarVisibility();
      return true;
    },
    COMMAND_PRIORITY_EDITOR,
  );

  useEffect(() => {
    document.addEventListener("selectionchange", updateToolbarVisibility);
    return () => {
      document.removeEventListener("selectionchange", updateToolbarVisibility);
    };
  }, [editor, updateToolbarVisibility]);

  if (!show && !isMobileScreen) {
    return null;
  }

  return <Toolbar {...props} editor={editor} fixedBottom={isMobileScreen} />;
}

function isSelectionInside(editor: LexicalEditor) {
  const selection = window.getSelection();
  const editorRoot = editor.getRootElement();
  const hasSelection = selection && !selection.isCollapsed;
  return Boolean(hasSelection && editorRoot?.contains(selection.anchorNode));
}

function isTextualSelection(selection: BaseSelection | null): boolean {
  if (!$isRangeSelection(selection)) {
    return false;
  }
  const selectedNode = getSelectedNode(selection);
  if ($isCodeHighlightNode(selectedNode)) {
    return false;
  }
  return $isParagraphNode(selectedNode) || $isTextNode(selectedNode);
}

export default ToolbarPlugin;
