import React from 'react';
import {RoutesContainer, TabsNavigator} from '#/Navigation';
import {View} from 'react-native';
import {ModalContainer} from '../com/modals/Modal';

export const Shell = () => {
  return (
    <View style={{height: '100%'}}>
      <RoutesContainer>
        <TabsNavigator />
      </RoutesContainer>
      <ModalContainer />
    </View>
  );
};
