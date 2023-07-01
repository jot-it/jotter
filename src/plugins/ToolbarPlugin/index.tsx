import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import Toolbar from "./Toolbar";

type ToolbarPluginProps = {
  /**
   * The container surrounding the editor.
   * This is used to calculate the position of the toolbar, so it must have
   * `position: relative`
   */
  container: HTMLDivElement;
};

function ToolbarPlugin(props: ToolbarPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [showToolbar, setShowToolbar] = useState(false);

  useEffect(() => {
    const updateToolbarVisibility = () => {
      const selection = window.getSelection();
      const editorRoot = editor.getRootElement();

      const hasSelection = selection && !selection.isCollapsed;
      const isSelectionInsideEditor =
        hasSelection && editorRoot && editorRoot.contains(selection.anchorNode);

      setShowToolbar(Boolean(isSelectionInsideEditor));
    };

    document.addEventListener("selectionchange", updateToolbarVisibility);
    return () => {
      document.removeEventListener("selectionchange", updateToolbarVisibility);
    };
  }, [editor]);

  if (!showToolbar) {
    return <></>;
  }

  return <Toolbar {...props} editor={editor} />;
}

export default ToolbarPlugin;
