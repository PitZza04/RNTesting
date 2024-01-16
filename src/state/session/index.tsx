import React, {useEffect} from 'react'
import {Session} from '@supabase/supabase-js'
import {supabase} from '#/lib/supabase'

export type StateContext = Session
export type ApiContext = {
  createAccount: (props: {email: string; password: string}) => Promise<void>
  login: (props: {email: string; password: string}) => Promise<void>
  logout: () => Promise<void>
}
const StateContext = React.createContext<StateContext | null>(null)
const ApiContext = React.createContext<ApiContext>({
  createAccount: async () => {},
  login: async () => {},
  logout: async () => {},
})
export function Provider({children}: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState<Session | null>(null)

  const createAccount = React.useCallback<ApiContext['createAccount']>(
    async ({email, password}) => {
      const {data, error} = await supabase.auth.signUp({
        email,
        password,
      })

      console.log({error})
      console.log({data})
    },
    [],
  )
  const login = React.useCallback<ApiContext['login']>(
    async ({email, password}) => {
      const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log({data, error})
    },
    [],
  )
  const logout = React.useCallback<ApiContext['logout']>(async () => {
    await supabase.auth.signOut()
  }, [])

  const api = React.useMemo(
    () => ({
      createAccount,
      login,
      logout,
    }),
    [createAccount, login, logout],
  )

  useEffect(() => {
    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(session)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  return (
    <StateContext.Provider value={state}>
      <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
    </StateContext.Provider>
  )
}

export function useSession() {
  return React.useContext(StateContext)
}

export function useSessionApi() {
  return React.useContext(ApiContext)
}
