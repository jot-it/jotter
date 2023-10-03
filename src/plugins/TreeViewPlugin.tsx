/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import useToggle from "@/hooks/useToggle";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";
import { BsCode as CodeIcon } from "react-icons/bs";

export default function TreeViewPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [show, toggleShow] = useToggle();
  return (
    <>
      <button
        className="fixed bottom-4 right-4 inline-flex items-center rounded-full bg-cyan-200 p-5 text-lg
         text-cyan-900 shadow-sm hover:bg-cyan-300 dark:bg-cyan-900 dark:text-cyan-200 
         dark:hover:bg-cyan-800"
        onClick={toggleShow}
      >
        <CodeIcon />
      </button>
      {show && (
        <TreeView
          viewClassName="fixed bottom-0 right-20 z-50 w-1/2"
          treeTypeButtonClassName="bg-slate-600 rounded-lg px-2 py-1 mr-2"
          timeTravelPanelClassName="bg-slate-600 rounded-lg px-2 py-1 mr-2"
          timeTravelButtonClassName="bg-cyan-800 rounded-lg px-2 py-1"
          timeTravelPanelSliderClassName="bg-cyan-800 rounded-lg px-2 py-1"
          timeTravelPanelButtonClassName="bg-cyan-800 rounded-lg px-2 py-1"
          editor={editor}
        />
      )}
    </>
  );
}
