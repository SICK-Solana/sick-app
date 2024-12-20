import React, { useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import dummyPfp from "../../assets/icons/dummy-pfp.png";
import logoTransp from "../../assets/icons/logo-transparent.png";
import Insets from "../../components/Insets";
import CrateCreator from "./CrateCrator";
import CrateView from "./CrateView";
import Dashboard from "./Dashboard";
import ExploreCrate from "./ExploreCrate";
import Sai from "./Sai";
//prettier-ignore
import { p, m, flex, align, justify, place, text, decoration, w, h, size, fx, shadow, aspect, object_fit, display, direction, pos, z, overflow, bdr } from "nativeflowcss";

export default function AppNavigator() {
  const [currentComponent, setCurrentComponent] = useState("CrateView");
  const [currentCrateView, setCurrentCrateView] = useState({
    id: "cm2wzq8i800003afs6o6cc4ca",
    name: "Gumshoe HighBets",
    image: "https://arweave.net/A1etRNMKxhlNGTf-gNBtJ75QJJ4NJtbKh_UXQTlLXzI",
    createdAt: "2024-10-31T07:35:01.853Z",
    updatedAt: "2024-11-01T09:48:41.496Z",
    totalCost: 0,
    creatorId: "cm1numkyt0000c6am3dpa2ne1",
    upvotes: 1,
    downvotes: 0,
    tokens: [
      {
        id: "cm2wzq9um00023afsio57v60u",
        symbol: "POPCAT",
        name: "Popcat",
        quantity: 30,
        coingeckoId: "popcat",
        createdAt: "2024-10-31T07:35:04.799Z",
        crateId: "cm2wzq8i800003afs6o6cc4ca",
      },
      {
        id: "cm2wzq9um00043afssg1lrl49",
        symbol: "$WIF",
        name: "dogwifhat",
        quantity: 25,
        coingeckoId: "dogwifcoin",
        createdAt: "2024-10-31T07:35:04.799Z",
        crateId: "cm2wzq8i800003afs6o6cc4ca",
      },
      {
        id: "cm2wzqatj00083afsro9xzurm",
        symbol: "WEN",
        name: "Wen",
        quantity: 15,
        coingeckoId: "wen-4",
        createdAt: "2024-10-31T07:35:04.799Z",
        crateId: "cm2wzq8i800003afs6o6cc4ca",
      },
      {
        id: "cm2wzqata00063afsep93fnmh",
        symbol: "FWOG",
        name: "FWOG",
        quantity: 30,
        coingeckoId: "fwog",
        createdAt: "2024-10-31T07:35:04.799Z",
        crateId: "cm2wzq8i800003afs6o6cc4ca",
      },
    ],
    creator: {
      id: "cm1numkyt0000c6am3dpa2ne1",
      name: "Rishabh",
      email: "pandeyrishabh966@gmail.com",
      username: "rizzabh",
      walletAddress: "CZXk43VhMhFNsVcPRcA1cH9QRQMqQ49yqmsAEio4n3NL",
      image: "",
      emailVerified: false,
      createdAt: "2024-09-29T17:22:36.582Z",
      updatedAt: "2024-09-29T17:22:36.582Z",
    },
  });

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
            currentComponent === "ExploreCrate" || "CrateView" ?
              styles.activeIcon
            : styles.inactiveIcon
          }
        />
      ),
      name: (
        <Text
          style={
            currentComponent === "ExploreCrate" || "CrateView" ?
              styles.activeText
            : styles.inactiveText
          }
        >
          {currentComponent === "ExploreCrate" || "CrateView" ? "/" : ""}
          explore-crate
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
        return <Dashboard navigate={setCurrentComponent} />;
      case "ExploreCrate":
        return (
          <ExploreCrate
            navigate={setCurrentComponent}
            setCurrentCrateView={setCurrentCrateView}
          />
        );
      case "Sai":
        return <Sai />;
      case "CrateCreator":
        return <CrateCreator navigate={setCurrentComponent} />;
      case "CrateView":
        return (
          <CrateView navigate={setCurrentComponent} crate={currentCrateView} />
        );
      default:
        return <Text>Unknown Component</Text>;
    }
  };

  const componentToRender = renderComponent(currentComponent);

  return (
    <LinearGradient
      colors={["#0A1019", "#02050A"]}
      style={[h.h_("100%"), w.w_("100%")]}
    >
      <Insets />
      <View style={[flex.row, justify.between, p.p_4, align.items_center]}>
        <Image source={logoTransp} style={[w.w_10, h.h_10]} />
        <View style={[flex.row, align.items_center, flex.gap_4]}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="logout" size={30} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="wallet-outline" size={30} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentComponent("Dashboard")}>
            <Image
              source={dummyPfp}
              style={[w.w_10, h.h_10, bdr.rounded_full]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[p.px_4]}>{componentToRender}</View>
      <View
        style={[
          pos.absolute,
          pos.b_0,
          pos.r_0,
          pos.l_0,
          fx.bg_color_("hsla(0, 0%, 0%, 0.6)"),
          bdr.t_w_1,
          bdr.l_w_1,
          bdr.r_w_1,
          m.mx_(-1),
          { blurRadius: 90 },
          {
            borderTopColor: "#4A4C4F",
            borderRightColor: "#4A4C4F",
            borderLeftColor: "#4A4C4F",
          },
          bdr.rounded_t_(40),
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
