import { createProvider } from "@/lib/collaboration";
import { CollaborationPlugin as LexicalCollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { Provider } from "@lexical/yjs";
import { $getRoot, $createParagraphNode } from "lexical";
import { ComponentPropsWithoutRef } from "react";
import { Doc } from "yjs";

type LexicalCollaborationPluginProps = ComponentPropsWithoutRef<
  typeof LexicalCollaborationPlugin
>;

type CollaborationPluginProps = Pick<
  LexicalCollaborationPluginProps,
  "id" | "username" | "cursorColor" | "initialEditorState"
>;

function CollaborationPlugin({
  id,
  username,
  cursorColor,
  initialEditorState,
}: CollaborationPluginProps) {
  return (
    <LexicalCollaborationPlugin
      id={id}
      key={id}
      username={username}
      cursorColor={cursorColor}
      initialEditorState={initialEditorState ?? initializeEmptyEditor}
      providerFactory={providerFactory}
      shouldBootstrap={true}
    />
  );
}

function initializeEmptyEditor() {
  const root = $getRoot();
  const paragraph = $createParagraphNode();
  paragraph.select();
  root.append(paragraph);
}

function providerFactory(id: string, yjsDocMap: Map<string, Doc>): Provider {
  const doc = new Doc();
  yjsDocMap.set(id, doc);

  //@ts-ignore Awareness type mismatch, we can ignore this
  return createProvider({
    document: doc,
    name: id,
  });
}

export default CollaborationPlugin;
