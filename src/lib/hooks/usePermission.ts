import {isAndroid, isIOS} from '#/platform/detection';
import {Alert, Linking} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  checkMultiple,
  request,
} from 'react-native-permissions';

export function checkHasLocationPermission() {
  return new Promise(resolve => {
    return checkMultiple([
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]).then(statuses => {
      if (
        isAndroid &&
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.DENIED
      ) {
        return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
          result => {
            resolve(result === 'granted');
          },
        );
      }

      if (
        !isAndroid &&
        statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.DENIED
      ) {
        return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
          resolve(result === 'granted');
        });
      }

      resolve(true);
    });
  });
}

const openPermissionAlert = (perm: string) => {
  Alert.alert(
    'Permission needed',
    `Auto-Mate does not have permission to access your ${perm}.`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Open Settings', onPress: () => Linking.openSettings()},
    ],
  );
};
export function useLocationPermission() {
  const type = isIOS
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const requestLocationAccessIfNeeded = async () => {
    const res = await check(type);

    if (res == 'granted') {
      return true;
    } else if (!res || res == 'denied' || res == 'limited') {
      const updateRes = await request(type);
      if (updateRes == 'blocked') {
        openPermissionAlert('location');
        return false;
      }
      return updateRes == 'granted';
    } else {
      console.log('Open Permission');
      openPermissionAlert('location');
      return false;
    }
  };

  return {requestLocationAccessIfNeeded};
}
