import React from 'react'
import {useIsDrawerOpen, useSetDrawerOpen} from '#/state/shell'
import {Button, Text, View} from 'react-native'
import {useSession, useSessionApi} from '#/state/session'
import * as persisted from '#/state/persisted'
import {useInvitesAPI, useInvitesState} from '#/state/invites'
import * as Toast from '../com/util/Toast'
export function HomeScreen() {
  const isDrawerOpen = useIsDrawerOpen()
  const setDrawerOpen = useSetDrawerOpen()

  const session = useSession()
  const {createAccount, login, logout} = useSessionApi()
  const invitesState = useInvitesState()
  const {setInviteCopied} = useInvitesAPI()

  console.log({invitesState})
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
        onPress={() => setInviteCopied('Jejemon')}
      />
      <Button
        title="Open Toast"
        onPress={() => {
          console.log('Open Toast')
          Toast.show('Hello World')
        }}
      />
    </View>
  )
}
