import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ExpireCard from "../components/misc/ExpireCard";
import TotalPoints from "../components/misc/TotalPoints";
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import ExpireCoinCardProfile from "../components/misc/ExpireCoinCard";
import { SafeAreaView } from "react-native-safe-area-context";

const ExpiryCoins: FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Montserrat_600SemiBold, Montserrat_500Medium });
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
    <SafeAreaView onLayout={onLayout}>
      <View>
        <LinearGradient style={styles.gradient} colors={["#313131", "#121010"]}>
          <View style={styles.header}>
            <AntDesign name="arrowleft" size={24} style={styles.arrowIcon} />
            <Text style={styles.headerText}>Loyalty Points</Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TotalPoints />
          </View>
          <ScrollView>
            <View>
              <ExpireCoinCardProfile />
              <ExpireCard />
              <ExpireCoinCardProfile />
              <ExpireCard />
              <ExpireCoinCardProfile />
              <ExpireCard />
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default ExpiryCoins;

const styles = StyleSheet.create({
  gradient: {
    height: 1000,
    paddingHorizontal: 20,
  },
  // gradient_2:{
  //   position: "absolute",
  //   bottom: 100,
  //   zIndex: 99999999999
  // },
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
