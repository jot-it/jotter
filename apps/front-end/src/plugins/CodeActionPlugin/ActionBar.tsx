import { LexicalEditor } from "lexical";
import { forwardRef } from "react";
import CopyCodeButton from "./CopyCodeButton";
import LanguageSelector from "./LanguageSelector";

type ActionBarProps = WithCodeNode<{
  codeDOMNode: HTMLElement;
}>;

export type WithCodeNode<T = unknown> = T & {
  editor: LexicalEditor;
  codeNodeKey: string;
};

const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  function ActionBar(props, ref) {
    const { left, top, width } = props.codeDOMNode.getBoundingClientRect();
    return (
      <div className="fixed px-4 py-2" style={{ left, top, width }} ref={ref}>
        <div className="flex w-full justify-between">
          <LanguageSelector
            editor={props.editor}
            codeNodeKey={props.codeNodeKey}
          />
          <CopyCodeButton
            editor={props.editor}
            codeNodeKey={props.codeNodeKey}
          />
        </div>
      </div>
    );
  },
);

export default ActionBar;
