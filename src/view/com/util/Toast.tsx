import RootSiblings from 'react-native-root-siblings'
import React from 'react'
import {Animated, StyleSheet, View, Text} from 'react-native'

import {useAnimatedValue} from 'lib/hooks/useAnimatedValue'
import {IS_TEST} from '#/env'

const TIMEOUT = 4e3 // 4 seconds

export function show(message: string) {
  const item = new RootSiblings(<Toast message={message} />)
  setTimeout(() => {
    item.destroy()
  }, TIMEOUT)
}

function Toast({message}: {message: string}) {
  const interp = useAnimatedValue(0)

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(interp, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.delay(3700),
      Animated.timing(interp, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start()
  })

  const opacityStyle = {opacity: interp}
  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View
        style={[
          {backgroundColor: '#fff'},
          {borderColor: '#000'},
          styles.toast,
          opacityStyle,
        ]}>
        <Text style={{color: '#000'}}>{message}</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  toast: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    marginHorizontal: 6,
  },
  toastDark: {
    backgroundColor: '#f9f9f9',
    shadowOpacity: 0.5,
  },
})
