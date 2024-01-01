import { useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";
import { useParams } from "next/navigation";

const WORKSPACE_KEY = "workspace";
export const workspaceAtom = atomWithStorage(WORKSPACE_KEY, "");

workspaceAtom.onMount = (set) => {
  if (!localStorage.getItem(WORKSPACE_KEY)) {
    set(nanoid());
  }
};

export default function useWorkspace() {
  const params = useParams<{ workspace: string; id: string }>();
  const { workspace: urlWorkspace } = params;
  const workspace = useAtomValue(workspaceAtom);
  if (urlWorkspace) {
    return urlWorkspace;
  }

  return workspace;
}
