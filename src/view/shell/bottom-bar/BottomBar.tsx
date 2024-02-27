import React, {ComponentProps} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {styles} from './BottomBarStyles';
import Animated, {clamp} from 'react-native-reanimated';
import {usePalette} from '#/lib/hooks/usePalette';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useShellLayout} from '#/state/modals/shell/shell-layout';
import {useNavigationTabState} from '#/lib/useNavigationTabState';
import {TabState, getTabState} from '#/lib/routes/helpers';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {StackActions} from '@react-navigation/native';
import {
  HomeIcon,
  HomeIconSolid,
  MagnifyingGlassIcon2,
  MagnifyingGlassIcon2Solid,
  HashtagIcon,
  BellIcon,
  BellIconSolid,
} from '#/lib/icons';
type TabOptions = 'Home' | 'Search' | 'Notifications' | 'MyProfile' | 'Feeds';
export function BottomBar({navigation}: BottomTabBarProps) {
  const pal = usePalette('default');
  const safeAreaInsets = useSafeAreaInsets();
  const {footerHeight} = useShellLayout();
  const hasSession = false;
  const {isAtHome, isAtSearch, isAtFeeds, isAtMyProfile, isAtNotifications} =
    useNavigationTabState();

  const onPressTab = React.useCallback(
    (tab: TabOptions) => {
      const state = navigation.getState();
      const tabState = getTabState(state, tab);
      if (tabState === TabState.InsideAtRoot) {
      } else if (tabState === TabState.Inside) {
        navigation.dispatch(StackActions.popToTop());
      } else {
        navigation.navigate(`${tab}Tab`);
      }
    },
    [navigation],
  );
  const onPressHome = React.useCallback(() => onPressTab('Home'), [onPressTab]);
  const onPressSearch = React.useCallback(
    () => onPressTab('Search'),
    [onPressTab],
  );
  const onPressFeeds = React.useCallback(
    () => onPressTab('Feeds'),
    [onPressTab],
  );
  const onPressNotifications = React.useCallback(
    () => onPressTab('Notifications'),
    [onPressTab],
  );
  const onPressProfile = React.useCallback(
    () => onPressTab('MyProfile'),
    [onPressTab],
  );

  const onLongPressProfile = React.useCallback(
    () => onPressTab('MyProfile'),
    [onPressTab],
  );

  return (
    <Animated.View
      style={[
        styles.bottomBar,
        pal.view,
        pal.border,
        {paddingBottom: clamp(safeAreaInsets.bottom, 15, 30)},
      ]}
      onLayout={e => {
        footerHeight.value = e.nativeEvent.layout.height;
      }}>
      <>
        <Btn
          testID="bottomBarHomeBtn"
          icon={
            isAtHome ? (
              <HomeIconSolid
                strokeWidth={4}
                size={24}
                style={[styles.ctrlIcon, pal.text, styles.homeIcon]}
              />
            ) : (
              <HomeIcon
                strokeWidth={4}
                size={24}
                style={[styles.ctrlIcon, pal.text, styles.homeIcon]}
              />
            )
          }
          onPress={onPressHome}
          accessibilityRole="tab"
          accessibilityLabel={`Home`}
          accessibilityHint=""
        />
        <Btn
          testID="bottomBarSearchBtn"
          icon={
            isAtSearch ? (
              <MagnifyingGlassIcon2Solid
                size={25}
                style={[styles.ctrlIcon, pal.text, styles.searchIcon]}
                strokeWidth={1.8}
              />
            ) : (
              <MagnifyingGlassIcon2
                size={25}
                style={[styles.ctrlIcon, pal.text, styles.searchIcon]}
                strokeWidth={1.8}
              />
            )
          }
          onPress={onPressSearch}
          accessibilityRole="search"
          accessibilityLabel={`Search`}
          accessibilityHint=""
        />
        <Btn
          testID="bottomBarFeedsBtn"
          icon={
            isAtFeeds ? (
              <HashtagIcon
                size={24}
                style={[styles.ctrlIcon, pal.text, styles.feedsIcon]}
                strokeWidth={4}
              />
            ) : (
              <HashtagIcon
                size={24}
                style={[styles.ctrlIcon, pal.text, styles.feedsIcon]}
                strokeWidth={2.25}
              />
            )
          }
          onPress={onPressFeeds}
          accessibilityRole="tab"
          accessibilityLabel={`Feeds`}
          accessibilityHint=""
        />
        <Btn
          testID="bottomBarNotificationsBtn"
          icon={
            true ? (
              <BellIconSolid
                size={24}
                strokeWidth={1.9}
                style={[styles.ctrlIcon, pal.text, styles.bellIcon]}
              />
            ) : (
              <BellIcon
                size={24}
                strokeWidth={1.9}
                style={[styles.ctrlIcon, pal.text, styles.bellIcon]}
              />
            )
          }
          onPress={onPressNotifications}
          notificationCount={`10`}
          accessible={true}
          accessibilityRole="tab"
          accessibilityLabel={`Notifications`}
          accessibilityHint={'' === '' ? '' : `${10} unread`}
        />
        <Btn
          testID="bottomBarProfileBtn"
          icon={
            <View style={styles.ctrlIconSizingWrapper}>
              {isAtMyProfile ? (
                <View
                  style={[
                    styles.ctrlIcon,
                    pal.text,
                    styles.profileIcon,
                    styles.onProfile,
                    {borderColor: pal.text.color},
                  ]}>
                  <Text>H</Text>
                </View>
              ) : (
                <View style={[styles.ctrlIcon, pal.text, styles.profileIcon]}>
                  <Text>N</Text>
                </View>
              )}
            </View>
          }
          onPress={onPressProfile}
          onLongPress={onLongPressProfile}
          accessibilityRole="tab"
          accessibilityLabel={`Profile`}
          accessibilityHint=""
        />
      </>
    </Animated.View>
  );
}

interface BtnProps
  extends Pick<
    ComponentProps<typeof TouchableOpacity>,
    | 'accessible'
    | 'accessibilityRole'
    | 'accessibilityHint'
    | 'accessibilityLabel'
  > {
  testID?: string;
  icon: JSX.Element;
  notificationCount?: string;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
}

function Btn({
  testID,
  icon,
  notificationCount,
  onPress,
  onLongPress,
  accessible,
  accessibilityHint,
  accessibilityLabel,
}: BtnProps) {
  return (
    <TouchableOpacity
      testID={testID}
      style={styles.ctrl}
      onPress={onLongPress ? onPress : undefined}
      onPressIn={onLongPress ? undefined : onPress}
      onLongPress={onLongPress}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}>
      {notificationCount ? (
        <View style={[styles.notificationCount]}>
          <Text style={styles.notificationCountLabel}>{notificationCount}</Text>
        </View>
      ) : undefined}
      {icon}
    </TouchableOpacity>
  );
}
