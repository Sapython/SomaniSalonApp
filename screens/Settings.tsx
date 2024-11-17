import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccordionData, DataQuery } from "../data/settingsAccorData";
import {
  Montserrat_500Medium,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { List } from "react-native-paper";
import Accordion from "../components/misc/Accordion";
import Container from "../components/container";
import Header from "../components/Header";

const Settings: FC = () => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Montserrat_500Medium, Montserrat_400Regular });
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
  return (
<Container>
  <Header text="Settings"></Header>
        <View>
          <Accordion />
          <LinearGradient
            colors={["#FFA500", "#FCAF65"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Terms & Conditions
            </Text>
          </LinearGradient>
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

export default Settings;
