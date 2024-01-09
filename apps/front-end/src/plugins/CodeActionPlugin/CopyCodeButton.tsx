import CopyButton from "@/components/CopyButton";
import { $getNodeByKey } from "lexical";
import { WithCodeNode } from "./ActionBar";

type CopyCodeButtonProps = WithCodeNode;

function CopyCodeButton(props: CopyCodeButtonProps) {
  const handleClick = () => {
    props.editor.getEditorState().read(() => {
      const codeNode = $getNodeByKey(props.codeNodeKey);
      if (codeNode) {
        const text = codeNode.getTextContent();
        navigator.clipboard.writeText(text);
      }
    });
  };

  return <CopyButton onClick={handleClick} />;
}

export default CopyCodeButton;
