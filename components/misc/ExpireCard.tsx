import React, { FC, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { Poppins_300Light } from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const ExpireCard: FC = () => {
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
    <View onLayout={onLayout}>
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.n_d}>
            <Text style={styles.n_d_text}>Expire Coins</Text>
            <Text style={styles.d_t}>Debited on 07 dec 2022</Text>
          </View>
        </View>
        <Text style={styles.points}>-10</Text>
      </View>
    </View>
  );
};

export default ExpireCard;

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
  n_d: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  n_d_text: {
    color: "#3C3636",
    fontSize: 18,
    marginBottom: 12,
    fontFamily: "Montserrat_500Medium",
  },
  d_t: {
    fontFamily: "Montserrat_500Medium",
    color: "#9D9D9D",
  },
  points: {
    color: "#C5221F",
    fontSize: 20,
    fontFamily: "Poppins_300Light",
  },
});
