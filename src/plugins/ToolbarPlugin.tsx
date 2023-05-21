import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as Toolbar from "@radix-ui/react-toolbar";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
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
import Select from "../components/Select";

type EditorToolbarProps = {
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isStrikeThrough?: boolean;
  container: HTMLDivElement;
};

const TEXT_FORMATS: TextFormatType[] = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
];

const TOOLBAR_MARGIN_Y = 10;

function ToolbarPlugin({
  container,
  isBold,
  isItalic,
  isUnderline,
  isStrikeThrough,
}: EditorToolbarProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [activeTextFormats, setActiveTextFormats] = useState<TextFormatType[]>(
    []
  );

  const [editor] = useLexicalComposerContext();

  const updateToolbarPosition = useCallback(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;
    moveToolbarToCurrentSelection(toolbar, container);
  }, [container]);

  const handleSelectionChanged = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection)) return;

      // Get all the text formats applied on the current selection
      const selectionFormat = TEXT_FORMATS.filter((format) =>
        selection.hasFormat(format)
      );

      setActiveTextFormats(selectionFormat);

      // Move toolbar to the position of the current selection
      updateToolbarPosition();
    });
    return false;
  }, [editor, updateToolbarPosition]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      handleSelectionChanged,
      COMMAND_PRIORITY_LOW
    );
  }, [editor, handleSelectionChanged]);

  return (
    <Toolbar.Root
      className="absolute left-0 top-0 z-10 flex flex-grow-0 translate-x-[100vmax] rounded-lg
      border bg-white p-3 text-gray-700 opacity-0 shadow-md transition-opacity"
      ref={toolbarRef}
    >
      <Toolbar.Button asChild>
        <Select defaultValue="h1">
          <Select.Item value="h1">Heading 1</Select.Item>
          <Select.Item value="h2">Heading 2</Select.Item>
          <Select.Item value="h3">Heading 3</Select.Item>
          <Select.Item value="h4">Heading 4</Select.Item>
          <Select.Item value="h5">Heading 5</Select.Item>
          <Select.Item value="h6">Heading 6</Select.Item>
        </Select>
      </Toolbar.Button>

      <Toolbar.Separator className="mx-2 w-[1px] bg-gray-300" />

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
      className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 data-[state=on]:bg-gray-200"
      ref={forwardedRef}
    >
      {children}
    </Toolbar.ToggleItem>
  );
});

function moveToolbarToCurrentSelection(
  toolbar: HTMLDivElement,
  container: HTMLDivElement
) {
  const currentSelection = window.getSelection();
  if (!shouldDisplayToolbar(currentSelection, container)) {
    toolbar.style.transform = "translate(-100vmax, -100vmax)";
    toolbar.style.opacity = "0";
    return;
  }

  const selectionRect = currentSelection.getRangeAt(0).getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const toolbarRect = toolbar.getBoundingClientRect();

  let top = selectionRect.top - toolbarRect.height - TOOLBAR_MARGIN_Y;
  let left = selectionRect.left;

  // If the toolbar is going to be rendered outside of the editor's container
  // Render it below the selection instead
  if (top < containerRect.top) {
    top += toolbarRect.height + selectionRect.height + TOOLBAR_MARGIN_Y * 2;
  }

  // Translate position to be relative to the editor's container
  left -= containerRect.left;
  top -= containerRect.top;

  toolbar.style.transform = `translate(${left}px, ${top}px)`;
  toolbar.style.opacity = "1";
}

/**
 * @param selection Current selection
 * @param editorContainer container node of the editor
 * @returns true if the selection is not empty and is inside the editor's container
 */
function shouldDisplayToolbar(
  selection: Selection | null,
  editorContainer: HTMLDivElement
): selection is Selection {
  if (!selection || selection.isCollapsed) return false;

  const selectionNode = selection.anchorNode?.parentElement;
  if (!selectionNode || !editorContainer.contains(selectionNode)) return false;

  return true;
}

export default ToolbarPlugin;
