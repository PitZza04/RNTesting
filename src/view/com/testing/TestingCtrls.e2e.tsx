import React from 'react'
import {View, Pressable} from 'react-native'

const BTN = {height: 1, width: 1, backgroundColor: 'red'}

export function TestCtrls() {
  const onPressSignInAlice = () => {
    console.log('Hello world')
  }
  return (
    <View style={{position: 'absolute', top: 100, right: 0, zIndex: 100}}>
      <Pressable
        testID="e2eSignInAlice"
        onPress={onPressSignInAlice}
        accessibilityRole="button"
        style={BTN}
      />
    </View>
  )
}
