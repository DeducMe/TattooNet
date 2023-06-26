import * as React from 'react';
import {Dispatch, SetStateAction} from 'react';
type Callback<S> = (state: S) => void | (() => void | undefined);

type DispatchWithCallback<A, S> = (value: A, callback: Callback<S>) => void;

function useStateWithCallbackLazy<S>(
  initialValue: S,
): [S, DispatchWithCallback<SetStateAction<S>, S>] {
  const callbackRef = React.useRef(null);

  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(value);

      callbackRef.current = null;
    }
  }, [value]);

  const setValueWithCallback = React.useCallback((newValue, callback) => {
    callbackRef.current = callback;

    return setValue(newValue);
  }, []);

  return [value, setValueWithCallback];
}

export default useStateWithCallbackLazy;
