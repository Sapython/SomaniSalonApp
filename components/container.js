import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
function Container({ children }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#313131", "#121010"]}
        style={styles.bg}
      >
        
        {children}
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bg: {
    height: "100%",
    width: "100%",
    
    paddingTop:40,
    paddingHorizontal: 22,
  },
});

export default Container;
