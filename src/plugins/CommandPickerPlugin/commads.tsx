import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_NORMAL,
  CommandListener,
  DEPRECATED_$isGridSelection,
  FORMAT_TEXT_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
  KEY_MODIFIER_COMMAND,
  LexicalCommand,
  LexicalEditor,
  TextFormatType,
  createCommand,
} from "lexical";
import { $createLinkNode } from "@lexical/link";
import { useCallback, useEffect } from "react";
import {
  INSERT_ORDERED_LIST_COMMAND,
  insertList,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  removeList,
  ListType,
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import {
  HeadingTagType,
  $createHeadingNode,
  $createQuoteNode,
} from "@lexical/rich-text";
import { $isLinkNode, TOGGLE_LINK_COMMAND, toggleLink } from "@lexical/link";
import { $getTextNodeForSeach } from "./utils";
import { formatSelectionAs } from "../ToolbarPlugin/utils";

export const INSERT_HEANDING_COMMAND: LexicalCommand<string> = createCommand(
  "INSERT_HEANDING_COMMAND"
);

export const INSERT_BLOCKQUOTE_COMMAND: LexicalCommand<void> = createCommand(
  "INSERT_BLOCKQUOTE_COMMAND"
);

export const REMOVE_CARECT_COMMAND: LexicalCommand<void> = createCommand(
  "REMOVE_CARECT_COMMAND"
);

export const CLEAR_FORMAT_TEXT_COMMAND: LexicalCommand<void> = createCommand(
  "CLEAR_FORMAT_TEXT_COMMAND"
);

export const FORMAT_PARAGRAPH_COMMAND: LexicalCommand<void> = createCommand(
  "FORMAT_PARAGRAPH_COMMAND"
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
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        INSERT_UNORDERED_LIST_COMMAND,
        () => {
          insertList(editor, "bullet");
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        REMOVE_LIST_COMMAND,
        () => {
          removeList(editor);
          return true;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor]);
}

export function useHeadingCommand(editor: LexicalEditor) {
  const formatHeading = useCallback(
    (headingSize: HeadingTagType) => {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
      return false;
    },
    [editor]
  );

  useEffect(() => {
    return editor.registerCommand(
      INSERT_HEANDING_COMMAND,
      formatHeading,
      COMMAND_PRIORITY_LOW
    );
  }, [editor, formatHeading]);
}

export function useRemoveCarectCommand(editor: LexicalEditor) {
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
    editor.registerCommand(
      REMOVE_CARECT_COMMAND,
      handleRemoveCommandString,
      COMMAND_PRIORITY_LOW
    );
  }, [editor, handleRemoveCommandString]);
}

export function useBlockQuoteCommand(editor: LexicalEditor) {
  const InsertBLockQuote = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
    return false;
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      INSERT_BLOCKQUOTE_COMMAND,
      InsertBLockQuote,
      COMMAND_PRIORITY_LOW
    );
  }, [editor, InsertBLockQuote]);
}


export function useParagraph(editor: LexicalEditor) {
  const handleInsert = useCallback(()=>{
    formatSelectionAs(editor, $createParagraphNode);
    return true;
  },[editor])
  
useEffect(()=>{
  return editor.registerCommand(
    FORMAT_PARAGRAPH_COMMAND,
    handleInsert,
    COMMAND_PRIORITY_LOW
  );
},[editor, handleInsert])
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
      COMMAND_PRIORITY_LOW
    );
  }, [editor, handleClearFormat]);
}

// export function useLinkCommand(editor: LexicalEditor) {
//   useEffect(() => {
//     editor.registerCommand(
//       TOGGLE_LINK_COMMAND,
//       (payload) => {
//         if (payload === null) {
//           toggleLink(payload);
//         } else if (typeof payload === "string") {
//           toggleLink(payload);
//           return true;
//         }
//         return true;
//       },
//       COMMAND_PRIORITY_LOW
//     );
//   }, [editor]);
// }