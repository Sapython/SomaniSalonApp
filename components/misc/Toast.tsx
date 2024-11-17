import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native";

interface Message {
  msg: string;
}
const Toast: FC<Message> = ({ msg }) => {
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
    <View onLayout={onLayout}>
      <Text style={styles.toast_text}>{msg}</Text>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast_text: {
    color: "#E8E8E8",
    backgroundColor: "#818181",
    // paddingHorizontal: 30,
    paddingVertical: 4,
    borderRadius: 14,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
});
