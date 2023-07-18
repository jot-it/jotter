import { LexicalCommand, RangeSelection, TextNode } from "lexical";

export type ComponentPickerOption = {
  key: string;
  icon?: React.ReactNode;
  command: LexicalCommand<unknown>;
  payload?: string | undefined;
};

export function getTextUpToAnchor(selection: RangeSelection): string | null {
  const anchor = selection.anchor;
  if (anchor.type !== "text") {
    return null;
  }
  const anchorNode = anchor.getNode();
  if (!anchorNode.isSimpleText()) {
    return null;
  }
  const anchorOffset = anchor.offset;
  return anchorNode.getTextContent().slice(0, anchorOffset);
}

export function getNodeUpToAnchor(selection: RangeSelection): TextNode | null {
  const anchor = selection.anchor;
  if (anchor.type !== "text") {
    return null;
  }
  
  const anchorNode = anchor.getNode();
  if (!anchorNode.isSimpleText()) {
    return null;
  }
  return anchorNode;
}

const SUPPORTED_URL_PROTOCOLS = new Set([
  'http:',
  'https:',
  'mailto:',
  'sms:',
  'tel:',
]);

export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    // eslint-disable-next-line no-script-url
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return 'about:blank';
    }
  } catch {
    return url;
  }
  return url;
}