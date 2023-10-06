import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ENTER_COMMAND,
} from "lexical";
import { useCallback } from "react";
import useLexicalCommand from "../useLexicalCommand";

export function ListEndPlugin() {
  const [editor] = useLexicalComposerContext();

  const handlePressEnter = useCallback(
    (oldEvent: KeyboardEvent) => {
      editor.update(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          return;
        }

        const node = selection.getNodes()[0];
        const isListitem = node.getType() === "listitem";
        const content = node.getTextContent();

        if (isListitem && !content) {
          $setBlocksType(selection, () => {
            const newParagph = $createParagraphNode();
            newParagph.select();
            return newParagph;
          });
          oldEvent.preventDefault();
        }
      });
      return false;
    },
    [editor],
  );

  useLexicalCommand(KEY_ENTER_COMMAND, handlePressEnter, COMMAND_PRIORITY_LOW);
  return null;
}
