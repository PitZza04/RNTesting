import React, {useCallback} from 'react';
import * as persisted from '#/state/persisted';

type StateContext = persisted.Schema['latLng'];
type SetContext = {
  setLatLng: (latLng: persisted.Schema['latLng']) => void;
  clearLatLng: () => void;
};
const stateContext = React.createContext<StateContext>(
  persisted.defaults.latLng,
);
const setContext = React.createContext<SetContext>({} as SetContext);
export function Provider({children}: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState(persisted.get('latLng'));

  const api = React.useMemo(
    () => ({
      setLatLng: (latLng: persisted.Schema['latLng']) => {
        setState(latLng);
        persisted.write('latLng', latLng);
      },
      clearLatLng: () => {
        setState(undefined);
        persisted.write('latLng', undefined);
      },
    }),
    [setState],
  );

  React.useEffect(() => {
    return persisted.onUpdate(() => {
      setState(persisted.get('latLng'));
    });
  }, [setState]);
  return (
    <stateContext.Provider value={state}>
      <setContext.Provider value={api}>{children}</setContext.Provider>
    </stateContext.Provider>
  );
}
export function useGeolocation() {
  return React.useContext(stateContext);
}

export function useSetGeolocation() {
  return React.useContext(setContext);
}
