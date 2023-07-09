import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  RangeSelection,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState, useTransition } from "react";
import Typography from "@/components/Typography";

export default function ComponentPickerMenuPlugin() {
  const [editor] = useLexicalComposerContext();
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [command, setCommand] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSelectionChanged = useCallback(() => {
    const queryText = $getQueryTextForSearch();
    const selectionString = queryText ?? "";
    const matcher = /(?<=\s)\/([a-zA-Z]*)/;

    const foundMatch = matcher.exec(selectionString);
    const canShow = Boolean(foundMatch?.[0]);
    const command = foundMatch?.[1];

    // Optimization 
    startTransition(()=>{
      setText(selectionString);
    });

    setShow(canShow);
    setCommand(command ?? "none");
    
    return false;
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      handleSelectionChanged,
      COMMAND_PRIORITY_LOW
    );
  }, [editor, handleSelectionChanged]);

  //TODO: Change to real picker
  return (
    <>
      <div className="flex gap-1">
        <Typography className="rounded-lg bg-teal-700 px-3 py-2 text-slate-100">
          {"Selection: " + text}
        </Typography>
        <Typography className="rounded-lg bg-amber-700 px-3 py-2 text-slate-100">
          {"Match: " + show}
        </Typography>
        <Typography className="rounded-lg bg-indigo-700 px-3 py-2 text-slate-100">
          {"Command: " + command}
        </Typography>
      </div>
    </>
  );
}

function $getQueryTextForSearch() {
  let text;
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) {
    return null;
  }
  text = getTextUpToAnchor(selection);
  return text;
}

function getTextUpToAnchor(selection: RangeSelection): string | null {
  const anchor = selection.anchor;
  if (anchor.type !== "text") {
    return null;
  }
  const anchorNode = anchor.getNode();
  if (!anchorNode.isSimpleText()) {
    return null;
  }
  const anchorOffset = anchor.offset;
  return anchorNode.getTextContent().slice(0, anchorOffset);
}
