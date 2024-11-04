import React, { useEffect, useState } from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import CrateCard from "../../components/CrateCard";
import Loader from "../../components/Loader";
import useCrateCharts from "../../hooks/useCrateCharts";
import { sortCrates } from "../../utils/helper";
// prettier-ignore
import { p, m, flex, align, justify, place, text, decoration, w, h, size, fx, shadow, aspect, object_fit, display, direction, pos, z, overflow, bdr } from "nativeflowcss";

export default function ExploreCrate({ navigate, setCurrentCrateView }) {
  const [sort, setSort] = useState("Newest");
  const [crates, setCrates] = useState(null);
  const [loading, setLoading] = useState(true);
  const { chartsData, weightedPriceChanges } = useCrateCharts(crates);

  const sortingOptions = ["Newest", "Most Upvotes", "Most Downvotes"];

  useEffect(() => {
    async function fetchCrate() {
      try {
        const response = await fetch("https://sickb.vercel.app/api/crates");
        const data = await response.json();
        const sortedCrates = sortCrates(data, sort);
        setCrates(sortedCrates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crate:", error);
      }
    }

    fetchCrate();
  }, []);

  useEffect(() => {
    const sortedCrates = sortCrates(crates, sort);
    setCrates(sortedCrates);
  }, [sort]);

  function handleCrateClick(crate) {
    setCurrentCrateView(crate);
    navigate("CrateView");
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
                sort === option ?
                  fx.bg_color_("#B6FF1B")
                : fx.bg_color_("#1C2128"),
              ]}
              onPress={() => setSort(option)}
            >
              <Text
                style={[
                  text.fw_semibold,
                  sort === option ? text.color_("black") : text.color_("white"),
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={[p.py_6, flex.gap_6]}>
        {loading ?
          <Loader />
        : crates.map((crate) => (
            <TouchableOpacity
              key={crate.id}
              onPress={() => handleCrateClick(crate)}
            >
              <CrateCard
                crate={crate}
                weightedPriceChange={weightedPriceChanges[crate.id] || 0}
              />
            </TouchableOpacity>
          ))
        }
      </View>
      <View style={[h.h_52]}></View>
    </ScrollView>
  );
}
