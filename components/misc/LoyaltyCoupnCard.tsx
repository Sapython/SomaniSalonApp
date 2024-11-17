import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { FontAwesome } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import * as Font from "expo-font";

const LoyaltyCouponCard: FC = () => {
  const [copiedText, setCopiedText] = useState<string>("");
  // const [toast, setToast] = useState<boolean>(false);

  const showToast = async () => {
    await Clipboard.setStringAsync("hello world");
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
    ToastAndroid.showWithGravityAndOffset(
      "Code Successfully copied",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
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
  // const copyToClipboard = async () => {
  //   await Clipboard.setStringAsync("hello world");
  //   const text = await Clipboard.getStringAsync();
  //   setCopiedText(text);
  //   setToast(true);
  //   setTimeout(() => {
  //     setToast(false);
  //   }, 1000);
  // };

  return (
    <>
      <View onLayout={onLayout} style={styles.main}>
        <Image
          style={styles.image}
          source={require("../../assets/loyalty.png")}
        />
        <View style={[styles.ellipse, styles.ellipse_1]}></View>
        <View style={[styles.ellipse, styles.ellipse_2]}></View>
        <View style={[styles.ellipse, styles.ellipse_3]}></View>
        <View style={styles.info}>
          <Text style={{ fontFamily: "Montserrat_500Medium" }}>
            10% off your next appointment
          </Text>
          <TouchableOpacity onPress={showToast}>
            <Text style={styles.text}>
              IN4FGR <FontAwesome name="copy" size={12} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoyaltyCouponCard;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFA231",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 8,
  },
  text: {
    color: "white",
    borderWidth: 1,
    paddingHorizontal: 4,
    fontSize: 10,
    borderStyle: "dashed",
    borderColor: "white",
    alignSelf: "flex-start",
    paddingVertical: 2,
  },
  image: {
    height: 50,
    width: 50,
    backgroundColor: "white",
    borderRadius: 50,
  },
  ellipse: {
    position: "absolute",
    width: 59,
    height: 59,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    opacity: 0.25,
  },
  ellipse_1: {
    left: 289,
    top: -19,
  },
  ellipse_2: {
    left: 183,
    top: 57,
  },
  ellipse_3: {
    left: 52,
    top: -8,
  },
});
