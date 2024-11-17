import React from "react";
import Container from "../components/container";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

function ProcessingPage({navigation}) {
    const timer = () => {
        setTimeout(() => {
            navigation.navigate("confirm");
        }, 3000);
    };
    timer()
  return (
    <Container >
      <Text style={{textAlign:"center",fontSize:25,marginTop:20,color:"white"}}>Payment</Text>
        <View style={{display:"flex",alignItems:"center",justifyContent:"center",height:"80%"}}>

      <Image style={{height:150,width:160}} source={require("../assets/Frame.png")} ></Image>
      <Text style={{textAlign:"center",fontSize:32,marginTop:25,fontWeight:"bold",color:"white",lineHeight:40}}>Payment {'\n'}Processing</Text>
      <Text  style={{textAlign:"center",fontSize:20,marginTop:15,color:"grey",fontWeight:"bold",}}>Please Wait Do Not {'\n'}Close The Screen.</Text>

        </View>

    </Container>
  );
}

export default ProcessingPage;
