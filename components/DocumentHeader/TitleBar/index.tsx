import TextField from "../../Input/TextField";

function TitleBar() {
  return (
    <div>
      <TextField
        className="font-medium"
        aria-label="Rename Document"
        placeholder="Document title..."
      />
    </div>
  );
}

export default TitleBar;
