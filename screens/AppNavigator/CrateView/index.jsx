import React, { useEffect, useState } from "react";

import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Loader from "../../../components/Loader";

import useCrateCharts from "../../../hooks/useCrateCharts";
// prettier-ignore
import { p, m, flex, align, justify, place, text, decoration, w, h, size, fx, shadow, aspect, object_fit, display, direction, pos, z, overflow, bdr } from "nativeflowcss";

export default function CrateView({ navigate, crate }) {
//   const [crates, setCrates] = useState(null);
  const [loading, setLoading] = useState(true);
  const { chartsData, weightedPriceChanges } = useCrateCharts(crates);

//   useEffect(() => {
//     async function fetchCrate() {
//       try {
//         const response = await fetch("https://sickb.vercel.app/api/crates");
//         const data = await response.json();
//         setCrates(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching crate:", error);
//       }
//     }

//     fetchCrate();
//   }, []);

  return (
    <ScrollView>
      <Text style={[p.pt_36, text.color_("white")]}>{crate.name}</Text>
    </ScrollView>
  );
}
