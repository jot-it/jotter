import { Provider } from "@lexical/yjs";
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";

export function createWebSocketProvider(docName: string, doc: Doc): Provider {
  //@ts-expect-error y-websocket types are not up to date
  return new WebsocketProvider("ws://localhost:1234", docName, doc);
}

/**
 * Retrieve Yjs document from map or create a new one if it doesn't exist.
 */
export function getYDocument(docName: string, yjsDocMap: Map<string, Doc>) {
  let doc = yjsDocMap.get(docName);

  if (!doc) {
    doc = new Doc();
    yjsDocMap.set(docName, doc);
  } else {
    doc.load();
  }

  return doc;
}
