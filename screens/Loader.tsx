import {
    View,
    ActivityIndicator,
  } from "react-native";
import React from 'react'

export default function Loader() {
  return (
    <View style={{height:"80%",display:"flex",alignItems:"center",justifyContent:"center"}}>

    <ActivityIndicator size="large" color="#FFC14F" />
  </View>
  )
}