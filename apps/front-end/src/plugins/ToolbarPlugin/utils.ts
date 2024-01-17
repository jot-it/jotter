import { $isAtNodeEnd, $setBlocksType } from "@lexical/selection";
import { $findMatchingParent } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  ElementNode,
  LexicalEditor,
  RangeSelection,
  TextNode,
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
  createElement: Parameters<typeof $setBlocksType>[1],
) {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      $setBlocksType(selection, createElement);
    }
  });
}

/**
  MIT License

  Copyright (c) Meta Platforms, Inc. and affiliates.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
 */
export function getSelectedNode(
  selection: RangeSelection,
): TextNode | ElementNode {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
  }
}
