import { useEffect, useRef } from 'react';


export const usePreviousState = <T>(value: T, deps?: any[]): T | undefined => {
  const previousState  = useRef<T>()
  useEffect(() => {
    if(deps?.every((dep) => !!dep))
      previousState.current = value

    return () => {
      previousState.current = undefined
    }
  }, deps)

  return previousState.current
}

export default usePreviousState;