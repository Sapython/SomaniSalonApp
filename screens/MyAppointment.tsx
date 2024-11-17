import { View, Text, StyleSheet, Image, Alert, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '../components/container'
import Header from '../components/Header'
import { Feather } from '@expo/vector-icons';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
type MyAppointmentProps = {
    navigation: any

}

const MyAppointment = (props: MyAppointmentProps) => {

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ padding: 10, backgroundColor: 'white', width: "90%", marginHorizontal: 20, height: 180, borderRadius: 10 }}>
                    <Text style={{ fontSize: 20, paddingHorizontal: 15 }}>Are you sure you want to cancel
                        your appointmsswedwqrent?</Text>
                    <View style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>

                        <TouchableOpacity onPress={hideModal} style={{ backgroundColor: "#FFA500", padding: 10, paddingHorizontal: 40, borderRadius: 20 }}><Text>Yes</Text></TouchableOpacity>
                        <TouchableOpacity onPress={hideModal} style={{ backgroundColor: "#FFA500", padding: 10, paddingHorizontal: 40, borderRadius: 20 }}><Text>No</Text></TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
            <Container>

                <Header text=" Appointments"></Header>
                <View style={styles.card}>
                    <View style={{ backgroundColor: "#FFA500", height: 30, position: 'absolute', top: -30, left: -6, borderTopLeftRadius: 6, borderTopRightRadius: 50, width: 130 }}><Text style={{ color: "white", fontSize: 18, marginHorizontal: 20 }}>Upcoming</Text></View>
                    <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.image}></Image>
                    <View>
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>Dr. John Doe

                            {'\n'}
                            <Text style={{ color: "white", fontSize: 12, fontWeight: "200" }}  >June 24 | 3:30 AM</Text>
                        </Text>
                        <View style={styles.flexing}>


                            <Text onPress={() => { Linking.openURL('tel:12312312312'); }} style={{ color: "white", fontSize: 14, fontWeight: "500" }} > <Feather name="phone-call" size={14} color="white" /> Call</Text>
                            <TouchableOpacity onPress={showModal} ><Text style={{ color: "white", fontSize: 14, fontWeight: "400" }} >Cancel</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Text style={styles.text1}>Recent</Text>
                <View style={styles.card2}>
                    <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.image2}></Image>
                    <View style={styles.flexing2}>
                        <Text style={{ color: "white", fontSize: 22, fontWeight: "700" }}>Hair Cut

                            {'\n'}
                            <Text style={{ color: "white", fontSize: 12, fontWeight: "200" }}  >June 24 | 3:30 AM</Text>
                        </Text>
                        <Text style={{ textAlign: "right", marginTop: 20, fontSize: 17, color: "#FFA500", fontWeight: "600" }}>BOOK AGAIN</Text>

                    </View>
                </View>
                
                <View style={styles.card2}>
                </View>
            </Container>

        </Provider>
    )
}
const styles = StyleSheet.create({
    card: {
        height: 100,
        borderWidth: 6,
        borderBottomEndRadius: 10,
        borderColor: "#FFA500",
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        flexDirection: 'row'
    },
    card2: {
        height: 100,
        borderBottomEndRadius: 10,
        marginVertical: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: 'row'
    },
    image: {
        height: 70,
        width: 70,
        marginHorizontal: 10,
        borderRadius: 4,
    },
    image2: {
        height: 90,
        width: 90,
        borderRadius: 10,
    },
    flexing: {
        width: "65%",
        marginTop: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    flexing2: {
        width: "65%",

        marginHorizontal: 10
    },
    text1: {

        color: "white",
        fontSize: 20,
        fontWeight: "700",
        marginTop: 20

    }
})
export default MyAppointment