import { EditorThemeClasses } from "lexical";

const theme: EditorThemeClasses = {
  text: {
    strikethrough: "line-through",
    underline: "underline",
    underlineStrikethrough: "underline-through",
  },
  link: "dark:text-cyan-400 dark:visited:text-indigo-400 text-cyan-600 cursor-pointer",
  codeHighlight: {
    prolog: "token prolog",
    doctype: "token doctype",
    cdata: "token cdata",
    comment: "token comment",
    namespace: "token namespace",
    string: "token string",
    punctuation: "token punctuation",
    operator: "token operator",
    url: "token url",
    symbol: "token symbol",
    number: "token number",
    boolean: "token boolean",
    variable: "token variable",
    constant: "token constant",
    inserted: "token inserted",
    atrule: "token atrule",
    keyword: "token keyword",
    "attr-value": "token attr-value",
    function: "token function",
    deleted: "token deleted",
    selector: "token selector",
    important: "token important",
    bold: "token bold",
    italic: "token italic",
    "class-name": "token class-name",
    property: "token property",
    tag: "token tag",
    "attr-name": "token attr-name",
    regex: "token regex",
  },
};

export default theme;
