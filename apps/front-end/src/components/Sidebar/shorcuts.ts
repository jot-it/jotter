import { createShortcutHandler } from "@/lib/hotkeys";

export const withDeleteItemShortcut = createShortcutHandler({
  key: "Delete",
});

export const withRenameItemShortcut = createShortcutHandler({
  key: "F2",
});
