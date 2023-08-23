import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  KEY_ENTER_COMMAND,
} from "lexical";
import { useCallback, useEffect } from "react";

// TODO: List Depth
// INDENT_CONTENT_COMMAND,
// COMMAND_PRIORITY_CRITICAL

export function ListEndPlugin() {
  const [editor] = useLexicalComposerContext();

  const handlePressEnter = useCallback(() => {
    editor.update(() => {
      const paragraph = $createParagraphNode();
      const selection = $getSelection();

      if (!$isRangeSelection(selection)) {
        return;
      }
      const node = selection.getNodes()[0];

      if (node.getType() !== "listitem") {
        return;
      }
      const content = node.getTextContent();

      if (content) {
        return;
      }

      node.insertBefore(paragraph);
      node.remove();
    });

    return true;
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      handlePressEnter,
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, handlePressEnter]);
  return null;
}
