import {
  DecoratorNode,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
} from "lexical";
import { ReactNode } from "react";
import Image from "./Image";

type SerializedImageNode = SerializedLexicalNode & {
  src: string;
  alt?: string;
};

const NODE_VERSION = 1;

class ImageNode extends DecoratorNode<ReactNode> {
  constructor(
    public src: string,
    public alt: string = "",
    key?: NodeKey,
  ) {
    super(key);
  }

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): LexicalNode {
    return new ImageNode(node.src, node.alt, node.__key);
  }

  static importJSON(node: SerializedImageNode): LexicalNode {
    return $createImageNode(node.src, node.alt);
  }

  exportJSON(): SerializedImageNode {
    return {
      type: this.getType(),
      version: NODE_VERSION,
      src: this.src,
      alt: this.alt,
    };
  }

  createDOM(): HTMLElement {
    return document.createElement("div");
  }

  updateDOM(): boolean {
    // Returning false here to avoid recreating the imageNode on updates
    return false;
  }

  decorate(): ReactNode {
    return <Image node={this} src={this.src} alt={this.alt} />;
  }
}

function $createImageNode(src: string, alt?: string) {
  return new ImageNode(src, alt);
}

function $isImageNode(node: unknown): node is ImageNode {
  return node instanceof ImageNode;
}

export { $createImageNode, $isImageNode, ImageNode };
