import { $setBlocksType } from "@lexical/selection";
import { $findMatchingParent } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  LexicalEditor,
} from "lexical";

const TOOLBAR_MARGIN_Y = 10;

/**
 * Translates the toolbar to the position of the current selection relative to the container.
 * If there is no selection, the toolbar is hidden.
 *
 * @param toolbar
 * @param container Where the toolbar is present
 */
export function moveToolbarToCurrentSelection(
  toolbar: HTMLDivElement,
  container: HTMLDivElement
) {
  const currentSelection = window.getSelection();
  if (!currentSelection || currentSelection.isCollapsed) {
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

  // Translate position to be relative to the container
  left -= containerRect.left;
  top -= containerRect.top;

  toolbar.style.transform = `translate(${left}px, ${top}px)`;
  toolbar.style.opacity = "1";
}

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

  return parentNode ? parentNode : anchorNode.getTopLevelElementOrThrow();
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
