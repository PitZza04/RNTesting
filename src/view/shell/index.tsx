import React from 'react'
import {View, StyleSheet, DimensionValue, StatusBar} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {RootNavigator, RoutesContainer} from '#/Navigation'

function ShellInner() {
  const safeAreaInsets = useSafeAreaInsets()
  const containerPadding = React.useMemo(
    () => ({height: '100%' as DimensionValue, paddingTop: safeAreaInsets.top}),
    [safeAreaInsets],
  )

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
