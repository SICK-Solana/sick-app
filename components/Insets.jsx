import React from "react";

import { View } from "react-native";

import Constants from "expo-constants";
import { fx, h } from "nativeflowcss";

export default function Insets() {
  return (
    <View
      style={[h.h_(Constants.statusBarHeight), fx.bg_color_("#D0DDD8")]}
    ></View>
  );
}
