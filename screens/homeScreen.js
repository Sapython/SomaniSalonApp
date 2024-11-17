import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Container from "../components/container";
import { LinearGradient } from "expo-linear-gradient";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Loader from "./Loader.tsx";
import { servicesFn, stylistFn } from "../firebaseServices";
// import {stylistFn} from "../firebaseServices";
import { FlatListSlider } from "../components/react-native-flatlist-slider";

import RazorpayCheckout from 'react-native-razorpay';
function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [service, setService] = useState([]);
  const [popularMen, setPopularMen] = useState([]);
  const [homeMain, setHomeMain] = useState([]);
  const [popularStylist, setPopularStylist] = useState([]);
  const [popularWomen, setPopularWomen] = useState([]);
  const [recentWorks, setRecentWorks] = useState([]);
  const [Packages, setPackages] = useState([]);

  const servicesFn = async () => {
    const querySnapshot = await getDocs(collection(db, "services"));
    querySnapshot.forEach((doc) => {
      setService(doc.data().all_services);
      return doc.data().all_services;
    });
  };
  const recentWorksFn = async () => {
    const querySnapshot = await getDocs(collection(db, "recentWorks"));
    querySnapshot.forEach((doc) => {
      setRecentWorks(doc.data().recent_works);
      return doc.data().recent_works;
    });
  };
  // const popularStylistFn = async () => {
  //   const querySnapshot = await getDocs(collection(db, "popularStylist"));
  //   querySnapshot.forEach((doc) => {
  //     setPopulaStylist(doc.data().popular_stylist);
  //     return doc.data().popular_stylist;
  //   });
  // };
  const popularMenFn = async () => {
    const querySnapshot = await getDocs(collection(db, "popularMen"));
    querySnapshot.forEach((doc) => {
      setPopularMen(doc.data().popular_men_styles);
      return doc.data().popular_men_styles;
    });
  };
  const getPackages = async () => {
    console.log("calling");

    const querySnapshot = await getDocs(collection(db, "comoPackages"));
    let packs = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      packs.push(...packs, doc.data());
      setPackages(packs);
    });

  };
  const homeMainFn = async () => {
    const querySnapshot = await getDocs(collection(db, "home_main"));
    querySnapshot.forEach((doc) => {
      setHomeMain(doc.data().home_main);
      return doc.data().home_main;
    });
  };
  const popularWomenFn = async () => {
    const querySnapshot = await getDocs(collection(db, "popularWomen"));
    querySnapshot.forEach((doc) => {
      setPopularWomen(doc.data().popular_women_styles);
      return doc.data().popular_women_styles;
    });
  };
  async function uploadData() {
    const docRef = await addDoc(collection(db, "popularMen"), {
      popularMen,
    });
  }

  useEffect(() => {
    stylistFn().then((data) => {
      setPopularStylist(data);
    });
    recentWorksFn();
    servicesFn();
    homeMainFn();
    popularWomenFn();
    popularMenFn();
    getPackages();
  }, []);

  const press=async()=>{
    console.log("clicked")
    await fetch('https://us-central1-sit-manager.cloudfunctions.net/createOrder', {
        credentials: 'omit',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36',
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.5',
          'content-type': 'application/json',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
        },
        referrer: 'http://localhost:8100/',
        body: '{"amount":100,"receipt":"u34kh23uk4y234u"}',
        method: 'POST',
        mode: 'cors',
      }).then((data)=>{
        data.json().then((data)=>{
          console.log('data', data);
        })
      });
  }
  const route = useRoute();
  return (
    <Container>
      <View style={styles.header}>
        {/* //if notification */}
        <MaterialCommunityIcons
          name="bell-badge"
          size={27}
          color={"#FFA500"}
          onPress={() => navigation.navigate("notification")}
        />
        {/* // no notification */}
        {/* <MaterialCommunityIcons name="bell" size={24} color="black" /> */}
        <Text
          style={{
            fontSize: 22,

            fontFamily: "Montserrat_600SemiBold",
            margin: 0,
            padding: 0,
            color: "white",
          }}
        >
          Somanis Home
        </Text>
        <Entypo
          name="menu"
          size={27}
          color="white"
          onPress={() => navigation.navigate("menu")}
        />
      </View>

      <Searchbar
        style={styles.searchBox}
        color="#FF7E00"
        placeholder="Search"
        value={""}
        onChange={() => navigation.navigate("search")}
      />
      {homeMain.length == 0 &&
      // service.length == 0 &&
      popularStylist.length == 0 &&
      popularWomen.length == 0 &&
      popularMen.length == 0 &&
      recentWorks.length == 0 ? (
        <Loader></Loader>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {homeMain.length ? <FlatListSlider data={homeMain} /> : ""}

          {/* <FlatList
            data={homeMain}
            horizontal
            onScrollAnimationEnd={true}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View
                  key={item.id}
                  style={{
                    height: 150,
                    width: 310,
                    marginRight: 10,
                    borderRadius: 12,
                  }}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 10,
                      position: "relative",
                    }}
                  ></Image>
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 170,
                      height: 60,
                      borderRadius: 10,
                      padding: 3,
                      backgroundColor: "#ffffff21",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {item.name} {`\n`}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {item.address}
                    </Text>
                  </Text>
                </View>
              );
            }}
          /> */}
          <View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: 20,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "Montserrat_600SemiBold",
                }}
              >
                Find Services
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#FF7E00",
                  fontFamily: "Montserrat_500Medium",
                }}
                onPress={() => navigation.navigate("services")}
              >
                See All
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexDirection: "row",
              }}
            >
              {service?.map((servicee, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("service", {
                        name: servicee.name,
                        serviceId: servicee.serviceId,
                      })
                    }
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 4,
                        width: 60,
                      }}
                    >
                      <View
                        style={{
                          height: 53,
                          width: 53,
                          backgroundColor: "#FFF4E0",
                          borderRadius: 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          padding: 8,
                        }}
                      >
                        <Image
                          source={{ uri: servicee.imageUrl }}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          color: "white",
                          marginVertical: 10,
                          fontSize: 12,
                        }}
                      >
                        {servicee.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: 20,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "Montserrat_600SemiBold",
                }}
              >
                Popular stylist
              </Text>

              <Text
                style={{ fontSize: 15, color: "#FF7E00" }}
                onPress={() => navigation.navigate("popularStylist")}
              >
                See All
              </Text>
            </View>
            <FlatList
              data={popularStylist}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginRight: 10, width: 310 }}>
                    <LinearGradient
                      colors={["#FFC14F", "rgba(255, 140, 0, 0.68)"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.card1}
                    >
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={{
                          width: "33%",
                          height: "100%",
                          borderRadius: 10,
                        }}
                      />
                      <View
                        style={{
                          width: "60%",
                          backgroundColor: "Red",
                          marginLeft: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text style={{ fontSize: 11, color: "black" }}>
                          {item.specialization}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                );
              }}
            />
            <Text
              style={{
                fontSize: 22,
                color: "white",
                marginVertical: 10,
                fontFamily: "Montserrat_600SemiBold",
              }}
            >
              Offers
            </Text>
            <FlatList
              keyExtractor={(item) => item.id}
              data={popularWomen}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      height: 150,
                      width: 310,
                      marginRight: 10,
                      borderRadius: 12,
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 10,
                        position: "relative",
                      }}
                    ></Image>
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: 170,
                        height: 60,
                        borderRadius: 10,
                        padding: 3,
                        backgroundColor: "#ffffff21",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "white",
                          fontWeight: "bold",
                          padding: 5,
                        }}
                      >
                        {item.offer} {`\n`}
                      </Text>
                    </Text>
                  </View>
                );
              }}
            />
            <Text
              style={{
                fontSize: 22,
                color: "white",
                marginVertical: 10,
                fontFamily: "Montserrat_600SemiBold",
              }}
            >
              Packages
            </Text>
            <FlatList
              data={Packages}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            
              renderItem={({ item ,index}) => {
                return (
                  <TouchableOpacity
                  onPress={()=>navigation.navigate("package",{id:item.id})}
                  >
                    
                  <View
                  key={index}
                  style={{
                    height: 150,
                    width: 310,
                    marginRight: 10,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <Image
                    source={{ uri: item.services[0].image }}
                    style={{
                      height: "100%",
                      width: "50%",
                      borderRadius: 10,
                      position: "relative",
                    }}
                  ></Image>
                  <View
                    style={{
                      width: "50%",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <Image
                      source={{ uri: item.services[1].image }}
                      style={{
                        height: "50%",
                        width: "100%",
                        borderRadius: 10,
                        position: "relative",
                      }}
                    ></Image>
                    <Image
                      source={{ uri: item.services[2].image  }}
                      style={{
                        height: "50%",
                        width: "100%",
                        borderRadius: 10,
                        position: "relative",
                      }}
                    ></Image>
                  </View>
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 200,
                      height: 60,
                      borderRadius: 10,
                      padding: 6,
                      backgroundColor: "#ffffff50",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Montserrat_600SemiBold",
                        
                        color: "black",
                        fontWeight: "bold",
                        padding: 10,
                      }}
                    >
                      {item.name} {`\n`}
                      ₹ {item.amount}
                    </Text>
                  </Text>
                </View>
                  </TouchableOpacity>
                );
              }}
            />

            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: 20,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "Montserrat_600SemiBold",
                }}
              >
                Recent Works
              </Text>

              <Text
                style={{ fontSize: 15, color: "#FF7E00" }}
                onPress={() => navigation.navigate("popularStylist")}
              >
                See All
              </Text>
            </View>
            <FlatList
              data={recentWorks}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    key={index}
                    style={{
                      height: 150,
                      width: 310,
                      marginRight: 10,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    <Image
                      source={{ uri: "http://i.pravatar.cc/300" }}
                      style={{
                        height: "100%",
                        width: "50%",
                        borderRadius: 10,
                        position: "relative",
                      }}
                    ></Image>
                    <View
                      style={{
                        width: "50%",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <Image
                        source={{ uri: "http://i.pravatar.cc/300" }}
                        style={{
                          height: "50%",
                          width: "100%",
                          borderRadius: 10,
                          position: "relative",
                        }}
                      ></Image>
                      <Image
                        source={{ uri: "http://i.pravatar.cc/300" }}
                        style={{
                          height: "50%",
                          width: "100%",
                          borderRadius: 10,
                          position: "relative",
                        }}
                      ></Image>
                    </View>
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 100,
                        height: 50,
                        borderRadius: 10,
                        padding: 3,
                        backgroundColor: "#ffffff21",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontWeight: "bold",
                          padding: 5,
                        }}
                      >
                        {item.offer} {`\n`}
                      </Text>
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      )}
    </Container>
