import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import Container from "../components/container";
import Header from "../components/Header";
import {saveAddress} from "../firebaseServices";
import { AntDesign } from "@expo/vector-icons";
import { UserData } from "../firebaseServices";
function Address({ navigation }) {
  const [address, setAddress] = useState({
    fname: "",
    lname: "",
    Address: "",
    landmark: "",
    pinCode: "",
    phoneNumber: "",
    AlternativePhone: "",
  });
  const handleAddress = () => {
    
    saveAddress(address).then((res) => {
      
      navigation.navigate("checkOut");
    }
    );
  };
  useEffect (() => {
    setAddress({
      ...address,userId:UserData.id
    });
  }, []);
  return (
    <Container>
      <Header text="Address"></Header>
      <ScrollView>
        <Text
          style={{
            color: "white",
            marginTop: 30,
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          Name
        </Text>
        <SafeAreaView>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TextInput
              style={styles.input1}
              value={address.fname}
              onChangeText={(fname) => {
                setAddress({ ...address, fname });
              }}
            />
            <TextInput
              style={styles.input1}
              value={address.lname}
              onChangeText={(lname) => {
                setAddress({ ...address, lname });
              }}
            />
          </View>
          <Text
            style={{
              color: "white",
              marginTop: 10,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Address
          </Text>
          <TextInput
            
            style={{
              padding: 10,
              width: "100%",
              height: 100,
              borderRadius: 8,
              marginTop: 10,
              backgroundColor: "white",
            }}
            value={address.Address}
            onChangeText={(Address) => {
              setAddress({ ...address, Address });
            }}
          ></TextInput>
          <Text
            style={{
              color: "white",
              marginTop: 10,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Land Mark
          </Text>
          <TextInput
            value={address.landmark}
            onChangeText={(landmark) => {
              setAddress({ ...address, landmark });
            }}
            style={{
              padding: 10,
              width: "100%",
              height: 40,
              borderRadius: 5,
              marginTop: 10,
              backgroundColor: "white",
            }}
          ></TextInput>
          <Text
            style={{
              color: "white",
              marginTop: 10,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Pin Code
          </Text>
          <TextInput
            value={address.pinCode}
            keyboardType="numeric"
            onChangeText={(pinCode) => {
              setAddress({ ...address, pinCode });
            }}
            style={{
              padding: 10,
              width: "50%",
              height: 40,
              borderRadius: 5,
              marginTop: 10,
              backgroundColor: "white",
            }}
          ></TextInput>
          <Text
            style={{
              color: "white",
              marginTop: 10,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Phone Number
          </Text>
          <TextInput
            value={address.phoneNumber}
            keyboardType="numeric"
            onChangeText={(phoneNumber) => {
              setAddress({ ...address, phoneNumber });
            }}
            style={{
              padding: 10,
              width: "100%",
              height: 40,
              borderRadius: 5,
              marginTop: 10,
              backgroundColor: "white",
            }}
          ></TextInput>
          <Text
            style={{
              color: "white",
              marginTop: 10,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Alternative Phone Number
          </Text>
          <TextInput
            value={address.AlternativePhone}
            keyboardType="numeric"
            onChangeText={(AlternativePhone) => {
              setAddress({ ...address, AlternativePhone });
            }}
            style={{
              padding: 10,
              width: "100%",
              height: 40,
              borderRadius: 5,
              marginTop: 10,
              backgroundColor: "white",
            }}
          ></TextInput>
        </SafeAreaView>
      </ScrollView>
      {true ? (
        <TouchableOpacity
          style={styles.toggleService}
          onPress={() => handleAddress()}
        >
          <Text style={{ fontSize: 19, color: "#FF7E00" }}>Add To Address</Text>
          <AntDesign
            style={{ fontSize: 18, color: "#FF7E00", marginLeft: 15 }}
            name="right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ) : (
        ""
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  input1: {
    height: 40,
    width: "47%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  toggleService: {
    margin: 5,
    flexDirection: "row",
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF7E00",
    borderRadius: 10,
  },
});

export default Address;
