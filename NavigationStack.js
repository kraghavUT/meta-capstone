import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/ProfileScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import { useAuthContext } from './contexts/AuthContext';

const Stack = createStackNavigator();

export default function NavigationStack() {
  const { onboard } = useAuthContext()

  console.log(onboard)

  return (
    <Stack.Navigator>
      {onboard ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}  />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{headerShown:false}} />
      )}
    </Stack.Navigator>
  );
}
