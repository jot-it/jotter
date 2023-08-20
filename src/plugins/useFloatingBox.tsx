import React, { useRef } from "react";

type Options = {
  /**
   * The position where the floating box should be placed.
   */
  position?: DOMRect;
  /**
   * The container element that the floating box should be positioned relative to.
   */
  anchor: HTMLElement;
  /**
   * Horizontal margin between the floating box and the position.
   */
  offsetX?: number;
  /**
   * Vertical margin between the floating box and the position.
   */
  offsetY?: number;
};

function useFloatingBox({
  position,
  anchor,
  offsetX = 0,
  offsetY = 0,
}: Options) {
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar || !position) {
      return;
    }
    const { x, y, height } = position;
    const anchorRect = anchor.getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();

    let top = y - toolbarRect.height - offsetY;
    let left = x;

    if (top < anchorRect.top) {
      top += toolbarRect.height + height + offsetY * 2;
    }

    if (left + toolbarRect.width > anchorRect.right) {
      left = anchorRect.right - toolbarRect.width;
    }

    left -= anchorRect.left;
    top -= anchorRect.top;

    toolbar.style.transform = `translate(${left}px, ${top}px)`;
  }, [anchor, position, offsetX, offsetY]);

  return { ref: toolbarRef };
}

const useEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

export default useFloatingBox;
