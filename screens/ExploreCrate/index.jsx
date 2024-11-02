import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFonts } from "expo-font";

import CrateCard from "../../components/CrateCard";
import useCrateCharts from "../../hooks/useCrateCharts";
// prettier-ignore
import { p, m, flex, align, justify, place, text, decoration, w, h, size, fx, shadow, aspect, object_fit, display, direction, pos, z, overflow, bdr } from "nativeflowcss";

export default function ExploreCrate({ navigate }) {
  const [savedSort, setSavedSort] = useState("Newest");
  const [crates, setCrates] = useState(null);
  const { chartsData, weightedPriceChanges } = useCrateCharts(crates);

  const sortingOptions = ["Newest", "Most Upvotes", "Most Downvotes"];

  useEffect(() => {
    const fetchCrate = async () => {
      try {
        const response = await fetch("https://sickb.vercel.app/api/crates");
        const data = await response.json();
        setCrates(data);
      } catch (error) {
        console.error("Error fetching crate:", error);
      }
    };

    fetchCrate();
  }, []);

  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": require("../../assets/fonts/SpaceMono-Regular.ttf"),
    "SpaceMono-Bold": require("../../assets/fonts/SpaceMono-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <Text style={[text.fs_4xl, text.color_("white"), m.mt_6]}>
        explore<Text style={[text.color_("#B6FF1B")]}>_</Text>Crates
      </Text>
      <View>
        <View style={[flex.row, justify.start, flex.gap_2, m.mt_4]}>
          {sortingOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                p.p_(10),
                p.px_4,
                bdr.rounded_(100),
                savedSort === option ?
                  fx.bg_color_("#B6FF1B")
                : fx.bg_color_("#1C2128"),
              ]}
              onPress={() => setSavedSort(option)}
            >
              <Text
                style={[
                  text.fw_semibold,
                  savedSort === option ?
                    text.color_("black")
                  : text.color_("white"),
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <CrateCard
        crate={{
          id: "cm1v148wl000hxgi5tl6qzu00",
          name: "NewBie friendly 🔥✨",
          image:
            "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
          createdAt: "2024-10-04T17:58:41.497Z",
          updatedAt: "2024-10-14T07:14:25.152Z",
          totalCost: 0,
          creatorId: "cm1jl7v9x0001n66m6o9n4l3j",
          upvotes: 1,
          downvotes: 0,
          tokens: [
            {
              id: "cm1v14a7n000jxgi5jkkqy4bl",
              symbol: "Bonk",
              name: "Bonk",
              quantity: 30,
              coingeckoId: "bonk",
              createdAt: "2024-10-04T17:58:43.380Z",
              crateId: "cm1v148wl000hxgi5tl6qzu00",
            },
            {
              id: "cm1v14axt000lxgi5p71hir7y",
              symbol: "$WIF",
              name: "dogwifhat",
              quantity: 5,
              coingeckoId: "dogwifcoin",
              createdAt: "2024-10-04T17:58:43.503Z",
              crateId: "cm1v148wl000hxgi5tl6qzu00",
            },
            {
              id: "cm1v14b6x000pxgi5ihtc2e98",
              symbol: "MEW",
              name: "cat in a dogs world",
              quantity: 20,
              coingeckoId: "cat-in-a-dogs-world",
              createdAt: "2024-10-04T17:58:43.435Z",
              crateId: "cm1v148wl000hxgi5tl6qzu00",
            },
            {
              id: "cm1v14b6q000nxgi5k5t3wizw",
              symbol: "SOL",
              name: "Wrapped SOL",
              quantity: 30,
              coingeckoId: "wrapped-solana",
              createdAt: "2024-10-04T17:58:43.380Z",
              crateId: "cm1v148wl000hxgi5tl6qzu00",
            },
            {
              id: "cm1v14b6y000rxgi5mqd5hq2e",
              symbol: "W",
              name: "Wormhole Token",
              quantity: 5,
              coingeckoId: "wormhole",
              createdAt: "2024-10-04T17:58:43.440Z",
              crateId: "cm1v148wl000hxgi5tl6qzu00",
            },
            {
              id: "cm1v14b7i000txgi5lwtga61f",
              symbol: "POPCAT",
              name: "Popcat",
              quantity: 10,
              coingeckoId: "popcat",
              createdAt: "2024-10-04T17:58:43.384Z",
              crateId: "cm1v148wl000hxgi5tl6qzu00",
            },
          ],
          creator: {
            id: "cm1jl7v9x0001n66m6o9n4l3j",
            name: "1st user with correct wallet",
            email: "correctwallet@gmail.com",
            username: "correctwallet69",
            walletAddress: "8ooqPWupp254pH1QP6toYJq2FkNE16ZKzmFUNUvTfmGG",
            image: "https://rahulol.me/pfp.webp",
            emailVerified: false,
            createdAt: "2024-09-26T17:48:08.662Z",
            updatedAt: "2024-09-26T17:48:08.662Z",
          },
        }}
        weightedPriceChange={
          weightedPriceChanges["cm1v148wl000hxgi5tl6qzu00"] || 0
        }
      />
    </ScrollView>
  );
}
