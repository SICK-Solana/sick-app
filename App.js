import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ContextProvider } from "./context/context";
import AuthLoading from "./screens/AuthLoading";
import KnowMore from "./screens/KnowMore";
import SplashScreen from "./screens/SplashScreen";
import AppNavigator from "./components/AppNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AppNavigator"
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
          <Stack.Screen
            name="KnowMore"
            options={{ headerShown: false }}
            component={KnowMore}
          />
          <Stack.Screen
            name="AppNavigator"
            options={{ headerShown: false }}
            component={AppNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
