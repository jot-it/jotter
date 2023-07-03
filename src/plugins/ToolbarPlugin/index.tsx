import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import useMatchMedia from "@/hooks/useMatchMedia";

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
  const [editorHasSelection, setEditorHasSelection] = useState(false);  
  const isMobileScreen = useMatchMedia("(max-width: 1023px)");

  useEffect(() => {
    const updateToolbarVisibility = () => {
      const selection = window.getSelection();
      const editorRoot = editor.getRootElement();

      const hasSelection = selection && !selection.isCollapsed;
      const isSelectionInsideEditor =
        hasSelection && editorRoot && editorRoot.contains(selection.anchorNode);

      setEditorHasSelection(Boolean(isSelectionInsideEditor));
    };

    document.addEventListener("selectionchange", updateToolbarVisibility);
    return () => {
      document.removeEventListener("selectionchange", updateToolbarVisibility);
    };
  }, [editor]);

  if (!editorHasSelection && !isMobileScreen) {
    return null;
  }

  return <Toolbar {...props} editor={editor} fixedBottom={isMobileScreen}/>;
}

export default ToolbarPlugin;
