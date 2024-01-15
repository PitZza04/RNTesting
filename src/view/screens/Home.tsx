import React, {useEffect} from 'react'
import {useIsDrawerOpen, useSetDrawerOpen} from '@/state/shell'
import {Button, Text, View} from 'react-native'
import {useSession, useSessionApi} from '@/state/session'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import {BottomTabNavigatorParams} from '@/lib/routes/types'
type Props = NativeStackScreenProps<BottomTabNavigatorParams, 'Home'>
export function HomeScreen({route, navigation}: Props) {
  console.log(navigation.isFocused())
  const isDrawerOpen = useIsDrawerOpen()
  const setDrawerOpen = useSetDrawerOpen()

  const session = useSession()
  const {createAccount, login, logout} = useSessionApi()

  useEffect(() => {
    const getMoviesFromApi = () => {
      return fetch('https://reactnative.dev/movies.json')
        .then(response => response.json())
        .then(json => {
          console.log({json})
          return json.movies
        })
        .catch(error => {
          console.error(error)
        })
    }
    getMoviesFromApi()
  }, [])

  return (
    <View style={{gap: 10}}>
      <Text>{session?.user?.email}</Text>
      <Text>{isDrawerOpen ? 'Drawer is open' : 'Drawer is closed'}</Text>
      <Button
        title="Toggle Drawer"
        onPress={() => setDrawerOpen(!isDrawerOpen)}
      />
      <Button
        title="Create Account"
        onPress={async () =>
          await createAccount({
            email: 'ryanmercurio32@gmail.com',
            password: '015312',
          })
        }
      />
      <Button
        title="Log in "
        onPress={async () =>
          await login({email: 'ryanmercurio32@gmail.com', password: '015312'})
        }
      />
      <Button title="Log out " onPress={() => logout()} />
    </View>
  )
}
