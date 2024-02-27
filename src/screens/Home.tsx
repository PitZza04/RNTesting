import React, {useEffect} from 'react';
import {NavigationProp} from '#/lib/routes/types';
import {useNavigation} from '@react-navigation/native';

import {View, StyleSheet, Text, Button, BackHandler} from 'react-native';
import {useModalControls} from '#/state/modals';

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {openModal} = useModalControls();
  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'red'}}>HomeScreen</Text>
      <Button title="Go to Awit" onPress={() => navigation.navigate('Awit')} />
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('AboutTab')}
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
