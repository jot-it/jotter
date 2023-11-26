import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  insertList,
  removeList,
} from "@lexical/list";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  LexicalCommand,
  LexicalEditor,
  TextFormatType,
  createCommand,
} from "lexical";
import { useCallback, useEffect } from "react";
import { formatSelectionAs } from "../ToolbarPlugin/utils";
import { $getTextNodeForSeach } from "./utils";
import { $createCodeNode } from "@lexical/code";

export const INSERT_HEADING_COMMAND: LexicalCommand<string> = createCommand(
  "INSERT_HEADING_COMMAND",
);

export const INSERT_BLOCKQUOTE_COMMAND: LexicalCommand<void> = createCommand(
  "INSERT_BLOCKQUOTE_COMMAND",
);

export const REMOVE_CARET_COMMAND: LexicalCommand<void> = createCommand(
  "REMOVE_CARET_COMMAND",
);

export const CLEAR_FORMAT_TEXT_COMMAND: LexicalCommand<void> = createCommand(
  "CLEAR_FORMAT_TEXT_COMMAND",
);

export const INSERT_CODE_NODE_COMMAND: LexicalCommand<void> = createCommand(
  "INSERT_CODE_NODE_COMMAND",
);

export const FORMAT_PARAGRAPH_COMMAND: LexicalCommand<void> = createCommand(
  "FORMAT_PARAGRAPH_COMMAND",
);

export function useListCommand(editor: LexicalEditor) {
  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_ORDERED_LIST_COMMAND,
        () => {
          insertList(editor, "number");
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        INSERT_UNORDERED_LIST_COMMAND,
        () => {
          insertList(editor, "bullet");
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        REMOVE_LIST_COMMAND,
        () => {
          removeList(editor);
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor]);
}

export function useHeadingCommand(editor: LexicalEditor) {
  const formatHeading = useCallback(
    (headingSize: HeadingTagType) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
      return false;
    },
    [editor],
  );

  useEffect(() => {
    return editor.registerCommand(
      INSERT_HEADING_COMMAND,
      formatHeading,
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, formatHeading]);
}

export function useRemoveCaretCommand(editor: LexicalEditor) {
  const handleRemoveCommandString = useCallback(() => {
    editor.update(() => {
      const textNode = $getTextNodeForSeach();
      if (!textNode) {
        return false;
      }
      const textContent = textNode.getTextContent();
      const newText = textContent.replace(/(?<=\s|\B)\/[a-zA-Z]*\d*/, "");
      textNode.setTextContent(newText);
      textNode.select();
    });

    return true;
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      REMOVE_CARET_COMMAND,
      handleRemoveCommandString,
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, handleRemoveCommandString]);
}

export function useBlockQuoteCommand(editor: LexicalEditor) {
  const InsertBLockQuote = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
    return false;
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      INSERT_BLOCKQUOTE_COMMAND,
      InsertBLockQuote,
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, InsertBLockQuote]);
}

export function useParagraph(editor: LexicalEditor) {
  const handleInsert = useCallback(() => {
    formatSelectionAs(editor, $createParagraphNode);
    return true;
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      FORMAT_PARAGRAPH_COMMAND,
      handleInsert,
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, handleInsert]);
}

export function useCodeNode(editor: LexicalEditor) {
  const InsertCodeNode = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode("js"));
      }
    });
    return false;
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      INSERT_CODE_NODE_COMMAND,
      InsertCodeNode,
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, InsertCodeNode]);
}

export function useClearformatText(editor: LexicalEditor) {
  const handleClearFormat = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      const node = $getTextNodeForSeach();

      const styles: TextFormatType[] = [
        "bold",
        "italic",
        "highlight",
        "strikethrough",
        "code",
        "underline",
      ];

      if (!$isRangeSelection(selection)) {
        return false;
      }

      if (!node) {
        return false;
      }

      styles.map((style) => {
        if (node.hasFormat(style)) {
          selection.toggleFormat(style);
        }
      });
    });
    return true;
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      CLEAR_FORMAT_TEXT_COMMAND,
      handleClearFormat,
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, handleClearFormat]);
}
