import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from './screens/Home';
import {BottomTabNavigatorParams, StackNavigatorParams} from './routes/types';
import {AboutScreen} from './screens/About';

const Tab = createBottomTabNavigator<BottomTabNavigatorParams>();
const Stack = createNativeStackNavigator<StackNavigatorParams>();
const HomeTab = createNativeStackNavigator<StackNavigatorParams>();

function commonScreens(Stack: typeof HomeTab) {
  return (
    <>
      <Stack.Screen name="Awit" getComponent={() => HomeScreen} />
    </>
  );
}
function HomeTabNavigator() {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen name="Home" getComponent={() => HomeScreen} />
      {commonScreens(HomeTab)}
    </HomeTab.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}>
      <Tab.Screen name={'HomeTab'} getComponent={() => HomeTabNavigator} />
      <Tab.Screen name={'AboutTab'} component={AboutScreen} />
    </Tab.Navigator>
  );
}

function RoutesContainer({children}: React.PropsWithChildren<{}>) {
  return <NavigationContainer>{children}</NavigationContainer>;
}

export {TabNavigator, RoutesContainer};
