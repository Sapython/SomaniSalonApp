import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Container from "../components/container";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";

const places = [
  {
    id: 1,
    name: "Somani Outlets",
  },
  {
    id: 2,
    name: "Your Address",
  },
];
type MyAppointmentProps = {
  navigation: any;
};

const SelectPlace = (props: MyAppointmentProps) => {
  const [selectedId, setSelectedId] = useState(null);

  const [clickId, setClickId] = useState(-1);
  const [clicked, setClicked] = useState(false);
  const onPressed = (index) => {
    setClicked(true);
    setSelectedId(index);
    setClickId(index);
  };
  const next = () => {
    console.log(selectedId);
    if (clickId == 0) {
      props.navigation.navigate("location");
    }
    if (clickId == 1) {
      props.navigation.navigate("schedule");
    }
  };
  return (
    <Container>
      <Header text="Select Place" />

      <Text style={styles.text}>Service Type</Text>
      <View style={styles.box}>
        {places.map((place, index) => {
          return (
            <TouchableOpacity
              onPress={() => onPressed(index)}
              style={[clickId == index ? styles.card : styles.card2]}
            >
              <Text style={[clickId == index ? styles.text1 : styles.text2]}>
                {place.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {clicked ? (
        <TouchableOpacity style={styles.toggleService} onPress={() => next()}>
          <Text style={{ fontSize: 19, color: "#FF7E00" }}>Choose Service</Text>
          <AntDesign
            style={{ fontSize: 18, color: "#FF7E00", marginLeft: 15 }}
            name="right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ) : (
        ""
      )}
    </Container>
  );
};

export default SelectPlace;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
  card: {
    width: "70%",
    height: 150,
    borderRadius: 10,
    marginVertical: 50,
    borderWidth: 1,
    borderColor: "#FF7E00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleService: {
    marginHorizontal: 5,
    flexDirection: "row",
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF7E00",
    borderRadius: 10,
  },
  card2: {
    width: "70%",
    height: 150,
    borderRadius: 10,
    marginVertical: 50,
    borderWidth: 1,
    borderColor: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    fontSize: 25,
    color: "#FF7E00",
  },
  text2: {
    fontSize: 25,
    color: "#fff",
  },
  box: {
    display: "flex",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
  },
});
