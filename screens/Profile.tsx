import React, { FC, useState, useCallback, useEffect } from "react";
import {
  Modal,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import Container from "../components/container";
import Header from "../components/Header";
import { updateUserData, UserData } from "../firebaseServices";

const Profile: FC = () => {
  const [cameraModal, setCameraModal] = useState<boolean>(false);
  const [cameraModalActions, setCameraModalActions] = useState<string>("");
  const [cameraModalActionsBoolean, setCameraModalActionsBoolean] =
    useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [username, setUserName] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [pwdType, setPwdType] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);



  interface User {
    username: string;
    fullName: string;
    email: string;
    dob: number,
    photoURL: string,
    mobileNumber: number,
    password: string,
    gender: string,
    uid: string,
    id:string
  }





  const saveData = () => {
    // setEditable(false);

    // console.log(userData);
// console.log(UserData.uid);
    setModal(true);
    // updateUserData(UserData.uid,userData);




  }
  const save = () => {
    try {
    
    updateUserData(UserData.id,userData);
    setModal(false);
    setEditable(false);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(UserData);
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ Montserrat_600SemiBold, Montserrat_500Medium });
        setUserData({
          username: UserData.first,
          fullName: UserData.first + " " + UserData.last,
          email: UserData.email,
          dob: UserData.dob,
          photoURL: UserData.photoURL,
          mobileNumber: UserData.mobileNumber,
          password: UserData.password,
          gender: 'flead',
          id:UserData.id,
          uid: UserData.uid,
        });
      } catch {
        // handle error
      } finally {
        setFontLoaded(true);
      }
    })();
  }, [userData]);

  const [userData, setUserData] = useState<User>({
    username: "",
    fullName: "",
    email: "",
    dob: 0,
    photoURL: "",
    mobileNumber: 0,
    password: "",
    gender: "",
    id:"",
    uid:"",
  });
  
  const editEnable = () => {
    setEditable(true);
  }

  const onLayout = useCallback(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);
  if (!fontLoaded) {
    return null;
  }
  return (
    <Container>
      <Header text="Profile"></Header>
      <ScrollView

        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Image
            source={require("../assets/profile.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 4,
              borderColor: "#FFE2AC",
            }}
          />
          <Pressable
            onPress={() => setCameraModal(true)}
            style={{
              borderColor: "yellow",
              backgroundColor: "#FFA334",
              borderRadius: 4,
              position: "absolute",
              right: 10,
              bottom: 1,
              paddingHorizontal: 4,
              paddingVertical: 2,
            }}
          >
            <Feather name="camera" size={12} color="white" />
            {cameraModal && (
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={cameraModal}
                >
                  <BlurView
                    intensity={90}
                    tint="default"
                    style={styles.blurContainer}
                  >
                    <View
                      style={[
                        styles.centeredView,

                        {
                          position: "absolute",
                          width: "100%",
                          top: 180,
                          display: "flex",

                          alignSelf: "center",
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.modalView,
                          {
                            paddingHorizontal: 18,
                            paddingVertical: 10,
                            alignItems: "flex-start",
                          },
                        ]}
                      >
                        <Text style={styles.modalText}>Profile Photo</Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "80%",
                            marginTop: -19,
                          }}
                        >
                          <Pressable
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Pressable
                              style={{
                                backgroundColor: "#FFA334",
                                borderRadius: 4,
                                paddingHorizontal: 6,
                                paddingVertical: 4,
                              }}
                            >
                              <Feather
                                name="camera"
                                size={20}
                                color="white"
                              />
                            </Pressable>
                            <Text style={styles.iconText}>Camera</Text>
                          </Pressable>
                          <Pressable
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Pressable
                              style={{
                                backgroundColor: "#FFA334",
                                borderRadius: 4,
                                paddingHorizontal: 6,
                                paddingVertical: 4,
                              }}
                            >
                              <AntDesign
                                name="picture"
                                size={20}
                                color="white"
                              />
                            </Pressable>
                            <Text style={styles.iconText}>Gallery</Text>
                          </Pressable>
                          <Pressable
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Pressable
                              onPress={() => {
                                setCameraModalActions("remove");
                                setCameraModalActionsBoolean(true);
                              }}
                              style={{
                                backgroundColor: "#FFA334",
                                borderRadius: 4,
                                paddingHorizontal: 6,
                                paddingVertical: 4,
                              }}
                            >
                              <AntDesign
                                name="delete"
                                size={20}
                                color="white"
                              />
                            </Pressable>
                            <Text style={styles.iconText}>Remove</Text>
                            {cameraModalActions === "remove" &&
                              cameraModalActionsBoolean && (
                                <View>
                                  <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={cameraModal}
                                  >
                                    <BlurView
                                      intensity={90}
                                      tint="default"
                                      style={styles.blurContainer}
                                    >
                                      <View
                                        style={[
                                          styles.centeredView,
                                          {
                                            position: "absolute",
                                            width: "100%",
                                            top: 180,
                                            display: "flex",
                                            alignSelf: "center",
                                          },
                                        ]}
                                      >
                                        <View
                                          style={[
                                            styles.modalView,
                                            {
                                              paddingHorizontal: 18,
                                              paddingVertical: 10,
                                              alignItems: "flex-start",
                                            },
                                          ]}
                                        >
                                          <Text style={styles.modalText}>
                                            Profile Photo
                                          </Text>
                                          <View
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              width: "100%",
                                              marginTop: -19,
                                            }}
                                          >
                                            <Pressable
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "100%",
                                                alignItems: "flex-start",
                                              }}
                                            >
                                              <Pressable
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <AntDesign
                                                  style={{
                                                    backgroundColor:
                                                      "#FFA334",
                                                    borderRadius: 4,
                                                    paddingHorizontal: 6,
                                                    paddingVertical: 4,
                                                  }}
                                                  name="delete"
                                                  size={20}
                                                  color="white"
                                                />
                                                <Text style={styles.iconText}>
                                                  Remove
                                                </Text>
                                              </Pressable>
                                              <View
                                                style={{
                                                  display: "flex",
                                                  width: "100%",
                                                  flexDirection: "row",
                                                  justifyContent:
                                                    "space-between",
                                                  marginTop: 10,
                                                }}
                                              >
                                                <Pressable
                                                  onPress={() =>
                                                    setCameraModalActionsBoolean(
                                                      false
                                                    )
                                                  }
                                                  style={{
                                                    backgroundColor:
                                                      "#FFA500",
                                                    paddingVertical: 12,
                                                    paddingHorizontal: 18,
                                                    borderRadius: 6,
                                                  }}
                                                >
                                                  <Text
                                                    style={{
                                                      fontFamily:
                                                        "Montserrat_500Medium",
                                                      fontSize: 18,
                                                    }}
                                                  >
                                                    Cancel
                                                  </Text>
                                                </Pressable>
                                                <Pressable
                                                  style={{
                                                    backgroundColor:
                                                      "#FFA500",
                                                    paddingVertical: 12,
                                                    paddingHorizontal: 18,
                                                    borderRadius: 6,
                                                  }}
                                                >
                                                  <Text
                                                    style={{
                                                      fontFamily:
                                                        "Montserrat_500Medium",
                                                      fontSize: 18,
                                                    }}
                                                  >
                                                    Remove
                                                  </Text>
                                                </Pressable>
                                              </View>
                                            </Pressable>
                                          </View>
                                        </View>
                                      </View>
                                    </BlurView>
                                  </Modal>
                                </View>
                              )}
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </BlurView>
                </Modal>
              </View>
            )}
          </Pressable>
          <Pressable

          >
            {
              !editable ? <Pressable onPress={editEnable}>

                <Text
                  style={{
                    backgroundColor: "#FFA500",
                    textAlign: "center",
                    paddingVertical: 6,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    marginTop: 10,
                    fontFamily: "Montserrat_500Medium",
                  }}
                >
                  Edit Profile
                </Text>
              </Pressable> : ''

            }

          </Pressable>
        </View>

        {
          !editable ?
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: "#FF8C00", fontWeight: '700', fontSize: 15 }}>User Name</Text>
              <Text
                style={styles.inputArea2}

              >{userData.username} </Text>
              <Text style={{ color: "#FF8C00", fontWeight: '700', fontSize: 15 }}>Full Name</Text>

              <Text
                style={styles.inputArea2}

              >{userData.fullName}</Text>
              <Text style={{ color: "#FF8C00", fontWeight: '700', fontSize: 15 }}>Email</Text>

              <Text
                style={styles.inputArea2}

              >{userData.email} </Text>

              <Text style={{ color: "#FF8C00", fontWeight: '700', fontSize: 15 }}>Phone Number </Text>


              <Text
                style={styles.inputArea2}


              >{userData.mobileNumber ? userData.mobileNumber : "N/A"} </Text>
              <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexDirection: 'row' }}>
                <View style={{ width: "45%" }}>
                  <Text style={{ color: "#FF8C00", fontWeight: '700', fontSize: 15 }}>D.O.B</Text>

                  <Text
                    style={styles.inputArea2}

                  >{userData.dob ? userData.dob : 'N/A'}</Text>
                </View>
                <View style={{ width: "45%" }}>
                  <Text style={{ color: "#FF8C00", fontWeight: '700', fontSize: 15 }}>Gender</Text>
                  <Text
                    style={styles.inputArea2}


                  >{userData.gender ? userData.gender : 'N/A'} </Text>
                </View>
              </View>

            </View> :
            <View style={{ marginTop: 30 }}>
              <TextInput
                style={styles.inputArea}
                value={userData.username}
                onChangeText={(text) => setUserData({ ...userData, username: text })}
                placeholder="User Name"
              />
              <TextInput
                style={styles.inputArea}
                value={userData.fullName}
                onChangeText={(text) => setUserData({ ...userData, fullName: text })}
                placeholder="Full Name"
              />
              <TextInput
                style={styles.inputArea}
                value={userData.email}
                onChangeText={(text) => setUserData({ ...userData, email: text })}
                placeholder="Email "
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                }}
              >
                <TextInput
                  style={[styles.inputArea, { width: "100%" }]}
                  secureTextEntry={pwdType}
                  value={userData.password}
                  onChangeText={(text) => setUserData({ ...userData, password: text })}
                  placeholder="Password "
                />
                <Entypo
                  name="eye-with-line"
                  onPress={() => setPwdType(!pwdType)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "37.5%",
                    color: "#978B8B",
                  }}
                  size={18}
                  color="black"
                />
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Pressable
                  onPress={() => { setGender("female"); setUserData({ ...userData, gender: "male" }) }}
                  style={{ width: "30%" }}
                >
                  <Text
                    style={[
                      styles.inputArea,
                      { textAlign: "center" },
                      gender === "female"
                        ? { backgroundColor: "#FF8C00" }
                        : { backgroundColor: "#FFF4E0" },
                    ]}
                  >
                    Female
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => { setGender("male"); setUserData({ ...userData, gender: "female" }) }} style={{ width: "30%" }}
                >
                  <Text
                    style={[
                      styles.inputArea,
                      { textAlign: "center" },
                      gender === "male"
                        ? { backgroundColor: "#FF8C00" }
                        : { backgroundColor: "#FFF4E0" },
                    ]}
                  >
                    Male
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => { setGender("others"); setUserData({ ...userData, gender: "others" }) }} style={{ width: "30%" }}
                >
                  <Text
                    style={[
                      styles.inputArea,
                      { textAlign: "center" },
                      gender === "others"
                        ? { backgroundColor: "#FF8C00" }
                        : { backgroundColor: "#FFF4E0" },
                    ]}
                  >
                    Others
                  </Text>
                </Pressable>
              </View>
              <TextInput
                style={styles.inputArea}
                value={userData.mobileNumber}
                onChangeText={(text) => setUserData({ ...userData, mobileNumber: text })}
                placeholder="Mobile number"
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.inputArea}
                value={userData.Dob}
                value={userData.dob}
                onChangeText={(text) => setUserData({ ...userData, dob: text })}
                placeholder="Date of Birth"
                
                keyboardType="calendarEvent"
                
              />
            </View>
        }
        {
          editable ?

            <Pressable
              style={{
                backgroundColor: "#FFA500",
                paddingVertical: 6,
                paddingHorizontal: 30,
                borderRadius: 10,
                marginVertical: 20,
                alignSelf: "center",
              }}
              onPress={() => saveData()}
            >
              <Text
                style={{
                  fontFamily: "Montserrat_500Medium",
                }}
              >
                Save
              </Text>
            </Pressable>
            : ""
        }


        {/* modal */}

        {modal && (
          <View style={[styles.centeredView]}>
            <Modal animationType="slide" transparent={true} visible={modal}>
              <BlurView
                intensity={90}
                tint="default"
                style={styles.blurContainer}
              >
                <View style={[styles.centeredView]}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Do you wish to save the changes?
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "90%",
                      }}
                    >
                      <Pressable onPress={() => save()}>
                        <Text
                          style={{
                            fontFamily: "Montserrat_500Medium",
                            backgroundColor: "#FFA500",
                            borderRadius: 20,
                            paddingHorizontal: 30,
                            paddingVertical: 8,
                            color: "green",
                          }}
                        >
                          Yes
                        </Text>
                      </Pressable>
                      <Pressable onPress={() => setModal(!modal)}>
                        <Text
                          style={{
                            fontFamily: "Montserrat_500Medium",
                            backgroundColor: "#FFA500",
                            borderRadius: 20,
                            paddingHorizontal: 30,
                            paddingVertical: 8,
                            color: "red",
                          }}
                        >
                          No
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </BlurView>
            </Modal>
          </View>
        )}
      </ScrollView>

    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  gradient: {
    height: "100%",
    paddingHorizontal: 20,
  },
  arrowIcon: {
    color: "white",
    marginVertical: 4,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  inputArea2: {
    fontFamily: "Montserrat_500Medium",
    borderColor: "#FFF4E0",
    borderWidth: 1,

    paddingHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 15,
    color: "#FFF4E0",
  },
  headerText: {
    color: "white",
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
  },
  inputArea: {
    fontFamily: "Montserrat_500Medium",
    backgroundColor: "#FFF4E0",
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginVertical: 6,
    borderRadius: 12,
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "#FFF4E0",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#FFA500",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  modalText: {
    marginBottom: 35,
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Montserrat_500Medium",
  },
  iconText: {
    fontFamily: "Montserrat_600SemiBold",
    marginTop: 4,
  },
});
