import React from "react";

// useLayoutEffect is only available in the browser
const useLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default useLayoutEffect;
