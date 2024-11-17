import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '../components/container'
import Header from '../components/Header'
import { RatingHeader } from '../components/Rating'

const isActive = true;
const WriteReview = () => {
    const [rating, setRating] = React.useState(2)
    const [review, setReview] = React.useState("")
    const [clickId, setClickId] = React.useState(0)
    const onChangeText = (text) => {
        setReview(text)
    }
    const handlePress = (item, id) => {
        setClickId(id)

    }
    const Choises = [
        "Yes",
        "Not Sure",
        "No"
    ]


    return (
        <Container>
            <Header text="Rate Our Service"></Header>
            <RatingHeader ratings={rating}  ></RatingHeader>
            <Text style={styles.text1} >Tell others what you think</Text>
            <View style={styles.card}>

                <Text style={styles.text2} >Write A Review</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={review}
                />
            </View>
            <Text style={styles.text1} >Tell Us More (Optional)</Text>
            <View style={styles.card2}>
                <Text style={{ position: "absolute", top: 20, right: 18, fontSize: 15, fontWeight: "500", color: "white" }}>Clear</Text>
                <Text style={styles.text2} >Do you spend more time in this app than expected?</Text>
                <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginTop: 15 }}>


                    {
                        Choises.map((item, index) => {
                            return (<TouchableOpacity key={index} style={[
                                index === clickId ? styles.button : styles.buttonActive,

                            ]

                            } onPress={(item) => handlePress(item, index)}><Text style={styles.text5}>{item}</Text></TouchableOpacity>

                            )
                        })
                    }


                </View>
            </View>
        </Container>
    )
}

export default WriteReview

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 210,
        backgroundColor: "#414040",
        borderRadius: 10,
        marginVertical: 10,

        padding: 20
    },
    button: {

        backgroundColor: '#BF700F',

        padding: 8,
        borderRadius: 20,
        minWidth: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonActive: {

        backgroundColor: 'rgba(255, 255, 255, 0.2)',

        padding: 8,
        borderRadius: 20,
        minWidth: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    text5: {
        color: "white",
        fontSize: 14,
    },
    click: {
        backgroundColor: "#FFD700",
    },
    card2: {
        width: "100%",
        height: 130,
        backgroundColor: "#414040",
        borderRadius: 10,
        marginVertical: 10,
        padding: 20,
        paddingRight: 50
    }, input: {
        width: "100%",
        height: 130,
        borderColor: "white",
        marginVertical: 10,
        borderStyle: 'dotted',
        borderWidth: 1.5,
        padding: 10,
        color: "white",
        borderRadius: 1,
    },
    text1: {
        fontSize: 17,
        marginVertical: 10,
        color: "white",
        fontWeight: "900"
    },
    text2: {
        fontSize: 15,
        letterSpacing: 0.5,
        color: "white",
    }

})