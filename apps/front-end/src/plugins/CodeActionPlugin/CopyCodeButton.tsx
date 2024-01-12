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

  return (
    <CopyButton
      className="!bg-transparent !p-2.5 !text-inherit shadow-sm hover:!bg-slate-700"
      onClick={handleClick}
    />
  );
}

export default CopyCodeButton;
