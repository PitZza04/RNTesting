import React from 'react'
import {View, StyleSheet, DimensionValue, StatusBar} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {RootNavigator, RoutesContainer} from '#/Navigation'
import * as notifications from '#/lib/notifications/notification'
import {useSession} from '#/state/session'

function ShellInner() {
  const safeAreaInsets = useSafeAreaInsets()
  const containerPadding = React.useMemo(
    () => ({height: '100%' as DimensionValue, paddingTop: safeAreaInsets.top}),
    [safeAreaInsets],
  )
  const session = useSession()

  React.useEffect(() => {
    notifications.requestPermissionAndRegisterToken(session)
  }, [session])
  React.useEffect(() => {
    if (session) {
      const unsub = notifications.registerTokenChangeHandler(session)
      return unsub
    }
  }, [session])
  return (
    <>
      <View style={containerPadding}>
        <RootNavigator />
      </View>
    </>
  )
}
export function Shell() {
  return (
    <View style={[styles.outerContainer]}>
      <StatusBar barStyle={'dark-content'} />
      <RoutesContainer>
        <ShellInner />
      </RoutesContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    height: '100%',
  },
})
