import React from "react";

import { Button, Text, View } from "react-native";

import { align, flex, justify, text } from "nativeflowcss";

const Hello = ({ navigation }) => {
  return (
    <View style={[flex.f_1, justify.center, align.items_center]}>
      <Text style={[text.fs_lg, text.center]}>Hello, World!</Text>
      <Button
        onPress={() => navigation.navigate("SplashScreen")}
        title="hello"
      ></Button>
    </View>
  );
};

export default Hello;
