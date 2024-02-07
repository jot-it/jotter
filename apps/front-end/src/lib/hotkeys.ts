import { KeyboardEventHandler } from "react";

type ShorcutConfiguration = {
  modifiers?: Partial<
    Pick<KeyboardEvent, "altKey" | "metaKey" | "ctrlKey" | "shiftKey">
  >;
  key: string;
};

export function createShortcutHandler(options: ShorcutConfiguration) {
  return function handler(
    callback: KeyboardEventHandler,
  ): KeyboardEventHandler {
    return (e) => {
      if (e.repeat || isEditableElement(e.target)) {
        // Either This event was already handled (user is holding the keys)
        // Or the user is editing some text, so we do nothing.
        return;
      }
      if (!options.modifiers && options.key === e.code) {
        callback(e);
        return;
      }

      if (!options.modifiers) {
        return;
      }

      const modifierKeys = Object.keys(options.modifiers) as Array<
        keyof typeof options.modifiers
      >;
      for (const key of modifierKeys) {
        if (e[key] !== options.modifiers[key]) {
          return;
        }
      }
      if (options.key === e.code) {
        callback(e);
      }
    };
  };
}

function isEditableElement(target: EventTarget): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA"
  );
}

export function registerShortcuts(
  ...handlers: KeyboardEventHandler[]
): KeyboardEventHandler {
  return (e) => {
    for (const handler of handlers) {
      handler(e);
    }
  };
}
