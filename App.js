import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ContextProvider } from "./context/context";
import AuthLoading from "./screens/AuthLoading";
import SplashScreen from "./screens/SplashScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          {/* <Stack.Screen
              name="AuthLoading"
              options={{ headerShown: false }}
              component={AuthLoading}
            /> */}
          <Stack.Screen
            name="SplashScreen"
            options={{ headerShown: false }}
            component={SplashScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
