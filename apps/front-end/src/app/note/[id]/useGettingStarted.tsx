import MARKDOWN_TRANFORMS from "@/plugins/MarkdownShortcutPlugin/transformers";
import { $convertFromMarkdownString } from "@lexical/markdown";
import { InitialEditorStateType } from "@lexical/react/LexicalComposer";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useCallback } from "react";

const showTutorialAtom = atomWithStorage("showTutorial", true);

function useGettingStarted(markdown?: string): InitialEditorStateType {
  const [show, setShow] = useAtom(showTutorialAtom);
  const initializeEditor = useCallback(() => {
    if (markdown) {
      $convertFromMarkdownString(markdown, MARKDOWN_TRANFORMS);
    }
    setShow(false);
  }, [markdown, setShow]);

  if (!show || !markdown) {
    return null;
  }

  return initializeEditor;
}

export default useGettingStarted;
