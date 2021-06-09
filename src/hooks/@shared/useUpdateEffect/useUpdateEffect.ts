import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useUpdateEffect = (
  effect: EffectCallback,
  dependencies?: DependencyList | undefined
): void => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!isFirstMount.current) effect();
    else isFirstMount.current = false;
  }, dependencies);
};

export default useUpdateEffect;
