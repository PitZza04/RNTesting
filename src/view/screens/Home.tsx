import React from 'react'
import {useIsDrawerOpen, useSetDrawerOpen} from '@/state/shell'
import {Button, Text, View} from 'react-native'
import {useSession, useSessionApi} from '@/state/session'

export function HomeScreen() {
  const isDrawerOpen = useIsDrawerOpen()
  const setDrawerOpen = useSetDrawerOpen()

  const session = useSession()
  const {createAccount, login, logout} = useSessionApi()
  console.log('Home', {session})

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
