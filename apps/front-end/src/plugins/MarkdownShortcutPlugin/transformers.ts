import {
  CHECK_LIST,
  ElementTransformer,
  TRANSFORMERS as LEXICAL_TRANSFORMERS,
  TextMatchTransformer,
} from "@lexical/markdown";
import {
  $createImageNode,
  $isImageNode,
  ImageNode,
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

    return `![${node.alt}](${node.src})`;
  },
};

const CHECK_LIST_TRANSFORMER: ElementTransformer = CHECK_LIST;
CHECK_LIST_TRANSFORMER.regExp = /^(\s*)(?:-)?\s?(\[(\s|x)?\])\s/i;

// Register all transformers here
const MARKDOWN_TRANFORMS: typeof LEXICAL_TRANSFORMERS = [
  IMAGE_TRANFORMER,
  CHECK_LIST_TRANSFORMER,
  ...LEXICAL_TRANSFORMERS,
];

export default MARKDOWN_TRANFORMS;
