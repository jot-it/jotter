import { theme as codeHighlightTheme } from "@/plugins/CodeHighlightPlugin";
import { EditorThemeClasses } from "lexical";

const theme: EditorThemeClasses = {
  text: {
    strikethrough: "line-through",
    underline: "underline",
    underlineStrikethrough: "underline-through",
    italic: "italic",
    code: "rounded bg-gray-200 px-2 py-1 dark:bg-slate-700",
  },
  code: "block rounded-md border border-slate-700 p-4 pt-10 bg-neutral-900",
  list: {
    nested: {
      listitem: "list-none",
    },
  },
  link: "dark:text-cyan-400 dark:visited:text-indigo-400 text-cyan-600 cursor-pointer",
  codeHighlight: codeHighlightTheme,
};

export default theme;
