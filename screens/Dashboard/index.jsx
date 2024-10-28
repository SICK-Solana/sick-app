import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import MaskedView from "@react-native-masked-view/masked-view";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

// prettier-ignore
import { p, m, flex, align, justify, place, text, decoration, w, h, size, fx, shadow, aspect, object_fit, display, direction, pos, z, overflow, bdr } from "nativeflowcss";

export default function Dashboard({ navigate }) {
  const [userWalletValue, setUserWalletValue] = useState(0.0);
  const [savedSort, setSavedSort] = useState("Newest");

  const sortingOptions = ["Newest", "Most Upvotes"];

  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": require("../../assets/fonts/SpaceMono-Regular.ttf"),
    "SpaceMono-Bold": require("../../assets/fonts/SpaceMono-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <MaskedView
        maskElement={
          <Text style={[text.font_family("SpaceMono-Regular"), text.fs_2xl]}>
            hello_User (&gt;_•)
          </Text>
        }
        style={[m.my_10, align.self_center]}
      >
        <LinearGradient
          colors={["#ffffff", "#494949"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text
            style={[
              fx.opacity_0,
              text.font_family("SpaceMono-Regular"),
              text.fs_2xl,
            ]}
          >
            hello_User (&gt;_•)
          </Text>
        </LinearGradient>
      </MaskedView>
      <LinearGradient
        colors={["#111817", "#070C14"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
        style={[bdr.w_1, bdr.color_("#223115"), bdr.rounded_xl]}
      >
        <View style={[p.p_4, bdr.b_w_1, bdr.color_("#223115")]}>
          <Text style={[text.color_("#238636"), text.fs_lg]}>▲ 🚀</Text>
          <MaskedView
            maskElement={
              <Text style={[text.font_family("SpaceMono-Bold"), text.fs_4xl]}>$sol {userWalletValue.toFixed(2)}</Text>
            }
            style={[m.mt_4]}
          >
            <LinearGradient
              colors={["#A2E01D", "#494949"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Text style={[fx.opacity_0, text.font_family("SpaceMono-Bold"), text.fs_4xl]}>
                $sol {userWalletValue.toFixed(2)}
              </Text>
            </LinearGradient>
          </MaskedView>
          <Text style={[text.color_("#7C838D"), text.font_family("SpaceMono-Regular"), text.fs_lg]}>current_value</Text>
        </View>
        <View style={[p.py_5, bdr.b_w_1, bdr.color_("#223115")]}>
          <Text style={[text.color_("#7C838D"), text.font_family("SpaceMono-Regular"), text.center]}>SOL_Balance: <Text style={[text.color_("#ACF11A")]}>{userWalletValue.toFixed(2)} SOL</Text></Text>
        </View>
        <View style={[p.py_6, justify.end, align.items_end, p.pr_4]}>
          <TouchableOpacity
            onPress={() => navigate("CrateCreator")}
            style={[flex.row, align.items_center]}
          >
            <Text style={[text.color_("#238636"), text.font_family("SpaceMono-Regular")]}>create_crate</Text>
            <Feather name="arrow-up-right" size={18} color="#238636" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={[m.mt_8]}>
        <Text style={[text.color_("#9CA3AF"), text.font_family("SpaceMono-Regular")]}>// crates</Text>
        <Text style={[text.color_("#B6FF1B"), text.fs_xl, text.font_family("SpaceMono-Regular")]}>saved</Text>
        <View style={[flex.row, justify.start, flex.gap_2, m.mt_4]}>
          {sortingOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                p.p_(10), p.px_3, bdr.rounded_(100),
                savedSort === option ? fx.bg_color_("#B6FF1B") : fx.bg_color_("#1C2128"),
              ]}
              onPress={() => setSavedSort(option)}
            >
              <Text
                style={[
                  text.font_family("SpaceMono-Regular"), text.fs_sm,
                  savedSort === option ? text.color_("black") : text.color_("white"),
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={[flex.row, justify.start, flex.gap_2, m.mt_4]}>
          <TouchableOpacity
            key={"Most Downvotes"}
            style={[
              p.p_(10), p.px_3, bdr.rounded_(100),
              savedSort === "Most Downvotes" ? fx.bg_color_("#B6FF1B") : fx.bg_color_("#1C2128"),
            ]}
            onPress={() => setSavedSort("Most Downvotes")}
          >
            <Text
              style={[
                text.font_family("SpaceMono-Regular"), text.fs_sm,
                savedSort === "Most Downvotes" ? text.color_("black") : text.color_("white"),
              ]}
            >
              {"Most Downvotes"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <MaskedView
          maskElement={
            <Text style={[text.font_family("SpaceMono-Regular"), text.fs_2xl]}>
              No saved crates yet :(
            </Text>
          }
          style={[m.mt_6, align.self_start]}
        >
          <LinearGradient
            colors={["#ffffff", "#494949"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Text
              style={[
                fx.opacity_0,
                text.font_family("SpaceMono-Regular"),
                text.fs_2xl,
              ]}
            >
              No saved crates yet :(
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>
    </ScrollView>
  );
}
