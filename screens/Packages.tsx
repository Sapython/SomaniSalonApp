import { StyleSheet, Text, View,Image,ScrollView ,TouchableOpacity} from 'react-native'
import React ,{useState,useEffect}from 'react'
import Container from '../components/container'
import Header from '../components/Header'
import { getPackageData } from '../firebaseServices'
import Loader from './Loader'

import { AntDesign } from "@expo/vector-icons";
const Packages = ({route,navigation}:any) => {
    const [pack, setPack] = useState({})
    const [loading, setLoading] = useState(true)
    const next = () => {
      
     
            let service =  {
                type:"combo",
               ServiceName:pack.name,
               desc: pack.name,
               id:pack.id,
               names:pack.services,
               amount:pack.amount,
             }
       console.log(service)
       navigation.navigate("popularStylist",{data:{service:service}})
    };
          
    
    
    useEffect(() => {
       
        console.log(pack)
        getPackageData(route.params.id).then((res:any) => {
            console.log("i am res")
            setPack(res)
            setLoading(false)
        }
        )
        console.log("i am paxk")
        console.log(pack)
    
    }, [loading])

  return (
    <Container>
        <Header text="Packages"></Header>
       {
    !loading? <ScrollView>
    <Text
    style={{fontSize:20,color:"white",textAlign:"center",padding:10,fontWeight:"bold",
    fontFamily: "Montserrat_600SemiBold"}}
    >{pack.name}</Text>
 
           
    {
        pack?.services.map((item,index)=>{
            return(
<View
                key={1}
                style={{
                  height: 230,
                  width: 310,
                  marginRight: 10,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginVertical:5,
                  flexWrap: "wrap",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    height: "70%",
                    width: "100%",
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10,
                  }}
                ></Image>
               
                <View
                  style={{
                   
                    width: "100%",
                    borderBottomRightRadius:10,
                    borderBottomLeftRadius:10,
                    height: "25%",
                    padding: 10,
                    display:"flex",
                    alignItems:"center",
                    flexDirection:"row",
                    justifyContent:"space-between",
                    backgroundColor: "#211201",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: "#fff",
                      padding: 5,
                    }}
                  >
                   {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                      padding: 5,
                    }}
                  >+
                  </Text>


                </View>
              </View>
            )
        })
    }
      <TouchableOpacity
          style={styles.toggleService}
          onPress={() => next()}
        >
          <Text style={{ fontSize: 19, color: "#FF7E00" }}>Select Stylist</Text>
          <AntDesign
            style={{ fontSize: 18, color: "#FF7E00", marginLeft: 15 }}
            name="right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
    </ScrollView>
    
    :<Loader></Loader>
       }
        
      
    </Container>
  )
}

export default Packages

const styles = StyleSheet.create({
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

})