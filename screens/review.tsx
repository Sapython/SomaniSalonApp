import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Container from "../components/container";
import Header from "../components/Header";
import { CustomerRating, RatingHeader } from "../components/Rating";
const Review = () => {
  const Customers = [
    {
      id: 1,
      name: "John Doe",
      image: "https://i.pravatar.cc/300",
      rating: 5,
      review:
        "Amazing salon, amazing service with very dsssd ss good attention to detail. Friendly staff who are very knowledgeable and skilled.Highly recommended Hair Styling",
    },
    {
      id: 2,
      name: " Ronald Richards",
      image: "https://i.pravatar.cc/300",
      rating: 2,
      review:
        "Amazing salon, amazing service with very dsssd ss good attention to detail. Friendly staff who are very knowledgeable and skilled.Highly recommended Hair Styling",
    },
    {
      id: 3,
      name: "Savannah Nguyen",
      image: "https://i.pravatar.cc/300",
      rating: 3,
      review:
        "Amazing salon, amazing service with very dsssd ss good attention to detail. Friendly staff who are very knowledgeable and skilled.Highly recommended Hair Styling",
    },
    {
      id: 4,
      name: "John Doe",
      image: "https://i.pravatar.cc/300",
      rating: 5,
      review:
        "Amazing salon, amazing service with very dsssd ss good attention to detail. Friendly staff who are very knowledgeable and skilled.Highly recommended Hair Styling",
    },
    {
      id: 5,
      name: "John Doe",
      image: "https://i.pravatar.cc/300",
      rating: 1,
      review:
        "Amazing salon, amazing service with very dsssd ss good attention to detail. Friendly staff who are very knowledgeable and skilled.Highly recommended Hair Styling",
    },
  ];

  const averageRating = () => {
    let total = 0;
    Customers.map((item) => {
      total += item.rating;
    });
    console.log(total / Customers.length);
    return (total / Customers.length).toFixed(1);
  };
  return (
    <Container>
      <Header text="Customers Review"></Header>
      <RatingHeader ratings={averageRating()} />
      <ScrollView
        style={{ marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {Customers.map((item, key) => {
          return (
            <View style={styles.card}>
              <View style={styles.flexing}>
                <Image
                  style={{ height: 60, width: 60, borderRadius: 10 }}
                  source={{ uri: item.image }}
                ></Image>
                <CustomerRating ratings={item.rating}></CustomerRating>
              </View>
              <Text
                style={{
                  fontSize: 21,
                  color: "white",
                  fontWeight: "900",
                  marginVertical: 10,
                }}
              >
                {" "}
                {item.name}{" "}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "white",
                  fontWeight: "400",
                  width: "100%",
                  lineHeight: 15,
                }}
              >
                {item.review}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default Review;

const styles = StyleSheet.create({
  customerRating: {
    justifyContent: "center",
    flexDirection: "row",
  },
  card: {
    width: "100%",
    height: 210,
    backgroundColor: "#414040",
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
  },
  starImage: {
    marginHorizontal: 4,
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
  flexing: {
    width: "100%",
    marginTop: 5,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
