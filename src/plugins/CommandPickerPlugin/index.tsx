import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND
} from "lexical";

import { useRef, useState, useTransition } from "react";
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
  REMOVE_CARET_COMMAND,
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
import useLexicalCommand from "../useLexicalCommand";

export const CommandPickeContext = createContext("");

export type ComponentPickerMenuPluginProps = {
  /**
   * The container surrounding the editor.
   */
  container: HTMLDivElement;
};

const COMMAND_PICKER_REGEX = /(?<=\s|\B)\/([a-zA-Z]*\d*)$/;

export default function ComponentPickerMenuPlugin({
  container,
}: ComponentPickerMenuPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [command, setCommand] = useState("");
  const [show, setShow] = useState(false);
  const [_isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useListCommand(editor);
  useHeadingCommand(editor);
  useClearformatText(editor);
  useParagraph(editor);
  useBlockQuoteCommand(editor);
  useRemoveCaretCommand(editor);

  const withHideCaret = (fn: () => void) => {
    return () => {
      fn();
      editor.dispatchCommand(REMOVE_CARET_COMMAND, undefined);
    };
  };

  const handleSelectionChanged = () => {
    editor.getEditorState().read(() => {
      const queryText = $getQueryTextForSearch();
      const selectionString = queryText ?? "";

      const matcher = COMMAND_PICKER_REGEX;
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
  };

  const forwardCommandMenuEvent = (oldEvent: KeyboardEvent | null) => {
    const commandMenu = menuRef.current;
    if (oldEvent && commandMenu) {
      const newEvent = new KeyboardEvent(oldEvent.type, oldEvent);
      commandMenu.dispatchEvent(newEvent);
      oldEvent.preventDefault();
      oldEvent.stopImmediatePropagation();
    }
    return true;
  };

  useLexicalCommand(
    SELECTION_CHANGE_COMMAND,
    handleSelectionChanged,
    COMMAND_PRIORITY_LOW,
  );

  useLexicalCommand(
    KEY_ESCAPE_COMMAND,
    () => {
      setShow(false);
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );

  useLexicalCommand(
    KEY_ENTER_COMMAND,
    forwardCommandMenuEvent,
    COMMAND_PRIORITY_LOW,
  );

  useLexicalCommand(
    KEY_ARROW_DOWN_COMMAND,
    forwardCommandMenuEvent,
    COMMAND_PRIORITY_LOW,
  );

  useLexicalCommand(
    KEY_ARROW_UP_COMMAND,
    forwardCommandMenuEvent,
    COMMAND_PRIORITY_LOW,
  );

  if (!show) {
    return null;
  }

  return (
    <CommandPicker ref={menuRef} container={container} query={command}>
      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(FORMAT_PARAGRAPH_COMMAND, undefined),
        )}
        keywords="normal text clear unformat paragraph"
      >
        <ParagraphIcon />
        Paragraph
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(INSERT_HEADING_COMMAND, "H1"),
        )}
        keywords="heading h1 header title"
      >
        <HeadingIcon />
        Heading 1
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(INSERT_HEADING_COMMAND, "h2"),
        )}
        keywords="heading h2 header title subtittle"
      >
        <HeadingIcon />
        Heading 2
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(INSERT_HEADING_COMMAND, "h3"),
        )}
        keywords="heading h3 header title subtittle"
      >
        <HeadingIcon />
        Heading 3
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
        )}
        keywords="list bullet unordered ul"
      >
        <ListIcon />
        List
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
        )}
        keywords="list numbered ordered ol"
      >
        <OrderedListIcon />
        Ordered List
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code"),
        )}
        keywords="code codeblock javascript python js"
      >
        <CodeIcon />
        Code
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(INSERT_BLOCKQUOTE_COMMAND, undefined),
        )}
        keywords="quote block blockquote"
      >
        <QuoteIcon />
        Quote
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(CLEAR_FORMAT_TEXT_COMMAND, undefined),
        )}
        keywords="normal text clear unformat"
      >
        <ClearFormatTextIcon />
        Normal
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        })}
        keywords="bold strong"
      >
        <BoldIcon />
        Bold
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic"),
        )}
        keywords="italic oblique"
      >
        <ItalicIcon />
        Italic
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={() =>
          withHideCaret(() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline"),
          )
        }
        keywords="underline underscore mark"
      >
        <UnderlineIcon />
        Underline
      </CommandPicker.Command>

      <CommandPicker.Command
        onSelect={withHideCaret(() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough"),
        )}
        keywords="strikethrough cross out"
      >
        <StrikethroughIcon />
        Strikethrough
      </CommandPicker.Command>
    </CommandPicker>
  );
}
