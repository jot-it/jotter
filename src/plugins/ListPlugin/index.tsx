import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ENTER_COMMAND,
} from "lexical";
import { useCallback, useEffect } from "react";

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
        if (node.getType() !== "listitem") {
          return;
        }

        const content = node.getTextContent();

        if (content) {
          return;
        }

        $setBlocksType(selection, () => {
          const newParagph = $createParagraphNode();
          newParagph.select();
          return newParagph;
        });

        oldEvent.preventDefault();
      });
      return true;
    },
    [editor],
  );

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      handlePressEnter,
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, handlePressEnter]);
  return null;
}
