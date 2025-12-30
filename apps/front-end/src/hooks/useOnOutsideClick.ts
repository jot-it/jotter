import { RefObject, useEffect } from "react";
import { useCallbackRef } from "./useCallbackRef";

type ClickHandler = (e: MouseEvent) => void;

export const useOnOutsideClick = (
  ref: RefObject<HTMLElement>,
  onClick: ClickHandler,
) => {
  const onClickCallback = useCallbackRef(onClick);

  useEffect(() => {
    const handleClick: ClickHandler = (e) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }

      if (ref.current && !ref.current.contains(e.target)) {
        onClickCallback(e);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, onClickCallback]);
};
