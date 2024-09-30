// todo
import React, { useContext, useEffect } from "react";

import {
  ActivityIndicator,
  Alert,
  BackHandler,
  StyleSheet,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigationState } from "@react-navigation/native";

import { Context } from "../context/context";

const AuthLoadingScreen = ({ navigation }) => {
  const { setUserToken, setUserId, setWalletStatus } = useContext(Context);

  useEffect(() => {
    const checkUserToken = async () => {
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

        if (localDetailsDone && localFutureDone) {
          navigation.navigate("MainTabs");
        } else if (!localFutureDone && localDetailsDone) {
          navigation.navigate("FutureGoals");
        } else if (!localDetailsDone) {
          navigation.navigate("ClaimInvestment");
        }
      } else {
        navigation.navigate("SplashScreen");
      }
    };
    checkUserToken();
  }, []);

  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    const backAction = () => {
      const currentRoute = navigationState.routes[navigationState.index].name;
      if (futureDone) {
        if (currentRoute === "MainTabs") {
          Alert.alert(
            "Exit App",
            "Do you want to exit the app or go to the dashboard?",
            [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel",
              },
              {
                text: "Go to Dashboard",
                onPress: () => navigation.navigate("DashboardTabs"),
              },
              {
                text: "Exit",
                onPress: () => BackHandler.exitApp(),
              },
            ],
            { cancelable: true }
          );
          return true;
        } else {
          navigation.navigate("MainTabs");
          return true;
        }
      } else {
        Alert.alert(
          "Exit App",
          "Do you want to exit the app?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "Exit",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: true }
        );
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigationState, futureDone]);

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
