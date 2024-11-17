import { StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
function Card({ children }) {
  return (
    <LinearGradient
      colors={["#FFA500", "#FCAF65"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card1}
    >
      {children}
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  card1: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    marginVertical:7,
    paddingHorizontal: 15,
    flexDirection: "row",
    borderRadius: 10,
  },
});

export default Card;
