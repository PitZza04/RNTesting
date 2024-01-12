import 'react-native-url-polyfill/auto'
import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from './lib/react-query'
import {Shell} from './view/shell'
import {RoutesContainer} from './Navigation'
import {Provider as DrawerStateProvider} from './state/shell'
import {Provider as SessionProvider} from './state/session'

function InnerApp() {
  return (
    <SafeAreaProvider>
      <React.Fragment key={'HelloWorld'}>
        <RoutesContainer>
          <Shell />
        </RoutesContainer>
      </React.Fragment>
    </SafeAreaProvider>
  )
}
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <DrawerStateProvider>
          <InnerApp />
        </DrawerStateProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default App
