import React from "react";
import TitleBar from "./TitleBar";
import Toolbar from "./Toolbar";

function DocumentHeader() {
  return (
    <header className="divide-y">
      <TitleBar />
      <Toolbar />
    </header>
  );
}

export default DocumentHeader;
