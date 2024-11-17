import React, { useEffect, useState } from "react";
import Container from "../components/container";
import Header from "../components/Header";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import {
  FlatList,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { Searchbar } from "react-native-paper";

const timeSlot = [
  {
    id: 1,
    time: "10:00-2:00",
    status: "Available",
  },
  {
    id: 2,
    time: "2:00-4:00",
    status: "Available",
  },
  {
    id: 3,
    time: "4:00-6:00",
    status: "Available",
  },
  {
    id: 4,
    time: "6:00-8:00",
    status: "Available",
  },
];
const places = [
  {
    id: 1,
    place: "home",
  },
  {
    id: 2,
    place: "store",
  },
];
function Schedule({ route, navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedDay, setClickedDay] = useState(0);
  const [clickedDate, setClickedDate] = useState(0);
  const [clickedPlace, setClickedPlace] = useState(0);
  const [dates, setDates] = useState([]);
  let data = route.params.data;
  const handleClicked = (item) => {
    if (item.date) {
      setClickedDay(item.id);

      data.date = item;
    }
    if (item.time) {
      data.time = item;
      setClickedDate(item.id);
    }
    if (item.place) {
      data.place = item;

      setClickedPlace(item.id);
    }
    if (clickedDay && clickedDate && clickedPlace) {
      // navigation.navigate("BookNow");
      console.log("clickedDay", route.data);
    }
  };
  const handleNext = () => {
    if (clickedPlace == 1) {
      navigation.navigate("checkOut",{data:data});
      // console.log("🚀 ~ file: schedule.js ~ line 130 ~ handleNext ~ clickedPlace", clickedPlace);
    }

    if (clickedPlace == 2) {
      navigation.navigate("checkOut",{data:data});
    }
  };
  var [isPress, setIsPress] = useState(false);
  const onChangeSearch = (query) => setSearchQuery(query);
  let touchProps = {
    // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log("HELLO"), // <-- "onPress" is apparently required
  };

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDates = () => {
    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth();

    let currentDate = date.getDate();

    function getDaysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    }

    const currentYear = date.getFullYear();

    // 👇️ Current Month
    const daysInCurrentMonth = getDaysInMonth(currentYear, month);

    let dd1 = [];

    for (let i = currentDate; i <= daysInCurrentMonth; i++, day++) {
     

      if (day > 6) {
        day = 0;
      }
      dd1.push({
        date: i,
        day: days[day],
        id: i,
        status: "Available",
      });
      setDates(dd1);
    }
  };
  useEffect(() => {
    getDates();
  }, []);

  return (
    <Container>
      <Header text="Schedule"></Header>
      <Searchbar
        style={styles.searchBox}
        color="#FF7E00"
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ color: "white", fontSize: 20 }}>Pick Date</Text>
        <View>
          <ScrollView
            horizontal={true}
            style={{
              height: 120,
              borderBottomColor: "grey",
              borderBottomWidth: 1,
            }}
            showsHorizontalScrollIndicator={false}
          >
            {dates.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleClicked(item)}
                  style={[
                    item.id == clickedDay ? styles.btnPress : styles.btnNormal,
                  ]}
                >
                  <View style={styles.card}>
                    <Text style={{ color: "white", fontSize: 18 }}>
                      {item.date}
                    </Text>
                    <Text style={{ color: "white", fontSize: 15 }}>
                      {item.day}
                    </Text>
                    {item.id == clickedDay ? (
                      <FontAwesome name="bell" size={10} color="#FF7E00" />
                    ) : (
                      ""
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* //time Slot */}
        <Text style={{ color: "white", fontSize: 20, marginVertical: 20 }}>
          Time Available
        </Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginVertical: 10,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Stylist name</Text>

          <Text
            style={{
              fontSize: 16,
              color: "grey",
              textDecorationLine: "underline",
            }}
            onPress={() => navigation.navigate("popularStylist")}
          >
            2:00-04-08
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            height: 120,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {timeSlot.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleClicked(item)}
                style={[
                  item.id == clickedDate ? styles.timePress : styles.timeNormal,
                ]}
              >
                <Text
                  style={{ color: "white", fontWeight: "normal", fontSize: 16 }}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            height: 110,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
            marginVertical: 30,
          }}
        >
          {places.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleClicked(item)}
                style={[
                  item.id == clickedPlace
                    ? styles.pressPlace
                    : styles.normalPlace,
                ]}
              >
                <FontAwesome5
                  name={item.place}
                  size={30}
                  style={{ marginHorizontal: 20 }}
                  color="white"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {clickedDay && clickedDate && clickedPlace ? (
        <TouchableOpacity
          style={styles.toggleService}
          onPress={() => handleNext()}
        >
          <Text style={{ fontSize: 19, color: "#FF7E00" }}>Next</Text>
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
  my: {
    backgroundColor: "red",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  timePress: {
    width: "47%",
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 2,
    margin: 4.5,
    borderColor: "#FF7E00",
    marginVertical: 7,
  },
  timeNormal: {
    width: "47%",
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 2,
    margin: 4.5,
    borderColor: "grey",
    marginVertical: 7,
  },
  btnNormal: {
    margin: 10,
    height: 80,
    width: 65,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnPress: {
    margin: 10,
    height: 80,
    width: 65,
    transform: [{ scale: 1.2 }],
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF7E00",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pressPlace: {
    height: 130,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    borderColor: "#FF7E00",
    borderWidth: 2,
  },
  normalPlace: {
    height: 130,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    borderColor: "grey",
    borderWidth: 2,
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
});

export default Schedule;
