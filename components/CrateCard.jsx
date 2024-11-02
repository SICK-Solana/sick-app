import React from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ArrowBigDown, ArrowBigUp, Bookmark } from "lucide-react-native";
import { WebView } from "react-native-webview";

import { truncate } from "../utils/helper";
import tokenData from "../utils/tokens.json";
// prettier-ignore
import { p, m, flex, align, justify, place, text, decoration, w, h, size, fx, shadow, aspect, object_fit, display, direction, pos, z, overflow, bdr } from "nativeflowcss";

export default function CrateCard({ crate, weightedPriceChange }) {
  return (
    <View
      style={[
        fx.bg_color_("#0F161E"),
        p.px_4,
        p.py_3,
        flex.gap_1,
        bdr.rounded_3xl,
        bdr.w_1,
        bdr.color_green_950,
      ]}
    >
      <View style={[flex.row, justify.between]}>
        <Text style={[text.fs_xl, text.fw_semibold, text.color_("white")]}>
          {crate.name}
        </Text>
        <View style={[flex.row, flex.gap_1, align.items_center]}>
          <ArrowBigUp color="rgb(34 197 94)" size={18} />
          <Text style={[text.color_gray_400]}>{crate.upvotes}</Text>
          <ArrowBigDown color="rgb(239 68 68)" size={18} />
          <Text style={[text.color_gray_400, m.mr_1]}>{crate.downvotes}</Text>
          <Bookmark color="rgb(156 163 175)" size={14} />
        </View>
      </View>
      <Text style={[text.color_gray_500]}>
        Created: {new Date(crate.createdAt).toLocaleDateString("en-GB")}
      </Text>
      <WebView
        style={[h.h_36]}
        source={{ uri: `https://sickgraphs.vercel.app/${crate.id}` }}
      />
      <View style={[flex.row, align.items_center, m.mb_1]}>
        {crate.tokens.slice(0, 2).map((token, index) => (
          <View key={index} style={[flex.row, align.items_center, m.mr_1]}>
            <Image
              source={{
                uri: tokenData.find((t) => t.symbol === token.symbol)?.logoURI,
              }}
              style={[size.s_5, bdr.w_1, bdr.color_("#A3E635"), bdr.rounded_xl]}
            />
            <Text style={[text.fs_xs, text.color_("#9CA3AF"), m.ml_1]}>
              {token.quantity}%
            </Text>
          </View>
        ))}
        {crate.tokens.length > 2 && (
          <Text style={[text.fs_xs, text.color_("#9CA3AF")]}>
            +{crate.tokens.length - 2}
          </Text>
        )}
      </View>
      <Text
        style={[
          text.fs_xs,
          text.color_("#b7ff1b98"),
          pos.b_4,
          pos.r_4,
          pos.absolute,
        ]}
      >
        Created by:{" "}
        <Text
          style={[
            decoration.underline,
            text.fw_medium,
            text.fs_sm,
            text.color_("#B6FF1B"),
          ]}
        >
          {truncate(crate.creator.name, 10)}
        </Text>
        <Text
          style={[
            text.fs_xs,
            m.ml_2,
            text.color_(weightedPriceChange >= 0 ? "green" : "red"),
          ]}
        >
          {weightedPriceChange >= 0 ? "▲ " : "▼ "}
          {weightedPriceChange.toFixed(2)}%
        </Text>
      </Text>
    </View>
  );
}
