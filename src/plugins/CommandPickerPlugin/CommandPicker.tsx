import clsx from "clsx";
import { type } from "os";
import {
  Children,
  Dispatch,
  MouseEventHandler,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createContext } from "react";

export type CommandItemProps = PropsWithChildren<{
  /**
   * String separate by space use to filter by `queryString`
   */
  keywords: string;
  /**
   * It's used to filter by `Keywords` and to be able to display
   */
  queryString: string;
  onClick: MouseEventHandler;
}>;

export type CommandPickerProps = PropsWithChildren<{
  /**
   * Use to show it
   */
  show: boolean;
}>;

const MatchesContext = createContext<Dispatch<SetStateAction<number>>>(
  () => {}
);

function CommandPicker({ children, show }: CommandPickerProps) {
  const [matches, setMatches] = useState(0);

  if (!show) {
    return null;
  }

  console.log(matches);

  return (
    <div
      role="menu"
      className={clsx(
        "absolute left-[460px] top-40 max-h-[30vh] min-w-[180px] flex-1 overflow-auto rounded-lg border bg-white p-1",
        "text-gray-700  shadow-md  data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in",
        "dark:border-slate-600 dark:bg-slate-700 dark:text-inherit"
      )}
    >
      <ul>
        <MatchesContext.Provider value={setMatches}>
          {children}
        </MatchesContext.Provider>
      </ul>
    </div>
  );
}

function CommandItem({
  children,
  keywords,
  queryString,
  onClick,
}: CommandItemProps) {
  const isMatch = keywords.includes(queryString.toLowerCase());
  const setMatches = useContext(MatchesContext);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setMatches((p) => p + (isMatch ? 1 : -1));
    
    //HACK 
    return ()=>{
      hasMounted.current = false;
    }
  }, [setMatches, isMatch]);


  if (!isMatch) {
    return null;
  }

  return (
    <li
      key={keywords}
      className="cursor-pointer rounded-md px-2 py-1 text-base
     hover:bg-gray-200 dark:hover:bg-cyan-800 dark:hover:text-cyan-300"
    >
      <button
        type="button"
        role="menuitem"
        className="inline-flex w-full items-center gap-2"
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}

export default Object.assign(CommandPicker, { Command: CommandItem });
