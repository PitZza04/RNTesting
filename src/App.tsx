import React, {useState} from 'react';

import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Shell} from './view/shell';
import {Provider as ModalStateProvider} from 'state/modals';
import {Provider as GeolocationStateProvider} from 'state/shell/geolocation';
import {ThemeProvider} from './lib/ThemeContext';
import {init as initPersistedState} from '#/state/persisted';

// function InnerApp() {
//   return <View></View>;
// }
function App() {
  const [isReady, setReady] = useState(false);
  React.useEffect(() => {
    initPersistedState().then(() => setReady(true));
  }, []);
  if (!isReady) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <GeolocationStateProvider>
        <ModalStateProvider>
          <ThemeProvider theme="light">
            <GestureHandlerRootView>
              <Shell />
            </GestureHandlerRootView>
          </ThemeProvider>
        </ModalStateProvider>
      </GeolocationStateProvider>
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
