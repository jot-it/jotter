import NoSSR from "@/components/NoSSR";
import {
  ConnectionConfiguration,
  createConnection,
  useSelf,
  useToken,
} from "@/lib/collaboration";
import { CollaborationPlugin as LexicalCollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { Provider } from "@lexical/yjs";
import { $createParagraphNode, $getRoot } from "lexical";
import { Doc } from "yjs";

type IConnectionConfiguration = Omit<
  ConnectionConfiguration,
  "name" | "document"
>;

type CollaborationPluginProps = {
  id: string;
};

function CollaborationPlugin({ id }: CollaborationPluginProps) {
  const user = useSelf();
  const token = useToken();

  if (!user || !token) {
    return null;
  }

  return (
    <NoSSR>
      <LexicalCollaborationPlugin
        id={id}
        key={id}
        username={user.name!}
        initialEditorState={initialEditorState}
        providerFactory={(id, yjsDocMap) =>
          providerFactory(id, yjsDocMap, { token: token.value })
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
