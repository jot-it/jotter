import {
  BoldIcon,
  CheckListIcon,
  CodeIcon,
  HeadingIcon,
  InlineCodeIcon,
  ItalicIcon,
  ParagraphIcon,
  QuoteIcon,
  StrikethroughIcon,
  TextIcon,
  UnderlineIcon,
} from "@/components/Icons";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  LexicalCommand,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useRef, useState, useTransition } from "react";
import {
  GoListUnordered as ListIcon,
  GoListOrdered as OrderedListIcon,
} from "react-icons/go";
import { INSERT_IMAGE_COMMAND } from "../ImagePlugin";
import useLexicalCommand from "../useLexicalCommand";
import CommandPicker, { CommandPickerItem } from "./CommandPicker";
import { InsertImageCommand } from "./InsertImageDialog";
import {
  CLEAR_FORMAT_TEXT_COMMAND,
  FORMAT_PARAGRAPH_COMMAND,
  INSERT_BLOCKQUOTE_COMMAND,
  INSERT_CODE_NODE_COMMAND,
  INSERT_HEADING_COMMAND,
  REMOVE_CARET_COMMAND,
  useBlockQuoteCommand,
  useClearformatText,
  useCodeNode,
  useHeadingCommand,
  useListCommand,
  useParagraph,
  useRemoveCaretCommand,
} from "./commads";
import { $getQueryTextForSearch } from "./utils";

export type ComponentPickerMenuPluginProps = {
  /**
   * The container surrounding the editor.
   */
  container: HTMLDivElement;
};

// Matches a slash followed by any characteres
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
  useParagraph(editor);
  useBlockQuoteCommand(editor);
  useRemoveCaretCommand(editor);
  useCodeNode(editor);
  useClearformatText(editor);

  function dispatch<T>(command: LexicalCommand<T>, payload: T) {
    // Remove the search query before dispatching the command
    editor.dispatchCommand(REMOVE_CARET_COMMAND, undefined);
    setShow(false);

    editor.dispatchCommand(command, payload);
  }

  const handleSelectionChanged = () => {
    editor.getEditorState().read(() => {
      const queryText = $getQueryTextForSearch();
      const selectionString = queryText ?? "";

      const match = COMMAND_PICKER_REGEX.exec(selectionString);
      const command = match?.[1].toLowerCase() ?? "";

      // Optimization
      startTransition(() => {
        setCommand(command);
      });

      setShow(!!match);
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
      <InsertImageCommand
        onInsert={(src, alt) => dispatch(INSERT_IMAGE_COMMAND, { src, alt })}
      />
      <CommandPickerItem
        icon={<ParagraphIcon />}
        onSelect={() => dispatch(FORMAT_PARAGRAPH_COMMAND, undefined)}
        label="Paragraph"
        keywords="normal text paragraph"
      />
      <CommandPickerItem
        onSelect={() => dispatch(INSERT_HEADING_COMMAND, "H1")}
        keywords="heading h1 header title"
        label="Heading 1"
        icon={<HeadingIcon />}
      />
      <CommandPickerItem
        onSelect={() => dispatch(INSERT_HEADING_COMMAND, "h2")}
        keywords="heading h2 header title subtitle"
        icon={<HeadingIcon />}
        label="Heading 2"
      />
      <CommandPickerItem
        onSelect={() => dispatch(INSERT_HEADING_COMMAND, "h3")}
        keywords="heading h3 header title subtitle"
        icon={<HeadingIcon />}
        label="Heading 3"
      />

      <CommandPickerItem
        onSelect={() => dispatch(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        keywords="list bullet unordered ul"
        icon={<ListIcon />}
        label="List"
      />

      <CommandPickerItem
        onSelect={() => dispatch(INSERT_ORDERED_LIST_COMMAND, undefined)}
        keywords="list numbered ordered ol"
        icon={<OrderedListIcon />}
        label="Ordered List"
      />

      <CommandPickerItem
        onSelect={() => dispatch(INSERT_CHECK_LIST_COMMAND, undefined)}
        keywords="list checklist todo"
        icon={<CheckListIcon />}
        label="Check List"
      />

      <CommandPickerItem
        onSelect={() => dispatch(FORMAT_TEXT_COMMAND, "code")}
        keywords="code inline inlinecode "
        icon={<InlineCodeIcon />}
        label="Inline Code"
      />

      <CommandPickerItem
        onSelect={() => dispatch(INSERT_CODE_NODE_COMMAND, undefined)}
        keywords="code block codeblock javascript python js"
        icon={<CodeIcon />}
        label="Code Block"
      />

      <CommandPickerItem
        onSelect={() => dispatch(INSERT_BLOCKQUOTE_COMMAND, undefined)}
        keywords="quote block blockquote"
        icon={<QuoteIcon />}
        label="Quote"
      />

      <CommandPickerItem
        icon={<TextIcon />}
        onSelect={() => dispatch(CLEAR_FORMAT_TEXT_COMMAND, undefined)}
        label="Normal"
        keywords="normal text clear unformat"
      />

      <CommandPickerItem
        onSelect={() => dispatch(FORMAT_TEXT_COMMAND, "bold")}
        keywords="bold strong"
        icon={<BoldIcon />}
        label="Bold"
      />

      <CommandPickerItem
        onSelect={() => dispatch(FORMAT_TEXT_COMMAND, "italic")}
        keywords="italics"
        icon={<ItalicIcon />}
        label="Italic"
      />

      <CommandPickerItem
        onSelect={() => dispatch(FORMAT_TEXT_COMMAND, "underline")}
        keywords="underline underscore mark"
        label="Underline"
        icon={<UnderlineIcon />}
      />

      <CommandPickerItem
        onSelect={() => dispatch(FORMAT_TEXT_COMMAND, "strikethrough")}
        keywords="strikethrough cross out"
        label="Strikethrough"
        icon={<StrikethroughIcon />}
      />
    </CommandPicker>
  );
}
