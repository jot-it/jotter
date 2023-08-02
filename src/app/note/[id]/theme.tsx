import { EditorThemeClasses } from "lexical";

const theme: EditorThemeClasses = {
  text: {
    strikethrough: "line-through",
    underline: "underline",
    underlineStrikethrough: "underline-through",
  },
  link: "dark:text-cyan-400 dark:visited:text-indigo-400 text-cyan-600 cursor-pointer",
};

export default theme;
