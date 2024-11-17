import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Container from "../components/container";

import { SocialIcon } from "react-native-elements";
import { login, SignInWithGoogle } from "../firebaseServices";
import {
  signOut,
} from "firebase/auth";
import { authentication } from "../firebaseConfig";
function LoginScreen({ navigation }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleGoogleLogin = () => {
    // console.log("hello");`
    SignInWithGoogle();
  };
  const [signIn, setSignIn] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const handleCheckEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setUser({ ...user, email });
    if (re.test(email) || regex.test(email)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const loginUser = () => {

    login(user);
    navigation.navigate("home");
  };
  const logOut = () => {
    console.log("hello");
    signOut(authentication)
      .then(() => {
        setSignIn(false);
        console.log("signout");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <View style={styles.container1}>
        <Text style={styles.text}>Login To {"\n"}Somanis Salon</Text>
        <Text style={styles.text2}>Welcome Back !!</Text>
        <SafeAreaView
          style={{
            marginVertical: 10,

            marginTop: "5%",
          }}
        >
          <View style={styles.inputCont}>
            <Text style={styles.inputText1}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="test@gmail.com"
              placeholderTextColor="#E7AB31"
              onChangeText={(email) => handleCheckEmail(email)}
            />
            {checkValidEmail ? (
              <Text style={{ color: "red", fontSize: 10, marginVertical: 3 }}>
                Please enter valid email
              </Text>
            ) : null}
          </View>
          <View style={styles.inputCont}>
            <Text style={styles.inputText1}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#E7AB31"
              secureTextEntry={false}
              onChangeText={(password) => {
                setUser({ ...user, password });
              }}
            />
            <Text style={styles.fogotPassword}>Forgot Password?</Text>
          </View>
          {signIn ? (
            <TouchableOpacity style={styles.button} onPress={() => logOut()}>
              <Text
                style={{
                  fontSize: 20,
                  textTransform: "uppercase",
                  fontWeight: "100",
                  paddingVertical: 6,
                  fontFamily: "Montserrat_500Medium",
                }}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => loginUser()}>
              <Text
                style={{
                  fontSize: 20,
                  textTransform: "uppercase",
                  fontWeight: "100",
                  paddingVertical: 6,
                  fontFamily: "Montserrat_500Medium",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
        <Text
          style={{
            color: "#E7AB31",
            fontSize: 14,
            textAlign: "center",
            marginVertical: 16,

            fontFamily: "Montserrat_500Medium",
          }}
        >
          Don't have an account ?{" "}
          <Text
            style={{
              color: "white",

              fontFamily: "Montserrat_500Medium",
            }}
            onPress={() => navigation.navigate("register")}
          >
            Register
          </Text>
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#FF8C00" }} />
          <View>
            <Text style={styles.orSignup}>Or Sign Up With</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "#FF8C00" }} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <SocialIcon
            style={{ height: 40, width: 40 }}
            type="google"
            onPress={() => handleGoogleLogin()}
          />
          <SocialIcon style={{ height: 40, width: 40 }} type="facebook" />
          <SocialIcon style={{ height: 40, width: 40 }} type="twitter" />
        </View>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  container1: {
    marginTop: 50,
  },
  bg: {
    height: "100%",
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    color: "#F1F1F1",
    fontWeight: "22",
    fontFamily: "Montserrat_500Medium",
  },
  text2: {
    marginTop: "10%",
    fontSize: 25,
    color: "#E7AB31",
    fontFamily: "Montserrat_500Medium",
  },
  input: {
    height: 47,
    borderWidth: 1,
    borderRadius: 12,
    padding: 9,

    fontFamily: "Montserrat_500Medium",
    borderColor: "#E7AB31",
    color: "#E7AB31",
    placeholder: "#E7AB31",
  },
  inputCont: {
    paddingVertical: 10,
    color: "#E7AB31",
  },
  fogotPassword: {
    textAlign: "right",
    marginTop: 5,
    fontSize: 12,
    color: "#E7AB31",
  },
  inputText1: {
    color: "#E7AB31",
    fontSize: 15,

    fontFamily: "Montserrat_500Medium",

    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    width: "60%",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: "20%",
    marginVertical: 15,
    padding: 5,
    backgroundColor: "#FFA500",
  },
  orSignup: {
    width: 130,
    padding: 4,
    fontSize: 10,
    textAlign: "center",
    borderRadius: 50,
    color: "#FF8C00",
    borderColor: "#FF8C00",
    borderWidth: 1,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
