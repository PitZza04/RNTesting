import React, {useState} from 'react'

export type StateContext = {
  fcmToken: string
}
export type ApiContext = {
  requestPermission: () => void
}
const StateContext = React.createContext<StateContext | null>(null)
export function Provider({children}: React.PropsWithChildren) {
  const [state, setState] = useState<StateContext>({
    fcmToken: '',
  })

  return <StateContext.Provider value={state}>{children}</StateContext.Provider>
}
