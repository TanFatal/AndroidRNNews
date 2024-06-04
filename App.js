import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import AppNavigation from './scr/common/navigation/AppNavigation';


export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigation/>
    </SafeAreaProvider>
  );
}
