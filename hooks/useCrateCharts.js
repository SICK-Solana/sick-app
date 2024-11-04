import { useEffect, useState } from "react";

const useCrateCharts = (crates) => {
  const [chartsData, setChartsData] = useState({});
  const [weightedPriceChanges, setWeightedPriceChanges] = useState({});

  useEffect(() => {
    const fetchBatchPriceData = async () => {
      if (!crates || crates.length === 0) {
        return;
      }

      try {
        const allCoingeckoIds = new Set(
          crates.flatMap((crate) =>
            crate.tokens.map((token) => token.coingeckoId)
          )
        );
        const ids = Array.from(allCoingeckoIds).join(",");
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=${allCoingeckoIds.size}&page=1&sparkline=true&price_change_percentage=24h`
        );
        const data = await response.json();

        const processedData = {};
        const processedWeightedPriceChanges = {};

        crates.forEach((crate) => {
          const { chartData, weightedPriceChange } = processChartData(
            data,
            crate.tokens
          );
          processedData[crate.id] = chartData;
          processedWeightedPriceChanges[crate.id] = weightedPriceChange;
        });

        setChartsData(processedData);
        setWeightedPriceChanges(processedWeightedPriceChanges);
      } catch (err) {
        console.error("Error fetching price data:", err);
      }
    };

    fetchBatchPriceData();
  }, [crates]);

  const processChartData = (priceData, tokens) => {
    const combinedData = [];
    let totalWeightedPriceChange = 0;
    let totalWeight = 0;

    const dataPoints = priceData[0]?.sparkline_in_7d.price.length || 0;

    for (let i = 0; i < dataPoints; i++) {
      let combinedValue = 0;
      tokens.forEach((token) => {
        const coinData = priceData.find((p) => p.id === token.coingeckoId);
        if (coinData) {
          combinedValue +=
            (coinData.sparkline_in_7d.price[i] * token.quantity) / 100;
        }
      });

      combinedData.push({
        timestamp: Date.now() - (dataPoints - i) * 3600000,
        value: combinedValue,
      });
    }

    tokens.forEach((token) => {
      const coinData = priceData.find((p) => p.id === token.coingeckoId);
      if (coinData) {
        totalWeightedPriceChange +=
          coinData.price_change_percentage_24h * (token.quantity / 100);
        totalWeight += token.quantity / 100;
      }
    });

    const weightedPriceChange =
      totalWeight > 0 ? totalWeightedPriceChange / totalWeight : 0;

    return { chartData: combinedData, weightedPriceChange };
  };

  return { chartsData, weightedPriceChanges };
};

export default useCrateCharts;
