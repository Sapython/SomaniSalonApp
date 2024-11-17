import React, { FC, useState, useCallback, useEffect } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import * as Font from "expo-font";

const RedeemCouponCard: FC = () => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

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
    <View style={styles.main} onLayout={onLayout}>
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
        <View style={styles.coupon}>
          <MaterialIcons
            style={styles.coupon_icon}
            name="lock-outline"
            size={10}
            color="black"
          />
          <Text style={styles.coupon_text}>Coupons Unlocked</Text>
        </View>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Text style={styles.text}>Redeem for 200</Text>
        </TouchableOpacity>
      </View>

      {/* MOdal */}
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modal}>
          <BlurView intensity={90} tint="default" style={styles.blurContainer}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Do you wish to redeem your coins?
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "90%",
                  }}
                >
                  <Pressable onPress={() => console.log("clicked")}>
                    <Text
                      style={{
                        fontFamily: "Montserrat_500Medium",
                        backgroundColor: "#FFA500",
                        borderRadius: 20,
                        paddingHorizontal: 30,
                        paddingVertical: 8,
                        color: "green",
                      }}
                    >
                      Yes
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => setModal(!modal)}>
                    <Text
                      style={{
                        fontFamily: "Montserrat_500Medium",
                        backgroundColor: "#FFA500",
                        borderRadius: 20,
                        paddingHorizontal: 30,
                        paddingVertical: 8,
                        color: "red",
                      }}
                    >
                      No
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </BlurView>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFA231",
    paddingHorizontal: 10,
    paddingVertical: 10,
    // margin: 10,
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
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  text: {
    paddingHorizontal: 18,
    fontSize: 14,
    backgroundColor: "white",
    borderRadius: 6,
    alignSelf: "flex-start",
    paddingVertical: 2,
    fontFamily: "Montserrat_500Medium",
  },
  coupon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  coupon_text: {
    fontSize: 12,
  },
  coupon_icon: {
    borderWidth: 1,
    padding: 2,
    borderRadius: 50,
  },
  image: {
    height: 70,
    width: 70,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "#FFF4E0",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#FFA500",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 35,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Montserrat_500Medium",
  },
});

export default RedeemCouponCard;
