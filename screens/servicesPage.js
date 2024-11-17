import React, { useEffect, useState } from "react";
import Container from "../components/container";
import { db } from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

import Header from "../components/Header";
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Searchbar } from "react-native-paper";
import {servicesFn} from "../firebaseServices";
import Loader from "./Loader";
function Services({route, navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [service, setService] = useState([]);
  
  

  useEffect(() => {
    servicesFn().then((res) => {
      setService(res);
    }
    );
  }, []);
   
  const handleServices = (item) => {
    // console.log("🚀 ~ file: servicesPage.js ~ line 43 ~ handleServices ~ item", item);
    if(route.params){
      let data = route.params.data;
      console.log("if");
      navigation.navigate("service", {
        name: item.name,
        serviceId: item.serviceId,
        data: data,
      })
    }
    else{
      console.log("else");
      navigation.navigate("service", {
        name: item.name,
        serviceId: item.serviceId,
      })
    }
  };


  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <Container>
      <Header text="Services"></Header>
      <Searchbar
        style={styles.searchBox}
        color="#FF7E00"
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
{
  service.length ?
  <ScrollView>
  <View
  
    style={{
      width: "100%",
      height: 110,
      backgroundColor: "red",
      borderRadius: 10,
    }}
  >
    <Image
      style={{
        height: "100%",
        width: "100%",
        borderRadius: 10,
        position: "relative",
      }}
      source={require("../assets/saloonServices/s2.png")}
    />
    <Text
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 130,
        height: 50,
        borderRadius: 10,
        padding: 3,
        color: "white",
        backgroundColor: "#ffffff21",
      }}
    >
      FLat 20% Off {"\n"} On Hair Care
    </Text>
  </View>
  <View
    style={{
      width: "100%",
      marginTop: 30,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
    }}
  >
    {service?.map((item,index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            width: "45%",
            height: 100,
            marginVertical: 10,
            borderRadius: 10,
          }}
          onPress={() =>handleServices(item)
          }
        >
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 10,
              position: "relative",
            }}
            source={{ uri: item.artImage }}
          />
          <Text
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 30,
              padding: 5,
              fontSize: 12,
              color: "white",
              backgroundColor: "#ffffff21",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
</ScrollView>:<Loader></Loader>
}
    
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
});

export default Services;
