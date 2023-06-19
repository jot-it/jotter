import { useState, useCallback } from "react";

/**
 *
 * @returns [toggleVal, togglerFunction]
 */

function useToggle(defaultValue = false): [boolean, () => void] {
  const [toggle, setToggle] = useState(defaultValue);

  const toggler = useCallback(() => setToggle(!toggle), [toggle]);
  return [toggle, toggler];
}

export default useToggle;
