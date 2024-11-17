import React from "react";
import { View, Text,Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
function Header({ text}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
          position: "relative",
          marginBottom:10
      }}
    >
      <AntDesign name="arrowleft" size={28} color="white"  onPress={()=>navigation.goBack()}/>
      <Text style={{ color: "white", fontSize: 26, textAlign: "center" ,fontWeight:"800"}}>
        {text}
      </Text>
      <Ionicons name="md-menu-sharp" size={28} color="white" onPress={()=>navigation.navigate("menu")} />
    </View>
  );
}

export default Header;
