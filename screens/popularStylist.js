import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Container from "../components/container";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { CustomerRating } from "../components/Rating.tsx";
import {stylistFn} from '../firebaseServices'
import Loader from "./Loader";

function PopularStylist({ route, navigation }) {
  console.log("PopularStylist");
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [selectedId, setSelectedId] = useState(null);

  const [clickId, setClickId] = React.useState(0);
  const [clicked, setClicked] = useState(false);
  const [getStylist, setGetStylist] = useState([]);

  useEffect(() => {
    stylistFn().then((res) => {
      setGetStylist(res);
    }
    );
    console.log(route.params)
  }, []);
  const onPressed = (index, item) => {
    setClicked(true);
    setSelectedId(item);
    setClickId(index);
  };
  const handleStylist = () => {
    if (route.params) {
      let data = route.params.data;
      data.stylist = selectedId;
    
      navigation.navigate("schedule", { data: data });
    } else {
      navigation.navigate("services", {data:{ stylist: selectedId}});
      
    }
  };
  return (
    <Container>
      <Header text="Popular Stylist"></Header>
      <Searchbar
        style={styles.searchBox}
        color="#FF7E00"
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
     {
      getStylist.length?
      <ScrollView showsVerticalScrollIndicator={false}>
      {getStylist?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onPressed(index, item)}
            style={[clickId == index ? styles.card : styles.card2]}
          >
            <Image
              style={{ height: 80, width: 80, borderRadius: 10 }}
              source={{ uri: item.imageUrl }}
            ></Image>
            <View
              style={{
                padding: 10,
                width: "70%",
              }}
            >
              <Text
                style={{ fontSize: 18, color: "white", fontWeight: "900" }}
              >
                {item.name}
              </Text>
              <Text
                style={{ fontSize: 10, color: "white", fontWeight: "300" }}
              >
                {item.specialization}
              </Text>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("review")}
                >
                  <Text
                    style={{
                      borderWidth: 1,
                      borderColor: "#FF7E00",
                      padding: 3,
                      color: "#FF7E00",
                      borderRadius: 7,
                      fontSize: 10,
                      marginVertical: 5,
                    }}
                  >
                    Review
                  </Text>
                </TouchableOpacity>

                <CustomerRating ratings={4} stylish={true} />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>:<Loader></Loader>
     }
      {clicked ? (
        <TouchableOpacity
          style={styles.toggleService}
          onPress={() => handleStylist()}
        >
          <Text style={{ fontSize: 19, color: "#FF7E00" }}>Schedule Day</Text>
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
  searchBox: {
    height: 40,
    borderRadius: 50,
    color: "#FF7E00",
    marginVertical: 20,
  },
  onPress: {},
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
    padding: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,

    borderRightWidth: 10,
    marginVertical: 5,
  },
  card: {
    padding: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#FF7E00",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,

    borderRightWidth: 10,
    marginVertical: 5,
  },
});

export default PopularStylist;
