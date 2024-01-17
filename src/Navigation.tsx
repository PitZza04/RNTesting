import * as React from 'react'
import {LinkingOptions, NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {
  BottomTabNavigatorParams,
  RootStackNavigatorParams,
} from './lib/routes/types'
import {HomeScreen} from './view/screens/Home'
import {AboutScreen} from './view/screens/About'
import {createStackNavigator} from '@react-navigation/stack'
import {Login} from './view/screens/Login'
import {Linking} from 'react-native'
import messaging from '@react-native-firebase/messaging'

const Tab = createBottomTabNavigator<BottomTabNavigatorParams>()
const Root = createStackNavigator<RootStackNavigatorParams>()

const LINKING: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['demolatest://'],
  config: {
    screens: {
      App: {
        screens: {
          Home: 'Home',
          About: 'About',
        },
      },
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL()

    if (url != null) {
      return url
    }

    const message = await messaging().getInitialNotification()
    if (message) {
      const notificationData = message.data
      console.log({notificationData})
      if (notificationData) {
        return notificationData
      }
    }

    return undefined
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url)

    // Listen to incoming links from deep linking
    const subscription = Linking.addEventListener('url', onReceiveURL)

    // Handle notification caused app to open from background state
    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      remoteMessage => {
        if (remoteMessage) {
          const notification = remoteMessage.data

          console.log('from subscribe', notification)
        }
      },
    )

    return () => {
      subscription.remove()
      unsubscribeNotification()
    }
  },
}
function RoutesContainer({children}: React.PropsWithChildren<{}>) {
  React.useEffect(() => {
    const listener = Linking.addEventListener('url', ({url}) => {
      console.log('Deep Link URL:', url)
    })
    return () => {
      listener.remove()
    }
  }, [])
  return <NavigationContainer linking={LINKING}>{children}</NavigationContainer>
}

function RootNavigator() {
  return (
    <Root.Navigator
      initialRouteName="App"
      screenOptions={{
        headerShown: false,
      }}>
      <Root.Screen name="App" component={TabsNavigator} />
      <Root.Screen name="Login" component={Login} />
    </Root.Navigator>
  )
}

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  )
}

export {RoutesContainer, TabsNavigator, RootNavigator}
