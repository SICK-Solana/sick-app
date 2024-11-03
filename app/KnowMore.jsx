import React, { useEffect, useRef, useState } from "react";

import { Image, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

// prettier-ignore
import { p, m, flex, align, justify, place, text, decoration, w, h, size, fx, shadow, aspect, object_fit, display, direction, pos, z, overflow, bdr } from "nativeflowcss";

import PagerView from "react-native-pager-view";

import cornerBlur from "../assets/bg/landing-blur.png";
import Card1 from "../assets/cards/know-more-1.png";
import Card2 from "../assets/cards/know-more-2.png";
import Card3 from "../assets/cards/know-more-3.png";
import logoTransp from "../assets/icons/logo-transparent.png";
import Insets from "../components/Insets";

export default function SplashScreen({ }) {
  const router = useRouter();
  const pagerRef = useRef(null);
  const [selectedPage, setSelectedPage] = useState(0);

  const handleConnection = async () => {
    try {
      console.log("connect init")
      await AsyncStorage.setItem("walletConnected", "true");
      await AsyncStorage.setItem("userToken", "true");
      await AsyncStorage.setItem("userId", "true");
      console.log("connect complete")
    } catch (error) {
      console.error("Error updating wallet connection status:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedPage((prevPage) => {
        const nextPage = (prevPage + 1) % 3;
        pagerRef.current.setPage(nextPage);
        return nextPage;
      });
    }, 3000); // Change page every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient
      colors={["#0A1019", "#04080F"]}
      style={[fx.bg_color_("transparent"), flex.f_1]}
    >
      <Insets />
      <View style={[z.index_20]}>
        <View style={[m.mt_10, flex.row, justify.between, m.mx_7]}>
          <View style={[flex.row, flex.gap_4]}>
            <Image
              source={logoTransp}
              style={[w.w_12, h.h_12, fx.tint_("#B6FF1B")]}
            />
            <Text
              style={[
                align.self_center,
                text.fs_4xl,
                text.fw_bold,
                text.color_("white"),
              ]}
            >
              SICK
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={[
                fx.bg_color_("white"),
                bdr.rounded_full,
                w.w_28,
                h.h_11,
                justify.center,
                align.items_center,
              ]}
              onPress={handleConnection}
            >
              <Text style={[text.fs_xl, text.fw_bold]}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[flex.f_1]}>
        <PagerView
          style={[flex.f_1]}
          initialPage={0}
          ref={pagerRef}
          onPageSelected={(e) => setSelectedPage(e.nativeEvent.position)}
        >
          <View style={[flex.f_1, justify.center, align.items_center]} key="1">
            <Image
              source={Card3}
              style={[w.w_("90%"), h.h_("88.4%")]}
              resizeMode="contain"
            />
          </View>
          <View style={[flex.f_1, justify.center, align.items_center]} key="2">
            <Image
              source={Card1}
              style={[w.w_("90%"), h.h_("66.2%")]}
              resizeMode="contain"
            />
          </View>
          <View style={[flex.f_1, justify.center, align.items_center]} key="3">
            <Image
              source={Card2}
              style={[w.w_("90%"), h.h_("54.8%")]}
              resizeMode="contain"
            />
          </View>
        </PagerView>
      </View>
      <View style={[align.self_center, m.mb_24, z.index_30]}>
        <TouchableOpacity
          style={[
            bdr.w_2,
            bdr.color_("#314623"),
            p.px_6,
            p.py_2,
            bdr.rounded_full,
          ]}
          onPress={() => router.push("AppNavigator")}
        >
          <Text style={[text.fs_2xl, text.fw_black, text.color_("#A3E635")]}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        style={[z.index_10, pos.absolute, pos.t_(Constants.statusBarHeight), pos.l_0]}
        source={cornerBlur}
      />
    </LinearGradient>
  );
}
