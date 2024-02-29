import {NavigationState, PartialState} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type BottomTabNavigatorParams = {
  HomeTab: undefined;
  AboutTab: undefined;
  SearchTab: undefined;
  NotificationsTab: undefined;
  MyProfileTab: undefined;
  FeedsTab: undefined;
};

export type StackNavigatorParams = {
  Awit: undefined;
  Home: undefined;
  About: undefined;
  Google: undefined;
  Search: undefined;
  Feeds: undefined;
};
export type AllNavigatorParams = StackNavigatorParams & {
  HomeTab: undefined;
  AboutTab: undefined;
  SearchTab: undefined;
  FeedsTab: undefined;
};

export type NavigationProp = NativeStackNavigationProp<AllNavigatorParams>;

export type State =
  | NavigationState
  | Omit<PartialState<NavigationState>, 'stale'>;

export type RouteParams = Record<string, string>;
