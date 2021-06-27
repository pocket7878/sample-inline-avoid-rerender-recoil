import { useCallback, useState, useEffect } from "react";
import { Loadable, RecoilState, useSetRecoilState } from "recoil";

export const useSetInvalidateRecoilValue = (state: RecoilState<number>) => {
  const setRequestID = useSetRecoilState(state);

  return useCallback(() => setRequestID(prev => prev + 1), [setRequestID]);
};

export const useCachedRecoilValueLoadableSelector = <S, T>(loadable: Loadable<S>, fn: (arg0: S) => T) => {
  const [value, setValue] = useState<T | undefined>(undefined);
  useEffect(() => {
    if (loadable.state === "hasValue") {
      setValue(fn(loadable.contents));
    }
  }, [loadable.state, loadable.contents, fn]);

  return value;
};