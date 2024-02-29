import React, {useCallback} from 'react';
import * as persisted from '#/state/persisted';
import {
  checkHasLocationPermission,
  useLocationPermission,
} from '#/lib/hooks/usePermission';
import Geolocation from 'react-native-geolocation-service';
import {haversine} from '#/lib/calculate/haversine';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
type StateContext = persisted.Schema['latLng'];
type ApiContext = {
  setLatLng: (latLng: persisted.Schema['latLng']) => void;
  clearLatLng: () => void;
  getCurrentLocation: () => Promise<void>;
};
const stateContext = React.createContext<StateContext>(
  persisted.defaults.latLng,
);
const setContext = React.createContext<ApiContext>({
  clearLatLng() {},
  setLatLng() {},
  async getCurrentLocation() {},
});
export function Provider({children}: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState(persisted.get('latLng'));

  const getCurrentLocation = useCallback(async () => {
    // const hasLocationPermission = await checkHasLocationPermission();
    const {requestLocationAccessIfNeeded} = useLocationPermission();
    const hasLocationPermission = await requestLocationAccessIfNeeded();
    console.log('Permission', hasLocationPermission);
    if (hasLocationPermission) {
      console.log('Geolocation', hasLocationPermission);
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log('latLNg', latitude, longitude);
          setState({latitude, longitude});
          // if a location is stored and user is not more then 5km in distance from previous stored location skip geocode
          if (
            state &&
            haversine(
              [latitude, longitude],
              [state.latitude, state.longitude],
            ) > 5
          ) {
            return;
          }
          // geocode(latitude, longitude).then(googleAddress => {
          //   if (!googleAddress) {
          //     return;
          //   }
          //   console.log('Google Address', googleAddress);
          // });
        },
        error => {
          console.error('Error', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [state, setState]);
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
      getCurrentLocation,
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

export function useGeolocationApi() {
  return React.useContext(setContext);
}
