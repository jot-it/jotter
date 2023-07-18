import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import clsx from "clsx";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

import { useCallback, useEffect, useState, useTransition } from "react";
import { getNodeUpToAnchor, getTextUpToAnchor } from "./utils";
import {
  INSERT_BLOCKQUOTE_COMMAND,
  INSERT_HEANDING_COMMAND,
  REMOVE_CARECT_COMMAND,
  useBlockQuoteCommand,
  useHeadingCommand,
  useLinkCommand,
  useListCommand,
} from "./commads";
import { mergeRegister } from "@lexical/utils";
import { createPortal } from "react-dom";
import CommandPicker from "./CommandPicker";
import {
  RiHeading as HeadingIcon,
  RiLinkM as LinkIcon,
  RiDoubleQuotesR as QuoteIcon,
  RiTable2 as TableIcon,
  RiBold as BoldIcon,
  RiItalic as ItalicIcon,
  RiUnderline as UnderlineIcon,
  RiStrikethrough as StrikethroughIcon,
  RiCodeSSlashLine as CodeIcon,
} from "react-icons/ri";
import {
  GoListUnordered as ListIcon,
  GoListOrdered as OrderedListIcon,
} from "react-icons/go";

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";

export default function ComponentPickerMenuPlugin() {
  const [editor] = useLexicalComposerContext();

  const [command, setCommand] = useState("");
  const [show, setShow] = useState(false);

  const [_isPending, startTransition] = useTransition();

  //TODO: Change better function
  function handleClick(fn: () => void) {
    fn();
    editor.dispatchCommand(REMOVE_CARECT_COMMAND, undefined);
  }

  const handleRemoveCommandString = useCallback(() => {
    editor.update(() => {
      const textNode = $getTextNodeForSeach();
      if (!textNode) {
        return false;
      }
      const textContent = textNode.getTextContent();
      const newText = textContent.replace(/(?<=\s|\B)\/[a-zA-Z]*\d*/, "");
      textNode.setTextContent(newText);
    });

    return true;
  }, [editor]);

  const handleSelectionChanged = useCallback(() => {
    editor.getEditorState().read(() => {
      const queryText = $getQueryTextForSearch();
      const selectionString = queryText ?? "";

      const matcher = /(?<=\s|\B)\/([a-zA-Z]*\d*)$/;
      const foundMatch = matcher.exec(selectionString);
      const canShow = Boolean(foundMatch?.[0]);
      const command = foundMatch?.[1];

      // Optimization
      startTransition(() => {
        setCommand(command ?? "");
      });

      setShow(canShow);
    });

    return false;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        handleSelectionChanged,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        REMOVE_CARECT_COMMAND,
        handleRemoveCommandString,
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor, handleSelectionChanged, handleRemoveCommandString]);

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

  useListCommand(editor);
  useHeadingCommand(editor);
  useLinkCommand(editor);
  useBlockQuoteCommand(editor);

  return createPortal(
    <CommandPicker show={show}>
      <CommandPicker.Command
        onClick={() =>
          handleClick(() =>
            editor.dispatchCommand(INSERT_HEANDING_COMMAND, "H1")
          )
        }
        queryString={command}
        keywords="heading h1 header tittle"
      >
        <HeadingIcon />
        {"Heading 1"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          handleClick(() =>
            editor.dispatchCommand(INSERT_HEANDING_COMMAND, "h2")
          )
        }
        queryString={command}
        keywords="heading h2 header tittle subtittle"
      >
        <HeadingIcon />
        {"Heading 2"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          handleClick(() =>
            editor.dispatchCommand(INSERT_HEANDING_COMMAND, "h3")
          )
        }
        queryString={command}
        keywords="heading h3 header tittle subtittle"
      >
        <HeadingIcon />
        {"Heading 3"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          handleClick(() =>
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
          )
        }
        queryString={command}
        keywords="list bullet unordered ul"
      >
        <ListIcon />
        {"List"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          handleClick(() =>
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
          )
        }
        queryString={command}
        keywords="list numbered ordered ol"
      >
        <OrderedListIcon />
        {"Ordered List"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          handleClick(() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code"))
        }
        queryString={command}
        keywords="code codeblock javascript python js"
      >
        <CodeIcon />
        {"Code"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          handleClick(() =>
            editor.dispatchCommand(INSERT_BLOCKQUOTE_COMMAND, undefined)
          )
        }
        queryString={command}
        keywords="quote block blockquote"
      >
        <QuoteIcon />
        {"Quote"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          editor.dispatchCommand(REMOVE_CARECT_COMMAND, undefined);
        }}
        queryString={command}
        keywords="bold strong"
      >
        <BoldIcon />
        {"Bold"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          handleClick(() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
          )
        }
        queryString={command}
        keywords="italic oblique"
      >
        <ItalicIcon />
        {"Italic"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          handleClick(() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          )
        }
        queryString={command}
        keywords="underline underscore mark"
      >
        <UnderlineIcon />
        {"Underline"}
      </CommandPicker.Command>

      <CommandPicker.Command
        onClick={() =>
          handleClick(() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
          )
        }
        queryString={command}
        keywords="strikethrough cross out"
      >
        <StrikethroughIcon />
        {"Strikethrough"}
      </CommandPicker.Command>
    </CommandPicker>,
    document.body
  );
}

//TODO: Move to utils
function $getQueryTextForSearch() {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) {
    return null;
  }

  const text = getTextUpToAnchor(selection);
  return text;
}

//FIXME: Styling commands (bold, italic, code... ) not working
function $getTextNodeForSeach() {
  const selection = $getSelection();
  if (!$isRangeSelection(selection) || selection.isCollapsed()) {
    return null;
  }
  return getNodeUpToAnchor(selection);
}
