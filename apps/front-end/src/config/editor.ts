import { ImageNode } from "@/plugins/ImagePlugin";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import theme from "./editor-theme";

const editorConfig: InitialConfigType = {
  namespace: "jotter",
  theme,
  onError(error, editor) {
    console.log(error);
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    CodeNode,
    ImageNode,
  ],
};

export default editorConfig;
