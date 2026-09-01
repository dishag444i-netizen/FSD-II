import { useRef } from "react";

function useRenderCount() {
  const count = useRef(0);

  count.current += 1;

  return count.current;
}

export default useRenderCount;