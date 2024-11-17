import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Widgets = () => {
  return (
    <View
    style={{
      width: "100%",
      alignItems: "center",
      marginVertical: 20,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
    }}
  >
    <Text
      style={{
        fontSize: 20,
        color: "white",
        fontFamily: "Montserrat_600SemiBold",
      }}
    >
      Find Services
    </Text>
    <Text
      style={{ fontSize: 15, color: "#FF7E00",fontFamily:"Montserrat_500Medium" }}
      onPress={() => navigation.navigate("services")}
    >
      See All
    </Text>
  </View>
  )
}

export default Widgets

const styles = StyleSheet.create({})