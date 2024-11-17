
import { StyleSheet, Image, TouchableOpacity, View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Container from '../components/container'
import Header from '../components/Header'
const CustomerRating = ({ ratings, stylish }) => {
  const [rating, setRating] = useState(ratings);

  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  return (
    <View style={styles.customerRating}>
      {
        maxRating.map((item, key) => {
          return (
            <TouchableOpacity activeOpacity={0.7} key={item} >
              <Image
                style={
                  [
                    stylish ? styles.starImageStylish : styles.starImage
                  ]
                }
                source={
                  item <= rating
                    ? { uri: starImageFilled }
                    : { uri: starImageCorner }
                }
              />
            </TouchableOpacity>
          );
        }
        )

      }

    </View>
  )
}


const RatingHeader = ({ ratings }) => {

  return (
    <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center", marginTop: 20 }}>

      <CustomerRating ratings={ratings} stylish={false} />
      <Text style={{ color: "white", fontSize: 20, marginHorizontal: 10, fontWeight: "900" }}>{ratings}</Text>

    </View>
  )
}
export {
  CustomerRating,
  RatingHeader
}
const styles = StyleSheet.create({

  customerRating: {
    justifyContent: 'center',
    flexDirection: 'row',

  },
  card: {
    width: "100%",
    height: 210,
    backgroundColor: "#414040",
    borderRadius: 10,
    marginVertical: 10,
    padding: 20
  },
  starImage: {
    marginHorizontal: 4,
    width: 20,
    height: 20,
    resizeMode: 'cover',

  },
  starImageStylish: {
    marginHorizontal: 2,
    width: 10,
    height: 10,
    resizeMode: 'cover',

  },
  flexing: {
    width: "100%",
    marginTop: 5,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
})