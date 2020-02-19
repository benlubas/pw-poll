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

      const r = ref.current;
      return () => {
        r.removeEventListener("mouseover", handelMouseOver);
        r.removeEventListener("mouseleave", handelMouseLeave);
      };
    }
  });
  return [ref, state];
};
