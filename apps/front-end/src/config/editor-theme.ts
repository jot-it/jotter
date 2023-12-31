import { theme as codeHighlightTheme } from "@/plugins/CodeHighlightPlugin";
import { EditorThemeClasses } from "lexical";

const theme: Readonly<EditorThemeClasses> = {
  text: {
    strikethrough: "line-through",
    underline: "underline",
    underlineStrikethrough: "underline-through",
    italic: "italic",
  },
  list: {
    nested: {
      listitem: "list-none",
    },
  },
  link: "dark:text-cyan-400 dark:visited:text-indigo-400 text-cyan-600 cursor-pointer",
  codeHighlight: codeHighlightTheme,
};

export default theme;
