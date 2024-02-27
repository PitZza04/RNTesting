import React from 'react';

import {StyleSheet} from 'react-native';
import {Provider as ModalStateProvider} from 'state/modals';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Shell} from './view/shell';
import {ThemeProvider} from './lib/ThemeContext';

// function InnerApp() {
//   return <View></View>;
// }
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ModalStateProvider>
        <ThemeProvider theme="light">
          <GestureHandlerRootView>
            <Shell />
          </GestureHandlerRootView>
        </ThemeProvider>
      </ModalStateProvider>
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
