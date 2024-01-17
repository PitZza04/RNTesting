import {NavigationProp} from '#/lib/routes/types'
import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
export function AboutScreen() {
  const navigation = useNavigation<NavigationProp>()
  return (
    <View>
      <Text>About</Text>
      <Button
        title="Navigate to Home"
        onPress={() => {
          navigation.navigate('App', {
            screen: 'Home',
          })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
