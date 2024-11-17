import React, { useEffect, useState } from "react";
import Container from "../components/container";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../components/Header";
import { Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getAddress, getServicePrice } from "../firebaseServices";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Card from "../components/card";
function CheckOut({ route, navigation }) {
  const [address, setAddress] = useState([]);
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [myCoupon, setMyCoupon] = useState("");
  const [couponUsed, setCouponUsed] = useState(false);
  const coupons = [
    {
      code: "FIRST",
      discount: 10,
    },
    {
      code: "SECOND",
      discount: 20,
    },
  ];
  const add = () => {
    if (!count < 1) {
      setCount(count + 1);
      setTotal(total + price);

      setFinalPrice(total);
    }
  };
  const applyCoupon = () => {
    if (!couponUsed) {
      coupons.map((coupon) => {
        if (coupon.code === myCoupon) {
          setDiscount(coupon.discount);
          setCouponUsed(true);
          setFinalPrice(total - (total * coupon.discount) / 100);
          alert("Coupon Applied");
        }
      });
    } else {
      alert("Coupon already used");
    }
  };
  const removeCoupon = () => {
    if (couponUsed) {
      setFinalPrice(finalPrice + (total * discount) / 100);
      setDiscount(0);
      setCouponUsed(false);
      alert("Coupon Removed");
    } else {
      alert("No Coupon Applied");
    }
  };
  const remove = () => {
    if (!count < 5) {
      setCount(count - 1);
      setTotal(total + price);

      setFinalPrice(total);
    }
  };

  let Data = route.params.data;
  useEffect(() => {
    getAddress().then((res) => {
      if (res) {
        setAddress(res);
      } else {
        navigation.navigate("address");
      }
    });
    getServicePrice(Data.service.id).then((res) => {
      setPrice(res);
      setTotal(price * count);
      setFinalPrice(res);
    });
    if(Data.service.type == "combo" ){
      setPrice(Data.service.amount /Data.service.names.length );
      setTotal(Data.service.amount);
      setFinalPrice(Data.service.amount);

    }
  }, []);

  return (
    <Container>
      <Header text="Check Out"></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text style={styles.text1}>Shipping Address</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF7E00",
              width: 50,
              padding: 4,
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={styles.text2}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF7E00",
              width: 50,
              padding: 4,
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={styles.text2}>Edit</Text>
          </TouchableOpacity>
        </View>
        {address?.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                marginVertical: 20,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFE3C0",
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="location-outline" size={24} color="black" />
              </View>

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                {item.fname} {item.lname} {"\n"}
                +91{item.phoneNumber}
                {"\n"}
                {item.address} {""}
                {item.landmark} {""}
                {item.pinCode}
              </Text>
            </View>
          );
        })}

        <Text style={styles.text1}>Order Summary</Text>
        <View style={{ height: 100 }}>
          <Card>
            <Image
              style={{ width: 50, height: 50, borderRadius: 10 }}
              source={{ uri: Data.stylist.imageUrl }}
            />
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                marginLeft: 10,
                width: "80%",
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", lineHeight: 28 }}
              >
                {Data.stylist.name}
                {"\n"}
                <Text style={{ fontSize: 15, fontWeight: "normal" }}>
                  {Data.service.ServiceName}
                </Text>
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", lineHeight: 28 }}
              >
                {Data.time.time}
                {"\n"}
                <Text style={{ fontSize: 15, fontWeight: "normal" }}>
                  #{Data.date.date} {Data.date.day}
                </Text>
              </Text>
            </View>
          </Card>
        </View>
        <View
          style={{
            backgroundColor: "#FFF4E0",

            borderRadius: 10,
            padding: 10,
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {Data.service.ServiceName}
          </Text>
          {
            (Data.service.type == "combo" ? (
              <View>
                {Data.service.names.map((item,index) => {
                  return (
                    <View style={styles.flexing} marginTop={10}>
                      <Text style={{width:"40%"}}> {item.name}</Text>
                      <View style={styles.flexing}>
                      
                      </View>
                      <Text>Rs. {price}</Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.flexing} marginTop={10}>
                <Text> {Data.service.name}</Text>
                <View style={styles.flexing}>
                  <AntDesign
                    style={{
                      backgroundColor: "#FEAB34",
                      padding: 1,
                      borderRadius: 3,
                      marginHorizontal: 5,
                    }}
                    name="plus"
                    size={17}
                    color="black"
                    onPress={add}
                  />
                  <Text>{count}</Text>
                  <AntDesign
                    style={{
                      backgroundColor: "#FEAB34",
                      padding: 1,
                      borderRadius: 3,
                      marginHorizontal: 5,
                    }}
                    name="minus"
                    size={17}
                    color="black"
                    onPress={remove}
                  />
                </View>
                <Text>Rs. {price}</Text>
              </View>
            ))
          }

          <Divider
            height={5}
            style={{ marginVertical: 10, height: 1 }}
          ></Divider>
          <View style={styles.flexing} marginTop={10}>
            <Text>Total</Text>

            <Text>Rs. {total}</Text>
          </View>
        </View>
        <Text style={styles.text1}>Coupon</Text>
        <View style={styles.flexing}>
          <TextInput
            style={styles.input1}
            value={myCoupon}
            onChangeText={(text) => setMyCoupon(text)}
            placeholder="Enter Coupon Code"
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#FF7E00",
              width: 60,
              padding: 4,
              height: 40,
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={applyCoupon}
          >
            <Text style={{ color: "white" }}>Use</Text>
          </TouchableOpacity>
        </View>
        {couponUsed ? (
          <View style={styles.flexing}>
            <Text style={styles.textOffer}>
              <MaterialIcons name="local-offer" color="#FF7E00" /> {myCoupon}
            </Text>
            <TouchableOpacity onPress={removeCoupon}>
              <FontAwesome name="remove" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ) : (
          ""
        )}
        <Divider
          style={{ backgroundColor: "grey", height: 2, marginVertical: 20 }}
        ></Divider>
        <View style={styles.flexing} marginTop={10}>
          <Text style={styles.text4}>Coupon Discount</Text>

          <Text style={styles.text4}>{discount ? `${discount}%` : 0}</Text>
        </View>
        <View style={styles.flexing} marginTop={10}>
          <Text style={styles.text4}>Previous Price</Text>

          <Text style={styles.text4}>{total} Rs</Text>
        </View>
        <View style={styles.flexing} marginTop={10}>
          <Text style={styles.text4}>Total</Text>

          <Text style={styles.text4}>{finalPrice} Rs</Text>
        </View>
        <Divider
          style={{ backgroundColor: "grey", height: 2, marginVertical: 20 }}
        ></Divider>
      </ScrollView>
      {true ? (
        <TouchableOpacity
          style={styles.toggleService}
          onPress={() => navigation.navigate("Processing")}
        >
          <Text style={{ fontSize: 19, color: "#FF7E00" }}>Go To Payment</Text>
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
    // <Container>

    // </Container>
  );
}
const styles = StyleSheet.create({
  input1: {
    height: 40,
    width: "75%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  text1: {
    color: "white",
    fontSize: 19,
    marginVertical: 10,
    fontWeight: "bold",
  },
  textOffer: {
    color: "#FF7E00",
    fontSize: 19,
    fontWeight: "bold",
    textDecorationLine: "line-through",
    marginVertical: 10,
  },
  text4: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleService: {
    marginHorizontal: 5,
    flexDirection: "row",
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF7E00",
    borderRadius: 10,
  },
  text2: { color: "white", fontSize: 15, fontWeight: "normal" },
  card1: {
    backgroundColor: "#FF7E00",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  flexing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
export default CheckOut;
