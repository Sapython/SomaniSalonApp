import React, { useEffect, useState } from "react";
import Container from "../components/container";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { getServiceData } from "../firebaseServices";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import Loader from "./Loader";

function ServicePage({ route, navigation }) {
  const back = () => {
    // navigation.goBack()
    console.log("⚡⚡⚡");
  };
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [serviceName, setServiceName] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [selectService, setSelectService] = useState(null);

  const [clickId, setClickId] = React.useState(-1);
  const [clicked, setClicked] = useState(false);

  const onPressed = (index,service) => {
    setClicked(true);
    service.ServiceName= route.params.name;
    setSelectService(service);
    console.log("🚀 ~ file: servicePage.js ~ line 70 ~ onPressed ~ index", service.name);
    setClickId(index);
  };

  useEffect(() => {
    getServiceData(route.params.serviceId).then((res) => {
      setServiceName(route.params.name);
      setServiceData(res);
    });
  }, []);
const handleService=()=>{
  console.log("🚀 ~ file: servicePage.js ~ line 84 ~ handleService ~ selectService", route.params)

  if(route.params.data){
  let data = route.params.data;
  data.service = selectService;
  navigation.navigate("schedule", {data:data});
}
else{
  navigation.navigate("popularStylist", {data:{ service: selectService}});
}
}
  return (
    <Container>
      <Header text="Service" back={back}></Header>

      <Searchbar
        style={styles.searchBox}
        color="#FF7E00"
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

  
      {
        serviceData.length?
        <ScrollView showsVerticalScrollIndicator={false}>
        {}
        {/* {haiStyles.map((haiStyle) => (
          
        ))} */}
        
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
        {serviceName}
      </Text>

        {serviceData ? (
          serviceData.map((service, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onPressed(index, service)}
                style={[clickId == index ? styles.card : styles.card2]}
              >
                <Image
                  source={{ uri: service.imageUrl }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    position: "absolute",
                    top: -50,
                    right: 0,
                  }}
                />
                <View style={{ padding: 10 }}>
                  <Text
                    style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
                  >
                    {service.name}
                  </Text>
                  <Text
                    style={{
                      color: "grey",
                      fontSize: 12,
                      fontWeight: "normal",
                    }}
                  >
                    {service.desc}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        )}
      </ScrollView>
      :<Loader></Loader>
      }

      {clicked ? (
        <TouchableOpacity
          style={styles.toggleService}
          onPress={() =>handleService()}
        >
          <Text style={{ fontSize: 19, color: "#FF7E00" }}>Select stylist</Text>
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
  card: {
    width: "90%",
    height: 100,
    marginHorizontal: 10,
    marginTop: 55,
    position: "relative",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF7E00",
  },
  card2: {
    width: "90%",
    height: 100,
    marginHorizontal: 10,
    marginTop: 55,
    position: "relative",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
  toggleService: {
    marginHorizontal: 5,
    flexDirection: "row",
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF7E00",
    borderRadius: 10,
  },
});
export default ServicePage;
