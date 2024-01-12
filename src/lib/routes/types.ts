import {NavigatorScreenParams} from '@react-navigation/native'

type CommonNavigatorParams = {
  Log: undefined
}
export type RootStackNavigatorParams = {
  App: NavigatorScreenParams<BottomTabNavigatorParams>
  Log: undefined
}
export type BottomTabNavigatorParams = CommonNavigatorParams & {
  Home: undefined
  About: undefined
  Login: undefined
}
