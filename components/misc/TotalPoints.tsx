import React, { FC, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const TotalPoints: FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Montserrat_400Regular });
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
    <View onLayout={onLayout}>
      <View style={styles.main}>
        <View style={styles.tHead}>
          <MaterialCommunityIcons
            name="crown-circle-outline"
            size={24}
            color="black"
          />
          <Text style={styles.tHeadText}>Total earn points</Text>
        </View>
        <Text style={{ fontFamily: "Montserrat_400Regular" }}>435</Text>
        <Text style={styles.lText}>view points history</Text>
      </View>
    </View>
  );
};

export default TotalPoints;

const styles = StyleSheet.create({
  main: {
    // marginHorizontal: "auto",
    backgroundColor: "#FFF4E0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    width: "60%",
  },
  tHead: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tHeadText: {
    fontFamily: "Montserrat_400Regular",
    marginLeft: 4,
  },
  lText: {
    color: "#FFA500",
  },
});
