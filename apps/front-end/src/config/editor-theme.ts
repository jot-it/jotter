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
    checklist: "pl-0",
    listitemChecked:
      "list-none line-through relative mx-2 px-6 outline-none " +
      // Checkbox
      "before:absolute before:top-1.5 before:left-0 before:border " +
      "before:border-transparent before:rounded before:w-4 before:h-4 before:cursor-pointer before:bg-cyan-600 " +
      "before:bg-[url('/assets/check.svg')] " +
      // Aura (hitbox)
      "after:absolute after:-top-0.5 after:-left-2 after:rounded-full after:w-8 after:h-8 " +
      "after:rounded after:bg-transparent after:hover:bg-neutral-400/30 after:cursor-pointer",
    listitemUnchecked:
      "list-none relative mx-2 px-6 outline-none " +
      // Checkbox
      "before:absolute before:top-1.5 before:left-0 before:border " +
      "before:border-slate-600 before:rounded before:w-4 before:h-4 " +
      // Aura(hitbox)
      "after:absolute after:-top-0.5 after:-left-2 after:rounded-full after:w-8 after:h-8 " +
      "after:rounded after:bg-transparent after:hover:bg-neutral-400/30 after:cursor-pointer",
    nested: {
      listitem: "list-none",
    },
    ulDepth: ["", "list-[circle]", "list-[square]"],
  },
  link: "dark:text-cyan-400 dark:visited:text-indigo-400 text-cyan-600 cursor-pointer",
  codeHighlight: codeHighlightTheme,
};

export default theme;
