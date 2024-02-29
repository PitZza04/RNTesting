import React, {useCallback, useEffect} from 'react';
import {NavigationProp} from '#/lib/routes/types';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import * as persisted from '#/state/persisted';
import {View, StyleSheet, Text, Button, BackHandler} from 'react-native';
import {useModalControls} from '#/state/modals';
import {useGeolocation} from '#/state/shell/geolocation';

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {openModal} = useModalControls();
  const location = useGeolocation();
  const items = persisted.get('invites');
  const isScreenFocused = useIsFocused();
  console.log('Items,', items);
  console.log('location,', location);
  useFocusEffect(
    useCallback(() => {
      if (!location) {
        setTimeout(() => {
          navigation.navigate('SearchTab');
        }, 1000);
      }
    }, [location]),
  );

  useEffect(() => {
    if (isScreenFocused && !location) {
      setTimeout(() => navigation.navigate('SearchTab'), 1000);
    }
  }, [isScreenFocused]);
  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'red'}}>HomeScreen</Text>
      <Button title="Go to Awit" onPress={() => navigation.navigate('Awit')} />
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('SearchTab')}
      />
      <Button
        title="Open Bottle"
        onPress={() =>
          openModal({
            name: 'confirm',
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
