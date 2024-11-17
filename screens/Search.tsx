import React, { FC, useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { DataQ, DataQuery } from '../data/data';
// import 
import { Searchbar } from "react-native-paper";
import Container from '../components/container';
import Header from '../components/Header';


const Search: FC = () => {
  const [dataQuery, setDataQuery] = useState<DataQ[] | null>(null)


  useEffect(() => {
    (() => {
      setDataQuery(dataQuery)
    })()
  }, [])


  const handleSearch = (text: string) => {
    const dataQuery: DataQ[] = DataQuery.filter((data) => data.query.toLowerCase().includes(text.toLowerCase()))
    setDataQuery(dataQuery)
  }


  return (
    <Container>
      <Header text="Search"></Header>
      <View style={styles.inputContainer}>
        <Feather name="search" size={20} color="orange" />
        <TextInput style={styles.inputText} placeholderTextColor="#7D7D7D" placeholder='search'
          onChangeText={text => handleSearch(text)} />
      </View>
      {dataQuery?.length === 0 ? <View style={styles.query}><Text style={styles.queryText}>No results Found</Text></View> : <FlatList style={styles.query} data={dataQuery} renderItem={({ item }) => (<Text style={styles.queryText}>{item.query}</Text>)} />}
    </Container>



  )
}

export default Search

const styles = StyleSheet.create({
  arrowIcon: {
    color: "white",
    marginHorizontal: 8,
    marginVertical: 4
  },
  searchBox: {
    height: 40,
    borderRadius: 50,
    color: "#FF7E00",
    marginVertical: 20,
  },
  cont1: {
    position: 'absolute', top: 80, left: 20, right: 20
  },
  gradient: {
    width: "100%",
    height: "100%"
  },
  inputContainer: {
    borderRadius: 20,
    paddingHorizontal: 8,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

  },
  inputText: {
    outlineStyle: 'none',
    fontSize: 15,
    backgroundColor: "white",
    width: "90%",
    marginLeft: 8,
    marginVertical: 4,
    paddingHorizontal: 4
  },
  query: {
    marginHorizontal: 30,
    marginTop: 10,
    zIndex: 999
  },
  queryText: {
    color: "white",
    backgroundColor: "#5A5858",
    marginBottom: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  }

})
