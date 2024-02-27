import React, {useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen} from './screens/Home';
import {
  BottomTabNavigatorParams,
  StackNavigatorParams,
  State,
} from './lib/routes/types';
import {AboutScreen} from './screens/About';
import {createNativeStackNavigatorWithAuth} from './view/shell/createNativeStackNavigatorWithAuth';
import {AwitScreen} from './screens/AwitScreen';
import {BottomBar} from './view/shell/bottom-bar/BottomBar';

const Tab = createBottomTabNavigator<BottomTabNavigatorParams>();
const Stack = createNativeStackNavigatorWithAuth<StackNavigatorParams>();
const HomeTab = createNativeStackNavigatorWithAuth<StackNavigatorParams>();
const AboutTab = createNativeStackNavigatorWithAuth<StackNavigatorParams>();
function commonScreens(Stack: typeof HomeTab) {
  return (
    <>
      <Stack.Screen
        name="Awit"
        getComponent={() => AwitScreen}
        options={{
          requireAuth: true,
        }}
      />
    </>
  );
}
function HomeTabNavigator() {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        name="Home"
        getComponent={() => HomeScreen}
        options={{requireAuth: true}}
      />
      {commonScreens(HomeTab)}
    </HomeTab.Navigator>
  );
}
function AboutTabNavigator() {
  return (
    <AboutTab.Navigator>
      <AboutTab.Screen name="About" getComponent={() => AboutScreen} />
      {commonScreens(AboutTab)}
    </AboutTab.Navigator>
  );
}

function TabsNavigator() {
  const tabBar = useCallback(
    (props: JSX.IntrinsicAttributes & BottomTabBarProps) => {
      return <BottomBar {...props} />;
    },
    [],
  );
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
      tabBar={tabBar}>
      <Tab.Screen name={'HomeTab'} getComponent={() => HomeTabNavigator} />
      <Tab.Screen name={'AboutTab'} getComponent={() => AboutTabNavigator} />
    </Tab.Navigator>
  );
}
// const LINKING = {
//   getStateFromPath(path: string) {
//     if(path == 'About'){
//       return {
//         routes: [
//           {
//             name: 'AboutTab',
//             state: {
//               routes: [...state, {name: route, params}],
//             },
//           },
//         ],
//       };
//     }
//   },
// };

function RoutesContainer({children}: React.PropsWithChildren<{}>) {
  return <NavigationContainer>{children}</NavigationContainer>;
}

export {TabsNavigator, RoutesContainer};
