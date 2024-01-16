import {NavigatorScreenParams} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

type CommonNavigatorParams = {
  Log: undefined
}
export type RootStackNavigatorParams = CommonNavigatorParams & {
  App: NavigatorScreenParams<BottomTabNavigatorParams>
  Login: undefined
}

export type BottomTabNavigatorParams = CommonNavigatorParams & {
  Home: undefined
  About: undefined
}
export type AllNavigatorParams = RootStackNavigatorParams

export type NavigationProp = NativeStackNavigationProp<AllNavigatorParams>
