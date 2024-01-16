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
function InnerApp() {
  useEffect(() => {
    Toast.show('hello world')
  }, [])
  return (
    <SafeAreaProvider>
      <React.Fragment key={'HelloWorld'}>
        <RootSiblingParent>
          <RoutesContainer>
            <TestCtrls />
            <Shell />
          </RoutesContainer>
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
