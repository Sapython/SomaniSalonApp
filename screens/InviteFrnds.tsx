import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import * as SplashScreen from "expo-splash-screen";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import Toast from "../components/misc/Toast";
import Container from "../components/container";
import Header from "../components/Header";

interface link {
  link: string;
}

const InviteFrnds: FC<link> = ({ link }) => {
  const [toast, setToast] = useState<boolean>(false);

  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string>("");

  link = "http://bit.ly/c23a12g";

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Montserrat_500Medium,
        });
      } catch {
        // handle error
      } finally {
        setFontLoaded(true);
      }
    })();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(link);
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
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
    <Header text="Invite Friends"></Header>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "95%",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Montserrat_500Medium",
                color: "white",
                marginBottom: 20,
              }}
            >
              Invite Your Friend Make Ready On Somanis
            </Text>
            <Image source={require("../assets/Frnds.png")} />
          </View>
          <View style={{ width: "100%" }}>
            <View
              style={{
                marginBottom: 20,
                display: "flex",
                alignSelf: "center",
                width: "100%",
              }}
            >
              {toast && <Toast msg="Link copied successfully" />}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#EFEFEF",
                  borderRadius: 10,
                  width: "80%",
                }}
              >
                <View
                  style={{
                    borderColor: "#1B1A1A",
                    borderStyle: "dashed",
                    borderWidth: 1,
                    display: "flex",
                    flexDirection: "row",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 10,
                  }}
                >
                  <FontAwesome
                    name="link"
                    size={24}
                    color="#666666"
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                  <Text
                    style={{
                      color: "#929292",
                      marginLeft: 8,
                      fontSize: 18,
                      fontFamily: "Montserrat_500Medium",
                    }}
                  >
                    {link}
                  </Text>
                </View>
              </View>

              <Ionicons
                onPress={copyToClipboard}
                name="md-copy-sharp"
                size={24}
                color="white"
                style={{
                  backgroundColor: "#FFA500",
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  borderRadius: 14,
                }}
              />
            </View>
            <Pressable
              style={{
                backgroundColor: "#FFA500",
                paddingVertical: 14,
                paddingHorizontal: 30,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat_500Medium",
                  textAlign: "center",
                  fontSize: 18,
                  letterSpacing: 1,
                }}
              >
                SEND INVITE
              </Text>
            </Pressable>
          </View>
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
});

export default InviteFrnds;
