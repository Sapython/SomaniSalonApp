import React, { FC, useEffect, useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import LoyaltyCouponCard from "../components/misc/LoyaltyCoupnCard";
import TotalPoints from "../components/misc/LoyaltyCoupnCard";
import RedeemCouponCard from "../components/misc/RedeemCouponCard";

import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/container";
import Header from "../components/Header";

const LoyaltyPoints: FC = () => {
  const [redeem, setRedeem] = useState<boolean>(false);



  return (
    <Container>
      
       <Header text="Loyalty Points"></Header>
        <View style={{ display: "flex", alignItems: "center" }}>
          <TotalPoints />
        </View>
        <View style={styles.btn_container}>
          <Pressable
            onPress={() => setRedeem(false)}
            style={[
              styles.btn_reward,
              !redeem
                ? { backgroundColor: "#FFA500" }
                : { backgroundColor: "white" },
            ]}
          >
            <Text
              style={[
                styles.reward_text,
                redeem ? styles.redeem_text_color : styles.reward_text_color,
              ]}
            >
              Reward Wallet
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.btn_redeem,
              redeem
                ? { backgroundColor: "#FFA500" }
                : { backgroundColor: "white" },
            ]}
            onPress={() => setRedeem(true)}
          >
            <Text
              style={[
                styles.redeem_text,
                redeem ? styles.reward_text_color : styles.redeem_text_color,
              ]}
            >
              Redeem
            </Text>
          </Pressable>
        </View>
        <ScrollView>
          {!redeem ? (
            <View>
              <LoyaltyCouponCard />
              <LoyaltyCouponCard />
              <LoyaltyCouponCard />
              <LoyaltyCouponCard />
              <LoyaltyCouponCard />
            </View>
          ) : (
            <View>
              <RedeemCouponCard />
              <RedeemCouponCard />
              <RedeemCouponCard />
              <RedeemCouponCard />
            </View>
          )}
        </ScrollView>
     
    </Container>
  );
};

export default LoyaltyPoints;

const width_prop = "50%";
const width_container = "100%";
const styles = StyleSheet.create({
  gradient: {
    height: "100%",
    paddingHorizontal: 20,
  },
  arrowIcon: {
    color: "white",
    marginVertical: 4,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  headerText: {
    color: "white",
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
  },
  btn_container: {
    display: "flex",
    marginTop: 26,
    marginBottom: 6,
    flexDirection: "row",

    alignSelf: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 10,
    width: width_container,
  },
  btn_reward: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 4,
    borderRadius: 10,
    paddingVertical: 10,
    width: width_prop,
    textAlign: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  reward_text_color: {
    color: "white",
  },
  reward_text: {
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },

  redeem_text_color: {
    color: "#786F6F",
  },
  redeem_text: {
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
  btn_redeem: {
    paddingHorizontal: 4,
    paddingVertical: 10,
    backgroundColor: "white",
    width: width_prop,
    textAlign: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
  },
});
