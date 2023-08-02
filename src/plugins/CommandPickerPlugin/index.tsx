import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

import { useCallback, useEffect, useState, useTransition } from "react";
import {
  RiBold as BoldIcon,
  RiText as ClearFormatTextIcon,
  RiCodeSSlashLine as CodeIcon,
  RiHeading as HeadingIcon,
  RiItalic as ItalicIcon,
  RiDoubleQuotesR as QuoteIcon,
  RiStrikethrough as StrikethroughIcon,
  RiUnderline as UnderlineIcon,
} from "react-icons/ri";
import CommandPicker from "./CommandPicker";
import {
  CLEAR_FORMAT_TEXT_COMMAND,
  FORMAT_PARAGRAPH_COMMAND,
  INSERT_BLOCKQUOTE_COMMAND,
  INSERT_HEADING_COMMAND,
  REMOVE_CARECT_COMMAND,
  useBlockQuoteCommand,
  useClearformatText,
  useHeadingCommand,
  useListCommand,
  useParagraph,
  useRemoveCaretCommand,
} from "./commads";
import { $getQueryTextForSearch } from "./utils";

import {
  GoListUnordered as ListIcon,
  GoListOrdered as OrderedListIcon,
} from "react-icons/go";

import { BsTextParagraph as ParagraphIcon } from "react-icons/bs";

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { createContext } from "react";

export const CommandPickeContext = createContext("");

export type ComponentPickerMenuPluginProps = {
  /**
   * The container surrounding the editor.
   */
  container: HTMLDivElement;
};

export default function ComponentPickerMenuPlugin({
  container,
}: ComponentPickerMenuPluginProps) {
  const [editor] = useLexicalComposerContext();

  const [command, setCommand] = useState("");
  const [show, setShow] = useState(false);

  const [_isPending, startTransition] = useTransition();

  useListCommand(editor);
  useHeadingCommand(editor);
  useClearformatText(editor);
  useParagraph(editor);
  useBlockQuoteCommand(editor);
  useRemoveCaretCommand(editor);

  const withHideCaret = (fn: () => void) => {
    fn();
    editor.dispatchCommand(REMOVE_CARECT_COMMAND, undefined);
  };

  const handleSelectionChanged = useCallback(() => {
    editor.getEditorState().read(() => {
      const queryText = $getQueryTextForSearch();
      const selectionString = queryText ?? "";

      const matcher = /(?<=\s|\B)\/([a-zA-Z]*\d*)$/;
      const foundMatch = matcher.exec(selectionString);
      const canShow = Boolean(foundMatch?.[0]);
      const command = foundMatch?.[1].toLowerCase() ?? "";

      // Optimization
      startTransition(() => {
        setCommand(command);
      });

      setShow(canShow);
    });

    return false;
  }, [editor]);

  useEffect(() => {
    editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      handleSelectionChanged,
      COMMAND_PRIORITY_LOW
    );
  }, [editor, handleSelectionChanged]);

  // Close Commponet Picker
  useEffect(() => {
    editor.registerCommand<KeyboardEvent>(
      KEY_ESCAPE_COMMAND,
      () => {
        setShow(false);
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return (
    <CommandPicker container={container} query={command} show={show}>
      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(FORMAT_PARAGRAPH_COMMAND, undefined)
          )
        }
        keywords="normal text clear unformat paragraph"
      >
        <ParagraphIcon />
        {"Paragraph"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(INSERT_HEADING_COMMAND, "H1")
          )
        }
        keywords="heading h1 header tittle"
      >
        <HeadingIcon />
        {"Heading 1"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(INSERT_HEADING_COMMAND, "h2")
          )
        }
        keywords="heading h2 header tittle subtittle"
      >
        <HeadingIcon />
        {"Heading 2"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(INSERT_HEADING_COMMAND, "h3")
          )
        }
        keywords="heading h3 header tittle subtittle"
      >
        <HeadingIcon />
        {"Heading 3"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
          )
        }
        keywords="list bullet unordered ul"
      >
        <ListIcon />
        {"List"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
          )
        }
        keywords="list numbered ordered ol"
      >
        <OrderedListIcon />
        {"Ordered List"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
          )
        }
        keywords="code codeblock javascript python js"
      >
        <CodeIcon />
        {"Code"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(INSERT_BLOCKQUOTE_COMMAND, undefined)
          )
        }
        keywords="quote block blockquote"
      >
        <QuoteIcon />
        {"Quote"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(CLEAR_FORMAT_TEXT_COMMAND, undefined)
          )
        }
        keywords="normal text clear unformat"
      >
        <ClearFormatTextIcon />
        {"Normal"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          editor.dispatchCommand(REMOVE_CARECT_COMMAND, undefined);
        }}
        keywords="bold strong"
      >
        <BoldIcon />
        {"Bold"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
          )
        }
        keywords="italic oblique"
      >
        <ItalicIcon />
        {"Italic"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          )
        }
        keywords="underline underscore mark"
      >
        <UnderlineIcon />
        {"Underline"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          withHideCaret(() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
          )
        }
        keywords="strikethrough cross out"
      >
        <StrikethroughIcon />
        {"Strikethrough"}
      </CommandPicker.Command>
    </CommandPicker>
  );
}
