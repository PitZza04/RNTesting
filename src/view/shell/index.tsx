import React from 'react';
import {RoutesContainer, TabNavigator} from '#/Navigation';
import {View} from 'react-native';

export const Shell = () => {
  return (
    <View style={{height: '100%'}}>
      <RoutesContainer>
        <TabNavigator />
      </RoutesContainer>
    </View>
  );
};
