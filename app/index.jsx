import React, { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  StyleSheet,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../context/context";
import { useRouter } from "expo-router";

const AuthLoadingScreen = () => {
  const router = useRouter();
  const { setUserToken, setUserId, setWalletStatus } = useContext(Context);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const localData = await AsyncStorage.multiGet([
          "userToken",
          "userId",
          "walletConnected",
        ]);

        const localToken = localData[0][1];
        const localUserId = localData[1][1];
        const localConnection = localData[2][1] === "true";

        if (localToken) {
          setUserToken(localToken);
          setUserId(localUserId);
          setWalletStatus(localConnection);

          if (localConnection) {
            router.push("/AppNavigator");
          } else {
            router.push("/SplashScreen");
          }
        } else {
          router.push("/SplashScreen");
        }
      } catch (error) {
        console.error("Error checking user token:", error);
        router.push("/SplashScreen");
      }
    };

    checkUserToken();
  }, [router]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="rgb(3 98 76)" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthLoadingScreen;