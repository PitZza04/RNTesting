import React from 'react'
import {useIsDrawerOpen, useSetDrawerOpen} from '#/state/shell'
import {Button, Text, View} from 'react-native'
import {useSession, useSessionApi} from '#/state/session'
import * as persisted from '#/state/persisted'
import {useInvitesAPI, useInvitesState} from '#/state/invites'
import * as Toast from '../com/util/Toast'
import {useNavigation} from '@react-navigation/native'
import {NavigationProp} from '#/lib/routes/types'
export function HomeScreen() {
  const isDrawerOpen = useIsDrawerOpen()
  const setDrawerOpen = useSetDrawerOpen()
  const navigation = useNavigation<NavigationProp>()
  const session = useSession()
  console.log({session})
  const {createAccount, login, logout} = useSessionApi()
  const invites = useInvitesState()
  const {setInviteCopied} = useInvitesAPI()

  const showToast = () => {
    Toast.show('Hello World')
  }

  return (
    <View style={{gap: 10}}>
      <Text>{session?.user?.email}</Text>
      <Text>{JSON.stringify(invites.copiedInvites, null, 2)}</Text>
      <Text>{isDrawerOpen ? 'Drawer is open' : 'Drawer is closed'}</Text>
      <Button
        title="Toggle Drawer"
        onPress={() => setDrawerOpen(!isDrawerOpen)}
      />
      <Button
        title="Create Account"
        onPress={async () =>
          await createAccount({
            email: 'ryanmercurio30@gmail.com',
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
      <Button
        title="Persist Invites "
        onPress={() => setInviteCopied('Raul')}
      />
      <Button title="Open Toast" onPress={showToast} />
      <Button
        title="Navigate to About"
        onPress={() => {
          navigation.navigate('App', {
            screen: 'About',
          })
        }}
      />
    </View>
  )
}
