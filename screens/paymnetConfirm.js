import React from "react";
import Container from "../components/container";
import Header from "../components/Header";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { AntDesign } from "@expo/vector-icons";
function PaymentConfirm({ navigation     }) {
  return (
    <View
      style={{
        backgroundColor: "#393838",
        width: "100%",
        height: "100%",
        paddingTop: 50,
      }}
    >
        <View style={{
        paddingHorizontal:20}}>

      <Header text="Payment" ></Header>
        </View>

      <LinearGradient colors={["#313131", "#121010"]} style={styles.card}>
        <View style={styles.logo}>
          <MaterialCommunityIcons
            name="calendar-multiple-check"
            size={30}
            color="#FFF"
          />
        </View>
        <Text style={styles.text1}>YOUR BOOKING IS {"\n"} CONFIRMED</Text>
        <Text style={styles.text2}>Your Appointment is On </Text>
        <Text style={styles.text2}>
          22 November 2022 {"\n"} 9:00 AM {"\n"}at{"\n"}Madhusudhan Marg
        </Text>
        <Text style={styles.text2}>Booking Alert is Turned On</Text>
        <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>
          Go To Alert To Change Settings
        </Text>

        <TouchableOpacity
          style={styles.toggleService}
          onPress={() => navigation.navigate("home")}
        >
          <AntDesign
            style={{ fontSize: 18, color: "#FF7E00", marginLeft: 15 }}
            name="left"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 19, color: "#FF7E00" }}>
            Go Back To Bookings
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 90,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    width: "100%",
    borderRadius: 30,
  },
  logo: {
    backgroundColor: "#FF7E00",

    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  text1: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 30,
  },
  text2: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 40,
  },
  text3: {
    color: "white",
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 40,
  },
  toggleService: {
    marginVertical:50,
    flexDirection: "row",
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF7E00",
    borderRadius: 10,
  },
});
export default PaymentConfirm;
