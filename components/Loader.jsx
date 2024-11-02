import React from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

import { size, flex, justify, align } from "nativeflowcss";

export default function Loader() {
  const rotateValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[flex.f_1, justify.center, align.items_center]}>
      <Animated.Image
        source={require('../assets/miscellaneous/loader.png')}
        style={[size.s_(180), { transform: [{ rotate }] }]}
      />
    </View>
  );
}