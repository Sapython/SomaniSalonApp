import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TotalPoints from "../components/misc/TotalPoints";
import * as Clipboard from "expo-clipboard";
import Toast from "../components/misc/Toast";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

interface code {
  code: string;
}

const Congratulations: FC <code> = ({ code }) => {
  const [copiedText, setCopiedText] = useState<string>("");
  const [toast, setToast] = useState<boolean>(false);
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Montserrat_500Medium });
      } catch {
        // handle error
      } finally {
        setFontLoaded(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);
  if (!fontLoaded) {
    return null;
  }

  code = "IN4FGR";
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(code);
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 1000);
  };
  return (
    <SafeAreaView onLayout={onLayout}>
      <LinearGradient style={styles.gradient} colors={["#313131", "#121010"]}>
        <View style={styles.header}>
          <AntDesign name="arrowleft" size={24} style={styles.arrowIcon} />
          <Text style={styles.headerText}>Loyalty Points</Text>
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <TotalPoints />
        </View>
        <View style={{ marginTop: 40 }}>
          <View style={styles.main}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Montserrat_500Medium",
                marginTop: 10,
              }}
            >
              Congratulations!
            </Text>
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 18,
                color: "white",
                fontFamily: "Montserrat_500Medium",
              }}
            >
              Here’s the code for your 10% off your next appoinment
            </Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Text
                style={{
                  borderStyle: "dashed",
                  color: "#2B2B2B",
                  borderColor: "white",
                  borderWidth: 1,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  marginTop: 14,
                  fontSize: 22,
                  fontWeight: "500",
                }}
              >
                {code} <FontAwesome name="copy" size={20} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 40,
            display: "flex",
            alignSelf: "center",
            width: "100%",
          }}
        >
          {toast && <Toast msg="Code copied successfully" />}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Congratulations;

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
  main: {
    height: 200,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: "#FFA500",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
