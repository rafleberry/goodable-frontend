import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  VideosScreen,
  TopicsScreen,
  LoginScreen,
  AccountScreen,
} from "./src/screens";
import { Text } from "react-native";

import { useAuth, AuthContext } from "./src/auth";

const Tab = createBottomTabNavigator();

export default function App() {
  const [authState, authContext] = useAuth();

  return (
    <AuthContext.Provider value={authContext}>
      {authState.isLoading ? (
        <Text>Loading...</Text>
      ) : authState.userToken ? (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Videos" component={VideosScreen} />
            <Tab.Screen name="Topics" component={TopicsScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen />
      )}
    </AuthContext.Provider>
  );
}
