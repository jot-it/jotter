import NoSSR from "@/components/NoSSR";
import { ConnectionConfiguration, createConnection } from "@/lib/collaboration";
import { CollaborationPlugin as LexicalCollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { Provider } from "@lexical/yjs";
import { $createParagraphNode, $getRoot } from "lexical";
import { ComponentPropsWithoutRef } from "react";
import { Doc } from "yjs";

type LexicalCollaborationPluginProps = ComponentPropsWithoutRef<
  typeof LexicalCollaborationPlugin
>;

type IConnectionConfiguration = Omit<
  ConnectionConfiguration,
  "name" | "document"
>;

type CollaborationPluginProps = Pick<
  LexicalCollaborationPluginProps,
  "id" | "username" | "cursorColor"
> & {
  connectionConfig: IConnectionConfiguration;
};

function CollaborationPlugin({
  id,
  username,
  cursorColor,
  connectionConfig,
}: CollaborationPluginProps) {
  return (
    <NoSSR>
      <LexicalCollaborationPlugin
        id={id}
        key={id}
        username={username}
        cursorColor={cursorColor}
        initialEditorState={initialEditorState}
        providerFactory={(id, yjsDocMap) =>
          providerFactory(id, yjsDocMap, connectionConfig)
        }
        shouldBootstrap={true}
      />
    </NoSSR>
  );
}

function initialEditorState() {
  const root = $getRoot();
  const paragraph = $createParagraphNode();
  paragraph.select();
  root.append(paragraph);
}

function providerFactory(
  id: string,
  yjsDocMap: Map<string, Doc>,
  config?: IConnectionConfiguration,
): Provider {
  const doc = new Doc();
  yjsDocMap.set(id, doc);

  //@ts-ignore Awareness type mismatch, we can ignore this
  return createConnection({
    ...config,
    document: doc,
    name: id,
  });
}

export default CollaborationPlugin;
