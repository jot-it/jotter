import { $setBlocksType } from "@lexical/selection";
import { $findMatchingParent } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  LexicalEditor,
} from "lexical";

/**
 * Finds the parent node of the current `Range selection`.
 */
export function $getSelectionParentNode() {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) return null;

  const anchorNode = selection.anchor.getNode();

  if (anchorNode.getKey() === "root") return anchorNode;

  const parentNode = $findMatchingParent(anchorNode, (e) => {
    const parent = e.getParent();
    // A root or a shadow root mark the end of the tree
    // We don't want to go beyond that
    return parent !== null && $isRootOrShadowRoot(parent);
  });

  return parentNode ?? anchorNode.getTopLevelElementOrThrow();
}

/**
 * Formats the current range selection as the node created by the given function
 *
 * @param createElement The function that creates the new node
 */
export function formatSelectionAs(
  editor: LexicalEditor,
  createElement: Parameters<typeof $setBlocksType>[1]
) {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $setBlocksType(selection, createElement);
    }
  });
}
