import React from 'react';
import {NavigationProp} from '#/lib/routes/types';
import {useNavigation} from '@react-navigation/native';

import {View, Text, Button} from 'react-native';

export function AboutScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'red'}}>AboutScreen</Text>
      <Button title="Go to About" onPress={() => navigation.navigate('Awit')} />
    </View>
  );
}
