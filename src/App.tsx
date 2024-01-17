import 'react-native-url-polyfill/auto'
import React, {useEffect, useState} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from './lib/react-query'
import {Shell} from './view/shell'
import {RoutesContainer} from './Navigation'
import {Provider as DrawerStateProvider} from './state/shell'
import {Provider as SessionProvider} from './state/session'
import {Provider as InvitesStateProvider} from './state/invites'
import {TestCtrls} from './view/com/testing/TestCtrls'
import {init as initPersistedState} from '#/state/persisted'
import {RootSiblingParent} from 'react-native-root-siblings'
import * as Toast from './view/com/util/Toast'
import * as Notification from 'lib/notifications/notification'
import {listenSessionDropped} from './state/event'
import messaging from '@react-native-firebase/messaging'
import {Alert} from 'react-native'

//
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log({remoteMessage})
})

function InnerApp() {
  useEffect(() => {
    listenSessionDropped(() => {
      console.log('Heyyow')
      Toast.show(`Sorry! Your session expired. Please log in again.`)
    })
    Notification.requestPermissionV2()
  }, [])

  useEffect(() => {
    //On ForeGround
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })

    return unsubscribe
  }, [])

  return (
    <SafeAreaProvider>
      <React.Fragment key={'HelloWorld'}>
        <RootSiblingParent>
          <TestCtrls />
          <Shell />
        </RootSiblingParent>
      </React.Fragment>
    </SafeAreaProvider>
  )
}
export function App() {
  const [isReady, setReady] = useState(false)
  React.useEffect(() => {
    initPersistedState().then(() => setReady(true))
  }, [])
  if (!isReady) {
    return null
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <InvitesStateProvider>
          <DrawerStateProvider>
            <InnerApp />
          </DrawerStateProvider>
        </InvitesStateProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default App
