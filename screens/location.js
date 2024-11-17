import React, { useState, useEffect } from "react";
import Container from "../components/container";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { List } from "react-native-paper";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { getLocations } from "../firebaseServices";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

function Location({ navigation }) {
  const [Address, setAddress] = useState("Select Address");
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const address = [
    {
      id: 1,
      name: "Home",
      address: "1234 Main Street, New York, NY 10001",
    },
    {
      id: 2,
      name: "Work",
      address: "1234 Main Street, New York, NY 10001",
    },
    {
      id: 3,
      name: "Other",
      address: "1234 Main Street, New York, NY 10001",
    },
    {
      id: 4,
      name: "Other",
      address: "1234 Main Street, New York, NY 10001",
    },
  ];
  const handlePress = (item) => {
    console.log('item ⚡⚡⚡');
console.log(item)
    setAddress(item);
  };
  const [itemID, setItemID] = React.useState(-1);
  const [newAddress, setNewAddress] = useState("");
  const [locations, setLocations] = useState([]);
  const onPressed = (index, item) => {
    console.log("Pressed⚡⚡⚡" + item);
    setNewAddress(item);
    setItemID(index);
    console.log("Pressed⚡⚡⚡" + itemID);
    console.log("Pressed⚡⚡⚡" + newAddress);
    
  };
  const [pin, setPin] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const getLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "locations"));
      querySnapshot.forEach((doc) => {
        setLocations(doc.data().data);
        return doc.data().data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLocationClick = () => {
  
    console.log("Address is", newAddress);
  }
  useEffect(() => {
    getLocations();
  }, []);
  console.log(
    "🚀 ~ file: location.js ~ line 90 ~ Location ~ locations",
    locations
  );

  return (
    <Container>
      <Header text="location"></Header>
      <Searchbar
        style={styles.searchBox}
        color="#FF7E00"
        placeholder="Search"
        value={""}
        onChange={() => navigation.navigate("search")}
      />
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            backgroundColor: "red",
            height: 230,
            width: "100%",
            borderRadius: 10,
          }}
        >
          <MapView
            style={styles.map}
            //specify our coordinates.
            initialRegion={{
              latitude: 19.907429,
              longitude: 83.164154,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
            />

            <Marker
              coordinate={{
                latitude: 19.907429,
                longitude: 83.164154,
              }}
              pinColor="#FF7E00"
              draggable={true}
              onDragStart={(e) => {
                console.log("Drag start", e.nativeEvent.coordinates);
              }}
              onDragEnd={(e) => {
                setPin({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                });
              }}
            >
              <Callout>
                <Text>My Location</Text>
              </Callout>
            </Marker>
          </MapView>
        </View>
        <View style={{ marginVertical: 20 }}>
          <List.Accordion
            style={styles.select}
            title={newAddress ? newAddress : "Select Address"}
            id="2"
          >
            {locations.map((item, index) => {
              return (
                <List.Item
                key={item}
                  onPress={() => onPressed(index, item)}
                  style={styles.listItem}
                  title={item.name}
                />
              );
            })}
          </List.Accordion>
        </View>
      </View>
      {itemID !== -1 ? (
        <TouchableOpacity
          style={styles.toggleService}
          onPress={() => handleLocationClick()}
        >
          <Text style={{ fontSize: 19, color: "#FF7E00" }}>Check Out</Text>
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
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  select: {},
  searchBox: {
    height: 40,
    borderRadius: 50,
    color: "#FF7E00",
    marginVertical: 20,
  },
  listItem: { backgroundColor: "#fff" },
  listItemActive: { backgroundColor: "#fff99" },
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
});
export default Location;
