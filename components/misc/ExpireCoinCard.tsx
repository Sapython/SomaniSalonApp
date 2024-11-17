import React, { FC, useCallback, useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const ExpireCoinCardProfile: FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Montserrat_500Medium, Poppins_300Light });
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
    <View onLayout={onLayout} style={styles.main}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/profile.png")}
        />
        <View style={styles.n_d}>
          <Text style={styles.n_d_text}>Outlet Service Facial</Text>
          <Text style={styles.d_t}>March 22, 2021 | 10:30AM</Text>
        </View>
      </View>
      <Text style={styles.points}>+15</Text>
    </View>
  );
};

export default ExpireCoinCardProfile;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFF4E0",
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  n_d: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  n_d_text: {
    color: "#3C3636",
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
  },
  d_t: {
    fontFamily: "Poppins_300Light",
  },
  points: {
    color: "#34A853",
    fontSize: 20,
    fontFamily: "Montserrat_500Medium",
  },
});
