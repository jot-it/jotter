import { useEffect, useRef, useState } from "react";

/**
 * Hook implementation of `window.matchMedia`.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia MDN Reference}
 * @param query
 * @param handler - Optional callback to be called when the media query matches or unmatches.
 *
 * @returns `true` if the media query matches, `false` otherwise.
 */
function useMatchMedia(
  query: string,
  handler?: (event: MediaQueryListEvent) => void,
) {
  const [matches, setMatches] = useState(false);
  const onMediaListener = useRef(handler);
  onMediaListener.current = handler;
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
      onMediaListener.current?.(event);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query, onMediaListener]);

  return matches;
}

export default useMatchMedia;
