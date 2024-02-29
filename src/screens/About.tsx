import React from 'react';
import {NavigationProp} from '#/lib/routes/types';
import {useNavigation} from '@react-navigation/native';
import * as persisted from '#/state/persisted';
import {View, Text, Button} from 'react-native';
import {useGeolocation, useSetGeolocation} from '#/state/shell/geolocation';

export function AboutScreen() {
  const navigation = useNavigation<NavigationProp>();
  const latLng = useGeolocation();
  const {setLatLng, clearLatLng} = useSetGeolocation();

  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'red'}}>AboutScreen</Text>
      <Text style={{color: '#000'}}>Latlng: {JSON.stringify(latLng)}</Text>
      <Button title="Go to About" onPress={() => navigation.navigate('Awit')} />
      <Button
        title="Set Lat Lng"
        onPress={() => setLatLng({latitude: 1, longitude: 2})}
      />
      <Button title="Clear LatLng" onPress={() => clearLatLng()} />
    </View>
  );
}
