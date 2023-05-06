import { PropsWithChildren, useEffect, useState } from "react";

function NoSSR({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : null;
}

export default NoSSR;
