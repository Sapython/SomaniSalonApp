import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Container from '../components/container'
import Header from '../components/Header'

type Props = {}

const Offers = [
    "Enlighten Your Life With 20% off",
    "Let Light in & Enjoy 30% off",
    "Sunny Days, 20% Just for You",
    "Enlighten Your Life With 20% off",
    "Let Light in & Enjoy 30% off",
    "Sunny Days, 20% Just for You",
]

interface OfferObject {
    text: string
}

const OFFERS: OfferObject[] = Offers.map((text: string) => { return { text } })

const Notifications = (props: Props) => {
    return (
        <Container>
            <Header text="Notifications"></Header>
            <View style={styles.container11} >

                <View style={{
                    height: 90,
                    borderRadius: 10,
                    width: "100%",
                    position: "relative",

                }}>
                    <Image source={require("../assets/bg1.png")} resizeMode="cover" style={styles.image}>

                    </Image>
                    <View style={{ padding: 10 }}>

                        <Text style={{ color: "red", fontWeight: "500", fontSize: 17, opacity: 0.6 }}>Offers</Text>
                        <Text> Lorem ipsum dolor sit amet consectetur adipisicing elit. </Text>
                    </View>

                </View>
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    container11: {
        marginTop: "10%",
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        height: "100%",
        width: "100%",
        borderRadius: 10,
        position: "absolute",

    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});
export default Notifications