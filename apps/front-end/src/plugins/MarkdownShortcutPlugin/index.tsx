import { MarkdownShortcutPlugin as LexicalMarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import MARKDOWN_TRANFORMS from "./transformers";

function MarkdownShortcutsPlugin() {
  return <LexicalMarkdownShortcutPlugin transformers={MARKDOWN_TRANFORMS} />;
}

export default MarkdownShortcutsPlugin;
