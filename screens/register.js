import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Container from "../components/container";
import { signUp } from "../firebaseServices";
function Registration({ navigation }) {
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSignup = () => {
    console.log("hello");
    const [email, password] = [user.email, user.password];
   const data= signUp(user);
  //  console.log(data);
  navigation.navigate("home");
    setUser({
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

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

  return (
    <Container>
      <View style={styles.container1}>
        <Text style={styles.text}>
          <AntDesign name="arrowleft" size={28} color="white" /> Create account{" "}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView>
            <View style={styles.inputCont}>
              <Text style={styles.inputText1}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#E7AB31"
                value={user.fname}
                onChangeText={(fname) => {
                  setUser({ ...user, fname });
                }}
              />
            </View>
            <View style={styles.inputCont}>
              <Text style={styles.inputText1}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#E7AB31"
                value={user.lname}
                onChangeText={(lname) => {
                  setUser({ ...user, lname });
                }}
              />
            </View>
            <View style={styles.inputCont}>
              <Text style={styles.inputText1}>Email</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#E7AB31"
                value={user.email}
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
                placeholderTextColor="#E7AB31"
                value={user.password}
                onChangeText={(password) => {
                  setUser({ ...user, password });
                }}
              />
            </View>
            <View style={styles.inputCont}>
              <Text style={styles.inputText1}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#E7AB31"
                value={user.confirmPassword}
                onChangeText={(confirmPassword) => {
                  setUser({ ...user, confirmPassword });
                }}
              />

              {user.confirmPassword != "" &&
              user.password !== user.confirmPassword ? (
                <Text style={{ color: "red", fontSize: 10, marginVertical: 3 }}>
                  Password does not match
                </Text>
              ) : null}
            </View>
            <Pressable style={styles.button}
            
            disabled={
              user.fname == "" ||
              user.lname == "" ||
              user.email == "" ||
              user.password == "" ||
              user.confirmPassword == "" ||
              user.password !== user.confirmPassword ||
              checkValidEmail
            }
            onPress={() => handleSignup()}>
              <Text
                style={{
                  fontSize: 20,
                  textTransform: "uppercase",
                  fontWeight: "400",
                  paddingVertical: 6,

                  fontFamily: "Montserrat_500Medium",
                }}
              >
                Sign Up
              </Text>
            </Pressable>
          </SafeAreaView>
          <Text
            style={{
              color: "#E7AB31",
              fontSize: 14,
              textAlign: "center",
              marginVertical: 10,

              fontFamily: "Montserrat_500Medium",
            }}
          >
            Already have an account ?{" "}
            <Text
              style={{ color: "white" }}
              onPress={() => navigation.navigate("login")}
            >
              Login
            </Text>
          </Text>
        </ScrollView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container1: {
    marginTop: 20,
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
  },

  input: {
    height: 47,
    borderWidth: 1,
    borderRadius: 12,
    padding: 9,
    borderColor: "#E7AB31",
    color: "#E7AB31",
    placeholder: "#E7AB31",
  },
  inputCont: {
    paddingVertical: "3%",
    color: "#E7AB31",
  },

  inputText1: {
    color: "#E7AB31",
    fontSize: 15,

    fontFamily: "Montserrat_500Medium",

    marginVertical: 7,
  },
  button: {
    alignItems: "center",
    width: 220,
    marginHorizontal: 0,
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 40,
    marginVertical: 20,
    padding: 5,
    backgroundColor: "#FFA500",
  },
});
export default Registration;
