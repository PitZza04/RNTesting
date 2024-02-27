import {ConfirmModal} from '#/state/modals';
import {Text, View} from 'react-native';

export const snapPoints = ['60%'];
export function Component({name}: ConfirmModal) {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
