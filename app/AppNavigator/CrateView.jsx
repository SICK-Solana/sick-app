import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import {
  createJupiterApiClient,
  QuoteGetRequest,
  QuoteResponse,
} from "@jup-ag/api";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { WebView } from "react-native-webview";

import Loader from "../../components/Loader";
import useCrateCharts from "../../hooks/useCrateCharts";
import { truncate } from "../../utils/helper";
import tokenData from "../../utils/tokens.json";
// prettier-ignore
import { p, m, flex, align, justify, place, text, decoration, w, h, size, fx, shadow, aspect, object_fit, display, direction, pos, z, overflow, bdr } from "nativeflowcss";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const SOL_MINT = "So11111111111111111111111111111111111111112";

const connection = new Connection(
  "https://mainnet.helius-rpc.com/?api-key=d1ec9af2-889c-4759-88c1-a7ea87b0fc40"
);

const jupiterQuoteApi = createJupiterApiClient();

export async function getQuote(inputMint, outputMint, amount) {
  const params = {
    inputMint: inputMint,
    outputMint: outputMint,
    amount: amount,
    autoSlippage: true,
    autoSlippageCollisionUsdValue: 1000,
    maxAutoSlippageBps: 1000,
    minimizeSlippage: true,
    onlyDirectRoutes: false,
    asLegacyTransaction: false,
  };
  const quote = await jupiterQuoteApi.quoteGet(params);
  if (!quote) {
    throw new Error("unable to quote");
  }
  return quote;
}

export async function getSwapObj(wallet, quote) {
  const swapObj = await jupiterQuoteApi.swapPost({
    swapRequest: {
      quoteResponse: quote,
      userPublicKey: wallet,
      dynamicComputeUnitLimit: true,
      prioritizationFeeLamports: "auto",
    },
  });
  return swapObj;
}

const useSwap = (crateData) => {
  const { publicKey, signAllTransactions, sendTransaction } = useWallet();

  const swap = async (quoteResults) => {
    if (!publicKey || !signAllTransactions || !sendTransaction) {
      console.error("Wallet not connected");
      return;
    }

    try {
      const transactions = [];
      // Create a transaction for swapping tokens
      for (const quoteResult of quoteResults) {
        const swapObj = await getSwapObj(
          publicKey.toString(),
          quoteResult.quote
        );
        const swapTransactionBuf = Buffer.from(
          swapObj.swapTransaction,
          "base64"
        );
        const transaction =
          VersionedTransaction.deserialize(swapTransactionBuf);
        transactions.push(transaction);
      }

      // Create additional transactions for the transfers
      const transferToStaticWallet = new VersionedTransaction(
        new TransactionMessage({
          payerKey: publicKey,
          recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
          instructions: [
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: new PublicKey(
                "SicKRgxa9vRCfMy4QYzKcnJJvDy1ojxJiNu3PRnmBLs"
              ),
              lamports: 1000000, // 1,000,000 lamports
            }),
          ],
        }).compileToV0Message()
      );

      const transferToCreatorWallet = new VersionedTransaction(
        new TransactionMessage({
          payerKey: publicKey,
          recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
          instructions: [
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: new PublicKey(crateData.creator.walletAddress),
              lamports: 1000000,
            }),
          ],
        }).compileToV0Message()
      );

      transactions.push(transferToStaticWallet);
      transactions.push(transferToCreatorWallet);

      // Sign and send all transactions
      const signedTransactions = await signAllTransactions(transactions);

      for (const signedTx of signedTransactions) {
        const signature = await sendTransaction(signedTx, connection);
        console.log("Transaction: https://explorer.solana.com/tx/" + signature);
      }
      return "Swap and transfer completed successfully";
    } catch (error) {
      console.error("Error while swapping", error);
      throw error;
    }
  };
  return { swap };
};

