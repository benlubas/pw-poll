import { useEffect, useState, useRef } from "react";

export const useHov = () => {
  const [state, setState] = useState(false);

  const ref = useRef(null);
  const handelMouseOver = () => setState(true);
  const handelMouseLeave = () => setState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseover", handelMouseOver);
      ref.current.addEventListener("mouseleave", handelMouseLeave);

      return () => {
        ref.current.removeEventListener("mouseover", handelMouseOver);
        ref.current.removeEventListener("mouseleave", handelMouseLeave);
      };
    }
  }, [ref.current]);
  return [ref, state];
};
