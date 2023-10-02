import { createProvider } from "@/lib/collaboration";
import { CollaborationPlugin as LexicalCollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { $createHeadingNode } from "@lexical/rich-text";
import { Provider } from "@lexical/yjs";
import { $getRoot, LexicalEditor } from "lexical";
import { ComponentPropsWithoutRef } from "react";
import { Doc } from "yjs";

type LexicalCollaborationPluginProps = ComponentPropsWithoutRef<
  typeof LexicalCollaborationPlugin
>;

type CollaborationPluginProps = Pick<
  LexicalCollaborationPluginProps,
  "id" | "username" | "cursorColor"
>;

function CollaborationPlugin({
  id,
  username,
  cursorColor,
}: CollaborationPluginProps) {
  return (
    <LexicalCollaborationPlugin
      id={id}
      username={username}
      cursorColor={cursorColor}
      providerFactory={providerFactory}
      initialEditorState={initialEditorState}
      shouldBootstrap={true}
    />
  );
}

function initialEditorState(editor: LexicalEditor): void {
  const root = $getRoot();
  const headingPlaceholder = $createHeadingNode("h1");
  root.append(headingPlaceholder);
}

function providerFactory(id: string, yjsDocMap: Map<string, Doc>): Provider {
  let doc = yjsDocMap.get(id);
  if (!doc) {
    doc = new Doc();
    yjsDocMap.set(id, doc);
  } else {
    doc.load();
  }
  //@ts-ignore Awareness type mismatch, we can ignore this
  return createProvider(doc, id);
}

export default CollaborationPlugin;
