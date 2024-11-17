import React, { FC, useState, useEffect, useCallback } from "react";
import { FlatList, Pressable, Touchable, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Montserrat_500Medium,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import { AccordionData, DataQuery } from "../../data/settingsAccorData";
import { MaterialIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

const Accordion: FC = () => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [ineerExpansion, setInnerExpansion] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Montserrat_400Regular, Montserrat_500Medium });
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
      <LinearGradient
        colors={["#FFA500", "#FCAF65"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 16,
          marginTop: 20,
        }}
      >
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingVertical: 14,
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() => setExpanded(expanded !== "faq" ? "faq" : null)}
        >
          <Text style={{ fontFamily: "Montserrat_400Regular" }}>FAQ's</Text>
          <MaterialIcons
            style={[
              expanded === "faq" && { transform: [{ rotate: "180deg" }] },
            ]}
            name="keyboard-arrow-down"
            size={24}
            color="black"
          />
        </Pressable>
      </LinearGradient>
      {expanded === "faq" && (
        <View
          style={{
            marginTop: -20,
            paddingTop: 20,
            width: "100%",
            zIndex: -99,
            backgroundColor: "#FFD486",
            borderBottomEndRadius: 16,
            borderBottomStartRadius: 16,
            paddingVertical: 15,
          }}
        >
          <FlatList
            data={DataQuery}
            renderItem={({ item }) => (
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderBottomColor: "#FFB153",
                    borderBottomWidth: 1,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      lineHeight: 14,
                      fontFamily: "Montserrat_400Regular",
                    }}
                  >
                    {item.query}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setInnerExpansion(
                        ineerExpansion !== item.id ? item.id : null
                      )
                    }
                  >
                    <Text
                      style={[
                        { fontSize: 32 },
                        ineerExpansion === item.id && {
                          transform: [{ rotate: "45deg" }],
                        },
                      ]}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>
                {ineerExpansion === item.id && (
                  <Text
                    style={{
                      fontSize: 10,
                      lineHeight: 14,
                      color: "#69696B",
                      paddingHorizontal: 8,
                      paddingVertical: 8,
                      fontFamily: "Montserrat_400Regular",
                      borderBottomColor: "#FFB153",
                      borderBottomWidth: 1,
                    }}
                  >
                    {item.data.query}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
      )}
      <LinearGradient
        colors={["#FFA500", "#FCAF65"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 16,
          marginVertical: 8,
        }}
      >
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingVertical: 14,
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() => setExpanded(expanded !== "help" ? "help" : null)}
        >
          <Text style={{ fontFamily: "Montserrat_400Regular" }}>HELP</Text>
          <MaterialIcons
            style={[
              expanded === "help" && { transform: [{ rotate: "180deg" }] },
            ]}
            name="keyboard-arrow-down"
            size={24}
            color="black"
          />
        </Pressable>
      </LinearGradient>
      {expanded === "help" && (
        <View
          style={{
            marginTop: -25,
            paddingTop: 20,
            width: "100%",
            zIndex: -99,
            backgroundColor: "#FFD486",
            borderBottomEndRadius: 16,
            borderBottomStartRadius: 16,
            paddingVertical: 15,
            marginBottom: 8,
          }}
        >
          <FlatList
            data={DataQuery}
            renderItem={({ item }) => (
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderBottomColor: "#FFB153",
                    borderBottomWidth: 1,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      lineHeight: 14,
                      fontFamily: "Montserrat_400Regular",
                    }}
                  >
                    {item.query}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setInnerExpansion(
                        ineerExpansion !== item.id ? item.id : null
                      )
                    }
                  >
                    <Text
                      style={[
                        { fontSize: 32 },
                        ineerExpansion === item.id && {
                          transform: [{ rotate: "45deg" }],
                        },
                      ]}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>
                {ineerExpansion === item.id && (
                  <Text
                    style={{
                      fontSize: 10,
                      lineHeight: 14,
                      color: "#69696B",
                      paddingHorizontal: 8,
                      paddingVertical: 8,
                      fontFamily: "Montserrat_400Regular",
                      borderBottomColor: "#FFB153",
                      borderBottomWidth: 1,
                    }}
                  >
                    {item.data.query}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Accordion;
