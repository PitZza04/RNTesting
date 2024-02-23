import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type BottomTabNavigatorParams = {
  HomeTab: undefined;
  AboutTab: undefined;
};

export type StackNavigatorParams = {
  Awit: undefined;
  Home: undefined;
};
export type AllNavigatorParams = StackNavigatorParams & {
  HomeTab: undefined;
  AboutTab: undefined;
};
export type NavigationProp = NativeStackNavigationProp<AllNavigatorParams>;
