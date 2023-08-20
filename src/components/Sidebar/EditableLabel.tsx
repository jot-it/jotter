import { useState, useRef, useEffect, KeyboardEvent } from "react";

export type EditableLabelProps = {
  editable?: boolean;
  initialLabel: string;

  onRename?(label: string): void;
  onReset?(): void;
};

function EditableLabel({
  initialLabel,
  editable,
  onRename,
  onReset,
}: EditableLabelProps) {
  const [label, setLabel] = useState(initialLabel);
  const inputRef = useRef<HTMLInputElement>(null);
  const isLabelEmpty = label.trim().length === 0;

  const handleReset = () => {
    setLabel(initialLabel);
    onReset?.();
  };

  const handleRename = () => {
    onRename?.(label);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === "Enter") {
      if (isLabelEmpty) handleReset();
      else handleRename();
    } else if (e.key === "Escape") handleReset();
  };

  useEffect(() => {
    // HACK Use a timeout to prevent race condition between any active focus and this one
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 200);
    return () => clearTimeout(timeout);
  }, [editable]);

  if (!editable) {
    return <span>{initialLabel}</span>;
  }

  return (
    <input
      className="cursor-text bg-transparent outline-none"
      autoComplete="off"
      value={label}
      spellCheck={false}
      ref={inputRef}
      onBlur={handleRename}
      onChange={(e) => setLabel(e.target.value)}
      onKeyUp={handleKeyUp}
      placeholder="new note name..."
    />
  );
}

export default EditableLabel;
