import React from "react";

import { Image, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

// prettier-ignore
import { p, m, flex, align, justify, place, text, decoration, w, h, size, fx, shadow, aspect, object_fit, display, direction, pos, z, overflow, bdr } from "nativeflowcss";

import cornerBlur from "../assets/bg/landing-blur.png";
import logoTransp from "../assets/icons/logo-transparent.png";
import Insets from "../components/Insets";

export default function SplashScreen({  }) {
  const router = useRouter();

  const handleConnection = async () => {
    try {
      await AsyncStorage.setItem("walletConnected", "true");
    } catch (error) {
      console.error("Error updating wallet connection status:", error);
    }
  };

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
        <View style={[]}>
          <View
            style={[
              bdr.w_2,
              bdr.color_("#292D2D"),
              m.mt_32,
              bdr.rounded_full,
              flex.grow_0,
              w.w_80,
              h.h_10,
              justify.center,
              align.self_center,
            ]}
          >
            <Text
              style={[
                text.center,
                text.color_("white"),
                text.fs_base,
                align.items_center,
              ]}
            >
              Revolutionizing <Text style={[text.color_("#A3E635")]}>Web3</Text>{" "}
              Investments
            </Text>
          </View>
          <View style={[align.self_center, p.p_8]}>
            <Text
              style={[
                text.start,
                text.color_("#BEC2C1"),
                text.fs_5xl,
                text.fw_bold,
              ]}
            >
              <Text style={[text.color_("#99D633")]}>S</Text>croll,
            </Text>
            <Text
              style={[
                text.start,
                text.color_("#BEC2C1"),
                text.fs_5xl,
                text.fw_bold,
              ]}
            >
              <Text style={[text.color_("#99D633")]}>I</Text>nvest,
            </Text>
            <Text
              style={[
                text.start,
                text.color_("#BEC2C1"),
                text.fs_5xl,
                text.fw_bold,
              ]}
            >
              <Text style={[text.color_("#99D633")]}>C</Text>reate,
            </Text>
            <Text
              style={[
                text.start,
                text.color_("#BEC2C1"),
                text.fs_5xl,
                text.fw_bold,
              ]}
            >
              <Text style={[text.color_("#99D633")]}>K</Text>rypto,
            </Text>
          </View>
          <View style={[align.self_center]}>
            <Text
              style={[
                text.color_("#535558"),
                w.w_(360),
                text.fs_base,
                text.center,
              ]}
            >
              You can Create SIPs called{" "}
              <Text style={[text.color_("white")]}>"Crates"</Text> and get
              acknowledged with a Social angle
            </Text>
          </View>
          <View style={[align.self_center]}>
            <TouchableOpacity onPress={() => router.push("KnowMore")}>
              <LinearGradient
                colors={["#99D633", "#04080F"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1.3 }}
                style={[
                  align.self_center,
                  m.mt_16,
                  p.px_10,
                  p.py_2,
                  bdr.rounded_full,
                ]}
              >
                <Text style={[text.fs_2xl, text.fw_black]}>Know More</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Image
        style={[z.index_10, pos.absolute, pos.t_(Constants.statusBarHeight), pos.l_0]}
        source={cornerBlur}
      />
    </LinearGradient>
  );
}
