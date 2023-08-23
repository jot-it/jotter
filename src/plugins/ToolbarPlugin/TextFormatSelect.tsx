import { ToolbarButton } from "@radix-ui/react-toolbar";
import {
  $createParagraphNode,
  $isParagraphNode,
  COMMAND_PRIORITY_LOW,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import Select from "../../components/Select";

import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { useCallback, useEffect, useState } from "react";
import { $getSelectionParentNode, formatSelectionAs } from "./utils";

type TextFormatSelectProps = {
  editor: LexicalEditor;
};

function TextFormatSelect({ editor }: TextFormatSelectProps) {
  const [headingStyle, setHeadingStyle] = useState<string>();

  const formatAsHeading = (headingSize: HeadingTagType) => {
    formatSelectionAs(editor, () => $createHeadingNode(headingSize));
  };

  const formatAsParagraph = () => {
    formatSelectionAs(editor, $createParagraphNode);
  };

  const handleHeadingStyleChanged = (tag: string) => {
    if (tag === "p") formatAsParagraph();
    else formatAsHeading(tag as HeadingTagType);
  };

  const handleSelectionChanged = useCallback(() => {
    editor.getEditorState().read(() => {
      const parentNode = $getSelectionParentNode();
      if (!parentNode) return;

      if ($isHeadingNode(parentNode)) {
        setHeadingStyle(parentNode.getTag());
      } else if ($isParagraphNode(parentNode)) {
        setHeadingStyle("p");
      }
    });
    return false;
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      handleSelectionChanged,
      COMMAND_PRIORITY_LOW
    );
  }, [editor, handleSelectionChanged]);

  return (
    <ToolbarButton ref={(element) => element?.focus()} asChild>
      <Select
        defaultValue="p"
        value={headingStyle}
        onValueChange={handleHeadingStyleChanged}
      >
        <Select.Item value="p">Normal</Select.Item>
        <Select.Item value="h1">Heading 1</Select.Item>
        <Select.Item value="h2">Heading 2</Select.Item>
        <Select.Item value="h3">Heading 3</Select.Item>
        <Select.Item value="h4">Heading 4</Select.Item>
      </Select>
    </ToolbarButton>
  );
}

export default TextFormatSelect;
