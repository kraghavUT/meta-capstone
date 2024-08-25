import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './NavigationStack'; 
import { AuthProvider } from './contexts/AuthContext'; 
import { navigationRef } from './NavigationStack';




export default function App({navigation}) {
  
  return (
    <AuthProvider>
        <NavigationContainer>
          <NavigationStack/>
        </NavigationContainer>
    </AuthProvider>
  );
}