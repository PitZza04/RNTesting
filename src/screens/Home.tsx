import React from 'react';
import {NavigationProp} from '#/routes/types';
import {useNavigation} from '@react-navigation/native';

import {View, StyleSheet, Text, Button} from 'react-native';

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'red'}}>HomeScreen</Text>
      <Button title="Go to Awit" onPress={() => navigation.navigate('Awit')} />
    </View>
  );
}

const styles = StyleSheet.create({});
