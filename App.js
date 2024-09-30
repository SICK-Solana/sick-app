import React from "react";
import { ContextProvider } from "./context/context";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./screens/SplashScreen";
import AuthLoading from "./screens/AuthLoading";
import Hello from "./screens/Hello";

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