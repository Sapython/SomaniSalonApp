import React, { useEffect } from "react";
import Container from "../components/container";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import Card from "../components/card";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";

import { Modal, Portal, Button, Provider } from "react-native-paper";
import { Auth, logOut, UserData } from "../firebaseServices";
import { user } from "../firebaseConfig";
function MenuScreen({ navigation }) {
  console.log(UserData);
  const [visible, setVisible] = React.useState(false);
  const [clickId, setClickId] = React.useState(0);
  useEffect(() => {
  
  console.log(UserData);
  }, []);

  const showModal = () => {
    setVisible(true);
  };
  const handlePress = (item, id) => {
   if(id===0){
    logOut();
    navigation.navigate("start");     
  }
  hideModal();
    
  };
  const hideModal = () => setVisible(false);
  const Choices = ["logout", "Cancel"];
  if(UserData){
    return (
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal}>
            <LinearGradient
              colors={["#313131", "#121010"]}
              style={{
                padding: 5,
                backgroundColor: "white",
                width: "90%",
                marginHorizontal: 20,
                height: 300,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/logout.png")}
                style={{ height: 60, width: 60, marginVertical: 10 }}
              ></Image>
              <Text
                style={{
                  fontSize: 27,
                  fontWeight: "bold",
                  color: "white",
                  marginVertical: 10,
                }}
              >
                Log Out ?
              </Text>
              <Text
                style={{ fontSize: 20, paddingHorizontal: 15, color: "grey" }}
              >
                Are you sure want to log out?
              </Text>
              <View
                style={{
                  marginTop: 30,
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-around",
                  flexDirection: "row",
                }}
              >
                {Choices.map((item, index) => {
                  return (
                    <TouchableOpacity
                    key={index}
                      style={[
                        index === clickId ? styles.button : styles.buttonActive,
                      ]}
                      onPress={(item) => handlePress(item, index)}
                    >
                      <Text
                        style={
                          index === clickId ? styles.text : styles.activeText
                        }
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </LinearGradient>
          </Modal>
        </Portal>
        <Container style={{ position: "relative" }}>
          <Header text="Menu"></Header>
  
          <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
          
            <Card>
              <Avatar.Image
                size={60}
                source={{ uri:  UserData.photoURL?UserData.photoURL:"http://www.ethosengineering.in/images/testimonials/dummyimage.png" }}
              />
              <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: "bold" }}>
                {UserData?UserData.first:""} {UserData?UserData.last:""}{"\n"}
                <Text style={{ marginLeft: 10, fontSize: 13, fontWeight: "300" }}>
  {UserData?UserData.email : ""}        </Text>{" "}
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity         onPress={()=> navigation.navigate("appointment")}
  >
            <Card>
              <AntDesign name="calendar" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15 }}>
                My Appointments
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity          onPress={()=> navigation.navigate("LoyaltyPoints")}>
            <Card>
              <AntDesign name="staro" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15 }}>Loyalty Points</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity          onPress={()=> navigation.navigate("InviteFrnds")}>
            <Card>
              <AntDesign name="adduser" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15 }}>Invite Friends</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity          onPress={()=> navigation.navigate("Settings")}>
            <Card>
              <AntDesign name="setting" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15 }}>Settings</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity          onPress={()=> navigation.navigate("ContactUs")}>
            <Card>
              <AntDesign name="contacts" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15 }}>Contact US</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showModal()}>
            <Card>
              <AntDesign name="logout" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 15 }}>Log Out</Text>
            </Card>
          </TouchableOpacity>
        </Container>
      </Provider>
    );   
  }
 
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFA500",
    width: "45%",
    height: 50,
    padding: 5,
    borderRadius: 6,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: "white",
    width: "45%",
    height: 50,
    padding: 5,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "white", fontSize: 20, fontWeight: "600" },
  activeText: { color: "black", fontSize: 20, fontWeight: "600" },
});

export default MenuScreen;
