/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";
import * as React from "react";

export default function TreeViewPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  return (
    <TreeView
      viewClassName=""
      treeTypeButtonClassName="bg-slate-600 rounded-lg px-2 py-1 mr-2"
      timeTravelPanelClassName="bg-slate-600 rounded-lg px-2 py-1 mr-2"
      timeTravelButtonClassName="bg-cyan-800 rounded-lg px-2 py-1"
      timeTravelPanelSliderClassName="bg-cyan-800 rounded-lg px-2 py-1"
      timeTravelPanelButtonClassName="bg-cyan-800 rounded-lg px-2 py-1"
      editor={editor}
    />
  );
}
