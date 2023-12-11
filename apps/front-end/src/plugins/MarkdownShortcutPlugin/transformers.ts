import {
  TRANSFORMERS as LEXICAL_TRANSFORMERS,
  TextMatchTransformer,
} from "@lexical/markdown";
import {
  ImageNode,
  $isImageNode,
  $createImageNode,
} from "../ImagePlugin/ImageNode";

const IMAGE_TRANFORMER: TextMatchTransformer = {
  trigger: ")",
  type: "text-match",
  dependencies: [ImageNode],

  importRegExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))/,
  regExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))$/,

  replace(textNode, match) {
    const [_full_match, altText, src] = match;
    const imageNode = $createImageNode(src, altText);
    textNode.replace(imageNode);
  },

  export(node) {
    if (!$isImageNode(node)) {
      return null;
    }

    return `![${node.getAltText()}](${node.getSrc()})`;
  },
};

// Register all transformers here
const MARKDOWN_TRANFORMS: typeof LEXICAL_TRANSFORMERS = [
  IMAGE_TRANFORMER,
  ...LEXICAL_TRANSFORMERS,
];

export default MARKDOWN_TRANFORMS;
