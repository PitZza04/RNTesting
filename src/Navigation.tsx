import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {
  BottomTabNavigatorParams,
  RootStackNavigatorParams,
} from './lib/routes/types'
import {HomeScreen} from './view/screens/Home'
import {AboutScreen} from './view/screens/About'
import {createStackNavigator} from '@react-navigation/stack'

const Tab = createBottomTabNavigator<BottomTabNavigatorParams>()
const Root = createStackNavigator<RootStackNavigatorParams>()
function RoutesContainer({children}: React.PropsWithChildren<{}>) {
  return <NavigationContainer>{children}</NavigationContainer>
}

function RootNavigator() {
  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Root.Screen name="App" component={TabsNavigator} />
    </Root.Navigator>
  )
}

function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  )
}

export {RoutesContainer, TabsNavigator, RootNavigator}
