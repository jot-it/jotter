/* eslint-disable @next/next/no-img-element */
import Tooltip from "@/components/Tooltip";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import clsx from "clsx";
import { COMMAND_PRIORITY_HIGH, SELECTION_CHANGE_COMMAND } from "lexical";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { ImageNode } from "./ImageNode";

type ImageProps = ComponentPropsWithoutRef<"img"> & {
  node: ImageNode;
};

function Image(props: ImageProps) {
  const { node, alt, ...rest } = props;
  const [hasFocus, setFocus] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [isSelected, _setSelected, _celearSelection] = useLexicalNodeSelection(
    node.__key,
  );

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        setFocus(false);
        return false;
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor]);

  const handleClick = () => {
    setFocus(true);
  };

  const handleDelete = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      editor.update(() => node.remove());
    }
  };

  return (
    <Tooltip title={alt ?? ""}>
      <img
        tabIndex={-1}
        loading="lazy"
        onClick={handleClick}
        onKeyUp={handleDelete}
        className={clsx(
          "rounded-lg",
          (isSelected || hasFocus) &&
            "outline  outline-2 outline-offset-2 outline-cyan-600 ",
        )}
        {...rest}
      />
    </Tooltip>
  );
}

export default Image;
