import { nanoid } from "nanoid";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useWorkspace() {
  const params = useParams<{ workspace: string; id: string }>();
  const { workspace: urlWorkspace } = params;

  const [workspace, setWorkspace] = useState(() => nanoid());

  useEffect(() => {
    const storageWorkspace = window.localStorage.getItem("workspace");
    if (!storageWorkspace) {
      window.localStorage.setItem("workspace", workspace);
    } else {
      setWorkspace(storageWorkspace);
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
