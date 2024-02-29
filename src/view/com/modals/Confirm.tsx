import {ConfirmModal} from '#/state/modals';
import {Text, View} from 'react-native';

export const snapPoints = ['60%'];
export function Component({name}: ConfirmModal) {
  return (
    <View>
      <Text style={{color: '#000'}}>{name}</Text>
      <Text style={{color: '#000'}}>Hello WOrld</Text>
    </View>
  );
}
