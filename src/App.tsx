import React from 'react';

import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Shell} from './view/shell';

// function InnerApp() {
//   return <View></View>;
// }
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Shell />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   outer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

export default App;
