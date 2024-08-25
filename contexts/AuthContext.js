import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
    export const useAuthContext = () => 
        useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [onboard, setOnboard] = useState(false);

  useEffect(() => {
    const checkOnboardStatus = async () => {
      const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
      setOnboard(hasOnboarded === 'true');
    };

    checkOnboardStatus();
  }, []);

  const completeOnboarding = async () => {
    setOnboard(true);
    await AsyncStorage.setItem('hasOnboarded', 'true');
  };

  return (
    <AuthContext.Provider value={{ onboard, completeOnboarding,setOnboard }}>
      {children}
    </AuthContext.Provider>
  );
};
