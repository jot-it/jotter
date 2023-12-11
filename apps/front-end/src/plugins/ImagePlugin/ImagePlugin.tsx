import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  LexicalCommand,
  createCommand,
} from "lexical";
import { $createImageNode } from ".";
import useLexicalCommand from "../useLexicalCommand";

type ImageCommandPayload = {
  src: string;
  alt?: string;
};

const INSERT_IMAGE_COMMAND: LexicalCommand<ImageCommandPayload> = createCommand(
  "INSERT_IMAGE_COMMAND",
);

function ImagePlugin() {
  const [editor] = useLexicalComposerContext();
  const insertImage = (p: ImageCommandPayload) => {
    editor.update(() => {
      const image = $createImageNode(p.src, p.alt);
      $insertNodes([image]);
    });

    return true;
  };

  useLexicalCommand(INSERT_IMAGE_COMMAND, insertImage, COMMAND_PRIORITY_EDITOR);
  return null;
}

export { INSERT_IMAGE_COMMAND, ImagePlugin };
