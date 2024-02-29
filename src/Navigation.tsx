import React, {useCallback} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen} from './screens/Home';
import {
  BottomTabNavigatorParams,
  NavigationProp,
  StackNavigatorParams,
  State,
} from './lib/routes/types';
import {AboutScreen} from './screens/About';
import {createNativeStackNavigatorWithAuth} from './view/shell/createNativeStackNavigatorWithAuth';
import {AwitScreen} from './screens/AwitScreen';
import {BottomBar} from './view/shell/bottom-bar/BottomBar';
import {useModalControls} from './state/modals';
import {useGeolocation, useGeolocationApi} from './state/shell/geolocation';
import {FeedScreen} from './screens/Feed';

const Tab = createBottomTabNavigator<BottomTabNavigatorParams>();
const Stack = createNativeStackNavigatorWithAuth<StackNavigatorParams>();
const HomeTab = createNativeStackNavigatorWithAuth<StackNavigatorParams>();
const AboutTab = createNativeStackNavigatorWithAuth<StackNavigatorParams>();
const FeedTab = createNativeStackNavigatorWithAuth<StackNavigatorParams>();
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
      <HomeTab.Screen name="Home" getComponent={() => HomeScreen} />
      {commonScreens(HomeTab)}
    </HomeTab.Navigator>
  );
}
function AboutTabNavigator() {
  return (
    <AboutTab.Navigator>
      <AboutTab.Screen name="Search" getComponent={() => AboutScreen} />
      {commonScreens(AboutTab)}
    </AboutTab.Navigator>
  );
}
function FeedTabNavigator() {
  return (
    <FeedTab.Navigator>
      <FeedTab.Screen name="Feeds" getComponent={() => FeedScreen} />
      {commonScreens(FeedTab)}
    </FeedTab.Navigator>
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
      <Tab.Screen name={'SearchTab'} getComponent={() => AboutTabNavigator} />
      <Tab.Screen name={'FeedsTab'} getComponent={() => FeedTabNavigator} />
      <Tab.Screen
        name={'NotificationsTab'}
        getComponent={() => AboutTabNavigator}
      />
      <Tab.Screen
        name={'MyProfileTab'}
        getComponent={() => AboutTabNavigator}
      />
    </Tab.Navigator>
  );
}

function RoutesContainer({children}: React.PropsWithChildren<{}>) {
  const latLng = useGeolocation();
  const {getCurrentLocation} = useGeolocationApi();

  async function onReady() {
    await getCurrentLocation();
  }
  return (
    <NavigationContainer onReady={onReady}>{children}</NavigationContainer>
  );
}

export {TabsNavigator, RoutesContainer};
