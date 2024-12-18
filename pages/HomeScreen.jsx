import {React, useState, useEffect, useCallback} from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, FlatList, Button } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = ({navigation}) => {
  const [entries, setEntries] = useState([]);
  const loadEntries = async() => {
    try{
      const storedEntries = await AsyncStorage.getItem('entries');
      if(storedEntries !== null){
        setEntries(JSON.parse(storedEntries));
      }
    }catch(error){
      console.error("목록을 가져오는데 실패했습니다." + error);
    }
  }

  const clearAllData = async() => {
    try{
      await AsyncStorage.clear();
      console.log("모든 데이터가 삭제됨")
    }catch(error){
      console.log("에러", error);
    }
  }

 useFocusEffect(
    useCallback(() => {
      loadEntries();
  }, [])
);

  const renderEmptyContent = ()=>(
    <View style={styles.emptyView}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Write")}>
        <Text style={styles.buttonText}>메모</Text>
      </TouchableOpacity>
      <ImageBackground source={require('../assets/free-icon-burger-1037762.png')} style={styles.image}>
        <Text style={styles.blankText}>내용이 존재하지 않습니다.</Text>
      </ImageBackground>
    </View>
  )
  return (
    <SafeAreaView style={styles.container}>
      {
        (entries.length === 0) ? (renderEmptyContent())
        : <ScrollView>
            <View style={{width: '100%', alignItems: 'center'}}>
              <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Write")}>
                <Text style={styles.buttonText}>메모</Text>
              </TouchableOpacity>
            </View>
            <FlatList data={entries}
                      numColumns={2}
                      renderItem={({item})=>(
                        <TouchableOpacity 
                          style={[styles.Items, {backgroundColor:item.backgroundColor}]}
                          onPress={()=>navigation.navigate("Detail", {entry: item})}>
                          <Text>{item.title}</Text>
                          <Text style={{fontSize:12}}>작성일 : {item.date}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item,index) => index.toString()} />
            <Button onPress={clearAllData} title="전체삭제" />
          </ScrollView>
      }
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0
  },
  emptyView: {
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  image: {
    justifyContent : 'center',
    alignItems : 'center',
    width : 300,
    height : 300
  },
  blankText: {
    fontSize : 20,
    fontWeight : 'bold',
    color : '#fff'
  },
  button: {
    backgroundColor : '#253764',
    paddingVertical : 15,
    paddingHorizontal : 50,
    borderRadius : 30,
    alignItems : 'center',
    justifyContent : 'center',
    marginBottom : 50,
    width: '60%'
  },
  buttonText : {
    fontSize : 20,
    color : '#fff',
    fontWeight : 'bold'
  },
  Items: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15
  }
});