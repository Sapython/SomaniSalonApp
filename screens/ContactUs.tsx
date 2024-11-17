import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useState, useEffect, useCallback } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Toast from "../components/misc/Toast";
import Container from "../components/container";
import Header from "../components/Header";

const ContactUs: FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [toast, setToast] = useState<boolean>(false);
  const [email, setemail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Montserrat_600SemiBold,
          Montserrat_500Medium,
        });
      } catch {
        // handle error
      } finally {
        setFontLoaded(true);
      }
    })();
  }, []);

  const toastFn = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 1000);
  };
  const onLayout = useCallback(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);
  if (!fontLoaded) {
    return null;
  }
  return (
     <Container>
      <Header text="Contact Us"></Header>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "90%",
              width: "95%",
              alignSelf: "center",
            }}
          >
            <View>
              <TextInput
                style={styles.inputArea}
                value={name}
                placeholderTextColor="black"
                onChangeText={(text) => setName(text)}
                placeholder="Your Name "
              />
              <TextInput
                style={styles.inputArea}
                value={email}
                placeholderTextColor="black"
                onChangeText={(text) => setemail(text)}
                placeholder="Your Email "
              />
              <TextInput
                style={[styles.inputArea, { textAlignVertical: "top" }]}
                placeholderTextColor="black"
                multiline={true}
                numberOfLines={8}
                placeholder="Your Message..."
              />
              <View
                style={{
                  marginTop: 20,
                  width: "100%",
                  display: "flex",
                  alignSelf: "center",
                }}
              >
                {toast && <Toast msg="Your message submit successfully" />}
              </View>
            </View>
            <Pressable
              style={{
                backgroundColor: "#FFA500",
                paddingVertical: 6,
                paddingHorizontal: 30,
                borderRadius: 10,
                marginVertical: 20,
                alignSelf: "center",
              }}
              onPress={toastFn}
            >
              <Text
                style={{
                  fontFamily: "Montserrat_500Medium",
                }}
              >
                Submit
              </Text>
            </Pressable>
          </View>
          </Container>
    
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: "100%",
    paddingHorizontal: 20,
  },
  arrowIcon: {
    color: "white",
    marginVertical: 4,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  headerText: {
    color: "white",
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
  },
  inputArea: {
    fontFamily: "Montserrat_500Medium",
    backgroundColor: "#FFF4E0",
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginVertical: 6,
    borderRadius: 12,
    fontSize: 18,
  },
});

export default ContactUs;