//     <Container>
//       <TouchableOpacity 
//       onPress={()=>press()}
//       >
//         <Text>hiii</Text>
//       </TouchableOpacity>
//       <TouchableHighlight onPress={() => {
//     var options = {
//     description: 'Credits towards consultation',
//     image: 'https://i.imgur.com/3g7nmJC.jpg',
//     currency: 'INR',
//     key: 'REPLACEMENT_STRING_qv29k7WExrrxBW',
//     amount: '5000',
//     name: 'Acme Corp',
//     order_id: 'order_KqTNIpFsREas1q',//Replace this with an order_id created using Orders API.
//     prefill: {
//       email: 'gaurav.kumar@example.com',
//       contact: '9191919191',
//       name: 'Gaurav Kumar'
//     },
//     theme: {color: '#53a20e'}
//   }
//   RazorpayCheckout.open(options).then((data) => {
//     // handle success
//     alert(`Success: ${data.razorpay_payment_id}`);
//   }).catch((error) => {
//     // handle failure
//     alert(`Error: ${error.code} | ${error.description}`);
//     console.log(JSON.stringify(error))
//   });
// }}>

//   <Text

//   >huu</Text>
// </TouchableHighlight>
//     </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    height: 40,
    borderRadius: 50,
    color: "#FF7E00",
    marginVertical: 20,
  },
  containerImg: {
    height: 150,
    width: "100%",
    backgroundColor: "red",
    borderRadius: 10,
  },
  card1: {
    height: 110,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    borderRadius: 10,
  },
});
export default HomeScreen;
