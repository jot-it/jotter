import { EditorThemeClasses } from "lexical";

const theme: EditorThemeClasses = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "",
  paragraph: "mb-3",
  quote: "border-l-4 border-gray-500 px-4 text-gray-500",
  heading: {
    h1: "text-3xl mb-4 border-b-2 border-slate-200 pb-1 font-semibold",
    h2: "text-2xl font-semibold my-4",
    h3: "text-xl my-4",
    h4: "text-lg my-4",
    h5: "text-base my-4",
    h6: "text-sm my-4",
  },
  list: {
    nested: {
      listitem: "mb-0 list-[circle]",
    },
    ol: "T",
    ul: "mb-3 list-disc pl-8",
    listitem: "T",
    listitemChecked: "T",
    listitemUnchecked: "T",
  },
  hashtag: "",
  image: "",
  link: "text-blue-600 hover:underline",
  text: {
    bold: "font-semibold",
    code: "",
    italic: "italic",
    strikethrough: "",
    subscript: "",
    superscript: "",
    underline: "",
    underlineStrikethrough: "",
  },
  code: "",
  codeHighlight: {
    atrule: "",
    attr: "",
    boolean: "",
    builtin: "",
    cdata: "",
    char: "",
    class: "",
    "class-name": "",
    comment: "",
    constant: "",
    deleted: "",
    doctype: "",
    entity: "",
    function: "",
    important: "",
    inserted: "",
    keyword: "",
    namespace: "",
    number: "",
    operator: "",
    prolog: "",
    property: "",
    punctuation: "",
    regex: "",
    selector: "",
    string: "",
    symbol: "",
    tag: "",
    url: "",
    variable: "",
  },
};

export default theme;