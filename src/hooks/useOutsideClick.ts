import { RefObject, useEffect, useRef } from "react";


export const useOutsideClick = (ref : RefObject<HTMLElement> , callback : (e : MouseEvent)=> void) => {
    const callbackRef = useRef(callback);
    
    callbackRef.current = callback;

    const handleClick = (e : MouseEvent) =>{
      if(!(e.target instanceof HTMLElement)){
        return;
      }
      
      if (ref.current && !ref.current.contains(e.target)) {
        callbackRef.current(e)
      }
    };
  
    useEffect(() => {  
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ref]);
  };


  