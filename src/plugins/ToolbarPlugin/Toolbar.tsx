import * as Toolbar from "@radix-ui/react-toolbar";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
  TextFormatType,
} from "lexical";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import {
  RiBold as Bold,
  RiItalic as Italic,
  RiStrikethrough as StrikeThrough,
  RiUnderline as Underline,
} from "react-icons/ri";
import { moveToolbarToCurrentSelection } from "./utils";

import TextFormatSelect from "./TextFormatSelect";
import clsx from "clsx";

type TextFormatToolbarProps = {
  /**
   * The container surrounding the editor.
   */
  container: HTMLDivElement;
  /**
   * The editor instance.
   */
  editor: LexicalEditor;
  /**
   * Whether the toolbar should be fixed to the bottom of the container.
   */
  fixedBottom?: boolean;
};

const TEXT_FORMATS: TextFormatType[] = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
];

function TextFormatToolbar({ container, editor, fixedBottom}: TextFormatToolbarProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [activeTextFormats, setActiveTextFormats] = useState<TextFormatType[]>(
    []
  );

  const updateToolbarPosition = useCallback(() => {
    const toolbar = toolbarRef.current;
    if (fixedBottom || !toolbar) return;

    moveToolbarToCurrentSelection(toolbar, container);
  }, [container, fixedBottom]);

  const handleSelectionChanged = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection)) return;

      setActiveTextFormats(
        TEXT_FORMATS.filter((format) => selection.hasFormat(format))
      );

      updateToolbarPosition();
    });

    return false;
  }, [editor, updateToolbarPosition]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      // Update the toolbar position as soon as it is rendered
      // Prevents the toolbar from being rendered in the wrong position initially
      updateToolbarPosition();
    });
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      handleSelectionChanged,
      COMMAND_PRIORITY_LOW
    );
  }, [editor, handleSelectionChanged, updateToolbarPosition]);

  return (
    <Toolbar.Root
      className={clsx("flex rounded-lg border bg-white p-3",
      "text-gray-700  shadow-md  data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in",
       "dark:border-slate-600 dark:bg-slate-700 dark:text-inherit",
       fixedBottom ? "fixed bottom-4 left-1/2 -translate-x-1/2" : "absolute left-0 top-0 z-10", 
       )}
       
      ref={toolbarRef}
    >
      <TextFormatSelect editor={editor} />

      <Toolbar.Separator className="mx-2 w-[1px] bg-gray-300 dark:bg-gray-600" />

      <Toolbar.ToggleGroup
        type="multiple"
        className="flex items-center gap-[2px] text-lg"
        value={activeTextFormats}
        onValueChange={(value) =>
          setActiveTextFormats(value as TextFormatType[])
        }
      >
        <ToolbarToggleItem
          value="bold"
          aria-label="format Bold"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        >
          <Bold />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          value="italic"
          aria-label="format Italic"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        >
          <Italic />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          value="underline"
          aria-label="format Underline"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          }
        >
          <Underline />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          value="strikethrough"
          aria-label="format StrikeThrough"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
          }
        >
          <StrikeThrough />
        </ToolbarToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
}

const ToolbarToggleItem = forwardRef<
  HTMLButtonElement,
  Toolbar.ToolbarToggleItemProps
>(function ToolbarToggleItem({ children, value, ...props }, forwardedRef) {
  return (
    <Toolbar.ToggleItem
      {...props}
      value={value}
      className="rounded-md p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 
      focus:ring-gray-300 data-[state=on]:bg-gray-200 dark:hover:bg-slate-600
      dark:data-[state=on]:bg-cyan-900 dark:data-[state=on]:text-cyan-200
      "
      ref={forwardedRef}
    >
      {children}
    </Toolbar.ToggleItem>
  );
});

export default TextFormatToolbar;
