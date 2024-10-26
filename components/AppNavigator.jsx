import React, { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

import CrateCreator from "../screens/CrateCreator";
import Dashboard from "../screens/Dashboard";
import ExploreCrate from "../screens/ExploreCrate";
import Sai from "../screens/Sai";
import Insets from "./Insets";
//prettier-ignore
import { p, m, flex, align, justify, place, text, decoration, w, h, size, fx, shadow, aspect, object_fit, display, direction, pos, z, overflow, bdr } from "nativeflowcss";

export default function AppNavigator() {
  const [currentComponent, setCurrentComponent] = useState("Dashboard");

  const bottomNavData = [
    {
      path: "Dashboard",
      logo: (
        <MaterialCommunityIcons
          name="view-dashboard-outline"
          size={24}
          style={
            currentComponent === "Dashboard" ?
              styles.activeIcon
            : styles.inactiveIcon
          }
        />
      ),
      name: (
        <Text
          style={
            currentComponent === "Dashboard" ?
              styles.activeText
            : styles.inactiveText
          }
        >
          {currentComponent === "Dashboard" ? "/" : ""}dashboard
        </Text>
      ),
    },
    {
      path: "ExploreCrate",
      logo: (
        <MaterialCommunityIcons
          name="cube-outline"
          size={24}
          style={
            currentComponent === "ExploreCrate" ?
              styles.activeIcon
            : styles.inactiveIcon
          }
        />
      ),
      name: (
        <Text
          style={
            currentComponent === "ExploreCrate" ?
              styles.activeText
            : styles.inactiveText
          }
        >
          {currentComponent === "ExploreCrate" ? "/" : ""}explore-crate
        </Text>
      ),
    },
    {
      path: "Sai",
      logo: (
        <MaterialCommunityIcons
          name="cards-diamond"
          size={24}
          style={
            currentComponent === "Sai" ? styles.activeIcon : styles.inactiveIcon
          }
        />
      ),
      name: (
        <Text
          style={
            currentComponent === "Sai" ? styles.activeText : styles.inactiveText
          }
        >
          {currentComponent === "Sai" ? "/" : ""}s-ai
        </Text>
      ),
    },
    {
      path: "CrateCreator",
      logo: (
        <MaterialIcons
          name="dashboard-customize"
          size={24}
          style={
            currentComponent === "CrateCreator" ?
              styles.activeIcon
            : styles.inactiveIcon
          }
        />
      ),
      name: (
        <Text
          style={
            currentComponent === "CrateCreator" ?
              styles.activeText
            : styles.inactiveText
          }
        >
          {currentComponent === "CrateCreator" ? "/" : ""}crate-creator
        </Text>
      ),
    },
  ];

  const renderComponent = (componentName) => {
    switch (componentName) {
      case "Dashboard":
        return <Dashboard />;
      case "ExploreCrate":
        return <ExploreCrate />;
      case "Sai":
        return <Sai />;
      case "CrateCreator":
        return <CrateCreator />;
      default:
        return <Text>Unknown Component</Text>;
    }
  };

  const componentToRender = renderComponent(currentComponent);

  return (
    <LinearGradient
      colors={["#0A1019", "#02050A"]}
      style={[h.h_("100%"), w.w_("102%")]}
    >
      <Insets />
      {componentToRender}
      <View
        style={[
          pos.absolute,
          pos.b_0,
          pos.r_0,
          pos.l_0,
          { backdropFilter: "blur(10px)" },
          bdr.t_w_1,
          bdr.l_w_1,
          bdr.r_w_1,
          m.ml_(-8),
          { borderTopColor: "#4A4C4F" },
          bdr.rounded_t_3xl,
          z.index_50,
        ]}
      >
        <View
          style={[flex.row, justify.around, align.items_center, h.h_20, p.px_4]}
        >
          {bottomNavData.map((menu, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentComponent(menu.path)}
              style={[align.items_center]}
            >
              {menu.logo}
              {menu.name}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  activeIcon: {
    color: "#B6FF1B",
    fontSize: 24,
  },
  inactiveIcon: {
    color: "#9CA3AF",
    fontSize: 24,
  },
  activeText: {
    color: "#B6FF1B",
    fontSize: 12,
  },
  inactiveText: {
    color: "#9CA3AF",
    fontSize: 12,
  },
});
