import { IS_BROWSER } from "@/utils";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const workspaceAtom = atomWithStorage("workspace", "server");

export default function useWorkspace() {
  const params = useParams<{ workspace: string; id: string }>();
  const { workspace: urlWorkspace } = params;
  const [workspace, setWorkspace] = useAtom(workspaceAtom);

  useEffect(() => {
    if (!localStorage.getItem("workspace")) {
      setWorkspace(nanoid());
    }
  }, []);

  if (urlWorkspace) {
    return urlWorkspace;
  }

  return workspace;
}

// 1° del URL
// 2° LocalStorage
// 3° Lo crea
