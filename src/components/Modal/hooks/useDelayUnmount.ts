import { useEffect, useState } from "react";

interface Options {
  delay: number;
}

export default function useDelayUnmount(state: boolean, options: Options = {delay: 200}) {
  const { delay } = options;

  const [shouldRender, setShouldRender] = useState<boolean>(state);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if(state && !shouldRender) {
      setShouldRender(true);
    }
    else if(!state && shouldRender) {
      timeoutId = setTimeout(() => {
        setShouldRender(false)
      }, delay)
    }
    return () => clearTimeout(timeoutId);
  }, [delay, shouldRender, state])

  return {shouldRender};
}
