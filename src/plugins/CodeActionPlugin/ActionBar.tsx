import { forwardRef } from "react";
import LanguageSelector, { LanguageSelectorProps } from "./LanguageSelector";

type ActionBarProps = LanguageSelectorProps & {
  codeDOMNode: HTMLElement;
};

const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  function ActionBar(props, ref) {
    const { left, top, right } = props.codeDOMNode.getBoundingClientRect();
    return (
      <div className="fixed px-4 py-2" style={{ left, top, right }} ref={ref}>
        <LanguageSelector
          editor={props.editor}
          codeNodeKey={props.codeNodeKey}
        />
      </div>
    );
  },
);

export default ActionBar;