export default function CrateView({ navigate, crate }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [quoteResults, setQuoteResults] = useState(null);
  const [returnAmount] = useState(479);
  const [investmentPeriod, setInvestmentPeriod] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("SOL");
  const [loadingVote, setLoadingVote] = useState(false);

  const { swap } = useSwap(crate);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function handleInputChange(e) {
    setInputAmount(e.target.value);
  }

  const getSwapQuotes = async (tokenAllocations) => {
    try {
      console.log("tokenAllocations", tokenAllocations);

      const inputMint = selectedCurrency === "USDC" ? USDC_MINT : SOL_MINT;
      const inputDecimals = selectedCurrency === "USDC" ? 6 : 9; // USDC has 6 decimals, SOL has 9

      const quotePromises = tokenAllocations.map(async ({ mint, amount }) => {
        try {
          // Convert amount to lamports or USDC atomic units
          const atomicAmount = Math.floor(amount * Math.pow(10, inputDecimals));

          const quote = await getQuote(inputMint, mint, atomicAmount);
          console.log(`Quote for ${mint}:`, quote);
          const token = tokenData.find((t) => t.address === mint);
          return token ? { symbol: token.symbol, quote } : null;
        } catch (error) {
          console.error(`Error getting quote for token ${mint}:`, error);
          return null;
        }
      });

      const results = await Promise.all(quotePromises);
      return results.filter((result) => result !== null);
    } catch (error) {
      console.error("Error fetching swap quotes:", error);
      throw error;
    }
  };

  const handleGetQuotes = async () => {
    if (!crateData || !inputAmount) return;

    setError(null);
    setLoading(true);

    const totalAmount = parseFloat(inputAmount);
    const tokenAllocations = crateData.tokens.map((token) => ({
      mint: tokenData.find((t) => t.symbol === token.symbol)?.address || "",
      amount: (totalAmount * token.quantity) / 100,
    }));

    try {
      const quotes = await getSwapQuotes(tokenAllocations);
      setQuoteResults(quotes);
      console.log(quotes);

      // Immediately proceed to swap after getting quotes
      await onSwap(quotes);
    } catch (err) {
      console.error("Error in getSwapQuotes:", err);
      setError("Failed to fetch swap quotes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onSwap = async (quotes) => {
    if (!quotes || quotes.length === 0) {
      setError("No quotes available. Please get quotes first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await swap(quotes);
      console.log(`Swap successful:`, result);
      alert("purchase successful , find new tokens in your wallet");
      setQuoteResults(null); // Clear quotes after successful swaps
    } catch (error) {
      console.error("Swap failed:", error);
      setError("Swap failed. Please try again.");
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const userId = "cm1ispv1h0001aafmawouos0i";

  const handleUpvote = async () => {
    setLoadingVote(true); // Start loading
    console.log("Upvoting crate:", crate.id, "by user:", userId); // Debug
    try {
      const response = await fetch(
        `https://sickb.vercel.app/api/crates/${crate.id}/upvote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId, // Passing the user ID in the body
          }),
        }
      );
      if (response.ok) {
        console.log("Upvote successful"); // Debug
        setCrateData((prevState) => ({
          ...prevState,
          upvotes: prevState.upvotes + 1,
        }));
      } else {
        throw new Error("Failed to upvote. Status: ${response.status}");
      }
    } catch (error) {
      console.error("Failed to upvote:", error); // Debug
    } finally {
      setLoadingVote(false); // End loading
    }
  };

  const handleDownvote = async () => {
    setLoadingVote(true);
    console.log("Downvoting crate:", crate.id, "by user:", userId); // Debug
    try {
      const response = await fetch(
        `https://sickb.vercel.app/api/crates/${crate.id}/downvote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId, // Passing the user ID in the body
          }),
        }
      );
      if (response.ok) {
        console.log("Downvote successful"); // Debug
        setCrateData((prevState) => ({
          ...prevState,
          downvotes: prevState.downvotes + 1,
        }));
      } else {
        throw new Error(`Failed to downvote. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to downvote:", error); // Debug
    } finally {
      setLoadingVote(false); // End loading
    }
  };

  return (
    <ScrollView>
      <Text style={[text.color_("white")]}>{crate.name}</Text>
      {loading && <Loader />}
      <View style={[loading ? fx.opacity_0 : fx.opacity_10]}>
        <View>
          <TouchableOpacity onPress={() => navigate("ExploreCrate")}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text>{crate.name}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
