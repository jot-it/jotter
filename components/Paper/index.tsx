import { useRef, useState } from "react";

type Vector = {
  x: number;
  y: number;
};

function Paper() {
  const caretRef = useRef<HTMLTextAreaElement>(null);
  const [caretPosition, setCaretPosition] = useState<Vector>({ x: 0, y: 0 });

  const caretStyles = {
    top: caretPosition.y + "px",
    left: caretPosition.x + "px",
  };

  // FIXME: This was just an experiment on how to move the textarea.
  return (
    <div className="flex justify-center  py-6">
      <div
        className="min-h-[1056px] w-[816px] bg-white py-12 px-10 shadow-xl"
        onMouseDown={({ clientX, clientY }) => {
          setCaretPosition({ x: clientX, y: clientY });
        }}
      >
        <h1 className="text-6xl">My Page Title</h1>

        <textarea
          className="absolute bg-indigo-400 opacity-25"
          style={caretStyles}
        />
      </div>
    </div>
  );
}

export default Paper;
