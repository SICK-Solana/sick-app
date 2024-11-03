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

const AuthLoadingScreen = ({ navigation }) => {
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
            navigation.navigate("AppNavigator");
          } else {
            navigation.navigate("SplashScreen");
          }
        } else {
          navigation.navigate("SplashScreen");
        }
      } catch (error) {
        console.error("Error checking user token:", error);
        navigation.navigate("SplashScreen");
      }
    };

    checkUserToken();
  }, []);

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

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