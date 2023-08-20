import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalCommand,
  CommandListener,
  CommandListenerPriority,
} from "lexical";
import { useEffect } from "react";

/**
 * Hook wrapper for `editor.registerCommand` that handles automatic unregistration
 * and callback memoization.
 */
function useLexicalCommand<P>(
  command: LexicalCommand<P>,
  listener: CommandListener<P>,
  priority: CommandListenerPriority,
) {
  const [editor] = useLexicalComposerContext();
  const listenerCallback = useCallbackRef(listener);
  useEffect(() => {
    return editor.registerCommand(command, listenerCallback, priority);
  }, [editor, command, priority, listenerCallback]);
}

export default useLexicalCommand;
