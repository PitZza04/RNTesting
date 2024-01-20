import messaging from '@react-native-firebase/messaging'
import {PermissionsAndroid, Platform} from 'react-native'
import {
  getApiLevel,
  getBrand,
  getBuildNumber,
  getManufacturer,
  getModel,
  getSystemName,
  getUniqueId,
} from 'react-native-device-info'
import {supabase} from '../supabase'
import {Session} from '@supabase/supabase-js'
export async function checkPermission() {
  const permission = await messaging().hasPermission()
  console.log({permission})
  return permission
}

export async function requestPermission() {
  const apiLevel = await getApiLevel()
  const fcmToken = await messaging().getToken()
  const deviceId = await getUniqueId()
  const manufacturer = await getManufacturer()
  const devicePlatform = getSystemName()
  const model = getModel()

  const deviceName = `${manufacturer} ${model}`

  const brandName = getBrand()
  const buildNumber = getBuildNumber()

  const isAndroidAPILevelGreater32 = apiLevel > 32 && Platform.OS === 'android'
  if (isAndroidAPILevelGreater32) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )
  }
  await messaging().requestPermission()

  const pushData = {
    subscription_type: 'fcm',
    subscription_attributes: {
      deviceName,
      devicePlatform,
      apiLevel,
      brandName,
      buildNumber,
      push_token: fcmToken,
      device_id: deviceId,
    },
  }
}

//TODO: Optimize Update on User
export async function requestPermissionAndRegisterToken(
  session: Session | null,
) {
  const permissionEnabled = await messaging().hasPermission()
  const apiLevel = await getApiLevel()

  const token = await messaging().getToken()
  const isAndroidAPILevelGreater32 = apiLevel > 32 && Platform.OS === 'android'
  if (!permissionEnabled || permissionEnabled === -1) {
    if (isAndroidAPILevelGreater32) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
    }
    await messaging().requestPermission()
  }

  if (!session) return

  try {
    console.debug('Saving fcm token', token)
    await supabase
      .from('users')
      .update({fcm_token: token})
      .eq('id', session.user.id)
  } catch (error) {
    console.error('Failed to saved fcm token')
  }
}

export function registerTokenChangeHandler(session: Session) {
  const unsubscribe = messaging().onTokenRefresh(async fcmToken => {
    console.debug('Notification: Push Token changed', {fcmToken})

    try {
      await supabase
        .from('users')
        .upsert({id: session?.user?.id, fcm_token: fcmToken})
    } catch (error) {
      console.error('Notifications: Failed to set push token', {error})
    }
  })

  return () => {
    unsubscribe()
  }
}
