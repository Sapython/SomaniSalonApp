import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { authentication } from "../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import {authenticationServices} from "../firebaseServices";
function StartScreen({ navigation }) {
 

  useEffect(() => {
    authenticationServices().then((res) => {
      console.log("res");
      console.log(res);
     if(res == {}){

       navigation.navigate("login");
    }
    else{
      navigation.navigate("home");
    } 
    });
  }, []);
  
  return (
    <View style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#313131", "#121010"]}
        style={styles.bg}
      >
        <View style={styles.container1}>
          <Image
            style={styles.logo}
            source={require("../assets/somanis.png")}
          />
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.text3}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.button2}
            onPress={() => navigation.navigate("register")}
          >
            <Text style={styles.text3}>Create Account</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat_500Medium",
  },
  text3: {
    fontSize: 18,
    fontWeight: "600",

    fontFamily: "Montserrat_500Medium",
  },
  container1: {
    marginTop: 70,
    marginHorizontal: 25,
  },
  bg: {
    height: "100%",
    width: "100%",
  },
  logo: {
    height: 300,
    width: 300,
    margin: 5,
    marginVertical: "30%",
  },
  button: {
    alignItems: "center",
    height: 45,
    marginHorizontal: 0,
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 12,
    padding: 5,
    backgroundColor: "#FFA500",
  },
  button2: {
    alignItems: "center",
    height: 45,
    marginHorizontal: 0,
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 12,
    padding: 5,
    backgroundColor: "#fff",
  },
});

export default StartScreen;
