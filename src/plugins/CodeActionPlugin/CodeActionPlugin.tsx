import { CodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { NodeEventPlugin } from "@lexical/react/LexicalNodeEventPlugin";
import { useEffect, useRef, useState } from "react";
import ActionBar from "./ActionBar";

// HACK I haven't found a non-buggy way of adding React components inside a Lexical CodeNode so
// the ActionBar uses absolute position relative the active CodeNode. The ideal solution
// would consist of every CodeNode having it's own ActionBar rendered as a react component.
function CodeActionsPlugin() {
  const [editor] = useLexicalComposerContext();
  const [show, setShow] = useState(false);
  const [codeDOMNode, setCodeDOMNode] = useState<HTMLElement>();
  const [activeNodeKey, setActiveNodeKey] = useState<string>();

  // Keep track of the number of code blocks to prevent rendering action bar without code blocks
  const [codeBlockCount, setCodeBlockCount] = useState(0);
  const actionBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return editor.registerMutationListener(CodeNode, (mutations) => {
      mutations.forEach((type, key) => {
        switch (type) {
          case "created":
            setCodeBlockCount((c) => c + 1);
            setActiveNodeKey(key);
            break;
          case "destroyed":
            setCodeBlockCount((c) => c - 1);
            break;
        }
      });
    });
  }, [editor]);

  return (
    <>
      {show && codeBlockCount > 0 && codeDOMNode && activeNodeKey && (
        <ActionBar
          editor={editor}
          codeNodeKey={activeNodeKey}
          codeDOMNode={codeDOMNode}
          ref={actionBarRef}
        />
      )}
      <NodeEventPlugin
        nodeType={CodeNode}
        eventType="mouseenter"
        eventListener={({ target }, _, key) => {
          setShow(true);
          setActiveNodeKey(key);
          if (target instanceof HTMLElement) {
            const codeBlock = target.closest("code")!;
            setCodeDOMNode(codeBlock);
          }
        }}
      />
      <NodeEventPlugin
        nodeType={CodeNode}
        eventType="mouseleave"
        eventListener={(e) => {
          const { relatedTarget } = e as MouseEvent;
          const actionBarContainer = actionBarRef.current;

          const isMouseInActionBar =
            relatedTarget instanceof HTMLElement &&
            actionBarContainer?.contains(relatedTarget);

          if (!isMouseInActionBar) {
            setShow(false);
          }
        }}
      />
    </>
  );
}

export default CodeActionsPlugin;
