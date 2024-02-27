import {
  createNavigatorFactory,
  EventArg,
  ParamListBase,
  StackActionHelpers,
  StackActions,
  StackNavigationState,
  StackRouter,
  StackRouterOptions,
  useNavigationBuilder,
} from '@react-navigation/native';
import * as React from 'react';

import {
  NativeStackView,
  type NativeStackNavigationEventMap,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import type {NativeStackNavigatorProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Text, View} from 'react-native';
import {usePalette} from '#/lib/hooks/usePalette';

type NativeStackNavigationOptionsWithAuth = NativeStackNavigationOptions & {
  requireAuth?: boolean;
};

function NativeStackNavigator({
  id,
  initialRouteName,
  children,
  screenListeners,
  screenOptions,
  ...rest
}: NativeStackNavigatorProps) {
  const {state, descriptors, navigation, NavigationContent} =
    useNavigationBuilder<
      StackNavigationState<ParamListBase>,
      StackRouterOptions,
      StackActionHelpers<ParamListBase>,
      NativeStackNavigationOptionsWithAuth,
      NativeStackNavigationEventMap
    >(StackRouter, {
      id,
      initialRouteName,
      children,
      screenListeners,
      screenOptions,
    });

  React.useEffect(
    () =>
      // @ts-expect-error: there may not be a tab navigator in parent
      navigation?.addListener?.('tabPress', (e: any) => {
        const isFocused = navigation.isFocused();

        // Run the operation in the next frame so we're sure all listeners have been run
        // This is necessary to know if preventDefault() has been called
        requestAnimationFrame(() => {
          if (
            state.index > 0 &&
            isFocused &&
            !(e as EventArg<'tabPress', true>).defaultPrevented
          ) {
            // When user taps on already focused tab and we're inside the tab,
            // reset the stack to replicate native behaviour
            navigation.dispatch({
              ...StackActions.popToTop(),
              target: state.key,
            });
          }
        });
      }),
    [navigation, state.index, state.key],
  );
  const pal = usePalette('default');
  const activeRoute = state.routes[state.index];
  const activeDescriptor = descriptors[activeRoute.key];
  const activeRouteRequiresAuth = activeDescriptor.options.requireAuth ?? false;
  const newDescriptors: typeof descriptors = {};

  if (activeRouteRequiresAuth && true) {
    return (
      <View
        style={[
          {
            flex: 1,

            height: '100%',
          },
          pal.view,
        ]}>
        <Text>You need to login</Text>
      </View>
    );
  }
  // if (true) {
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: 'red',
  //         flex: 1,
  //         position: 'absolute',
  //         top: 0,
  //         right: 0,
  //         left: 0,
  //         bottom: 0,
  //       }}>
  //       <Text>You need to login</Text>
  //     </View>
  //   );
  // }
  for (let key in descriptors) {
    const descriptor = descriptors[key];
    const requireAuth = descriptor.options.requireAuth ?? false;
    newDescriptors[key] = {
      ...descriptor,
      render() {
        if (requireAuth) {
          console.log('required Auth');
          return <View />;
        } else {
          return descriptor.render();
        }
      },
    };
  }

  return (
    <NavigationContent>
      <NativeStackView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </NavigationContent>
  );
}

export const createNativeStackNavigatorWithAuth = createNavigatorFactory<
  StackNavigationState<ParamListBase>,
  NativeStackNavigationOptionsWithAuth,
  NativeStackNavigationEventMap,
  typeof NativeStackNavigator
>(NativeStackNavigator);
