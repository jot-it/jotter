import useLayoutEffect from "@/hooks/useLayoutEffect";
import { useRef } from "react";

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

/**
 * Calculates `position` of a element relative to `anchor` element. Resulting position
 * is adjusted to stay within screen boundaries to maximize visibility.
 *
 * The following CSS properties are injected to allow animations and placement:
 *
 * `--box-position-left`
 *
 * `--box-position-right`
 */
function useFloatingBox({
  position,
  anchor,
  offsetX = 0,
  offsetY = 0,
}: Options) {
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
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

    // toolbar.style.transform = `translate(${left}px, ${top}px)`;
    toolbar.style.setProperty("--box-position-left", `${left}px`);
    toolbar.style.setProperty("--box-position-top", `${top}px`);
  }, [anchor, position, offsetX, offsetY]);

  return { ref: toolbarRef };
}

export default useFloatingBox;
