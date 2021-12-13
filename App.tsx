/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation, { navigationRef } from './navigation';

import { Voximplant } from 'react-native-voximplant';
import { useNavigation } from '@react-navigation/native';

const App = () => {

  // 全局监听 vox 呼叫
  useEffect(() => {
    const voxClient = Voximplant.getInstance();
    const { IncomingCall } = Voximplant.ClientEvents;

    voxClient.on(IncomingCall, incomingCallEvent => {
      navigationRef.current?.navigate('IncomingCall', {call: incomingCallEvent.call});
    });

    return () => voxClient.off(IncomingCall);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
 