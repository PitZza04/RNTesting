import {NavigationProp} from '#/lib/routes/types';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';

import {View, StyleSheet, Text} from 'react-native';

export function Address() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <Text>Address</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
