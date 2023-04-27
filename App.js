import { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';

import store from './src/store';
import { AppNavigation } from './src/navigation/AppNavigation';
import { DB } from './src/db';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await Font.loadAsync({
          openBold: require('./assets/fonts/OpenSans-Bold.ttf'),
          openRegular: require('./assets/fonts/OpenSans-Regular.ttf'),
        });

        await DB.init();
        console.log('Data base started...');
      } catch (e) {
        console.warn(e);
      }

      setAppIsReady(true);
    };

    init();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppNavigation onReady={onLayoutRootView} />
    </Provider>
  );
}
