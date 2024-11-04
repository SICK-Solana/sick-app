import { Stack } from "expo-router";

import { ContextProvider } from "../context/context";

export default function Layout() {
  return (
    <ContextProvider>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="SplashScreen" />
        <Stack.Screen name="KnowMore" />
        <Stack.Screen name="AppNavigator" />
      </Stack>
    </ContextProvider>
  );
}
