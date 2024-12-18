import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const DetailScreen = ({route, navigation}) => {
    const {entry} = route.params;
    const editEntry = () => {
        navigation.navigate("Write", {entry, isEditing: true})
    }
    const handleDelete = () => {
        Alert.alert(
            '삭제 확인',
            '정말로 삭제하시겠습니까?',
            [
                {
                    text: '취소',
                    style: 'cancel'
                },
                {
                    text: '삭제',
                    style: 'destructive',
                    onPress : async() => {
                        try{
                            const storedEntries = await AsyncStorage.getItem('entries');
                            const entries = storedEntries ? JSON.parse(storedEntries) : [];
                            const updateEntries = entries.filter(item => item.id !== entry.id);
                            await AsyncStorage.setItem('entries', JSON.stringify(updateEntries));
                            navigation.goBack();                       
                        }catch(error){
                            console.log("삭제 실패" + error)
                        }
                    }
                }
            ],
            {cancelable:false}
        )
    };
    
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={{alignItems: 'row'}}>
                <TouchableOpacity onPress={editEntry} style={styles.edit}>
                    <Text>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={styles.delete}>
                    <Text>삭제</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.textbox, {backgroundColor:entry.backgroundColor}]}>
                <Text style={styles.title}>{entry.title}</Text>
                <Text style={styles.date}>{entry.date}</Text>
                <Text>{entry.content}</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0
      },
    title: {
        width: '100%',
        fontSize: 25,
        fontWeight: 'bold',
        alignItems:'center',
        textAlign:'center',
        marginHorizontal: 10,
        borderBottomColor: '#333'
    },
    date: {
        fontSize: 15,
        textAlign: 'center',
        color: '#333',
        marginBottom: 10
    },
    textbox: {
        width: '100%',
        padding: 20,
        fontSize: 18
    }, 
    edit: {
        backgroundColor: 'yellow',
        width: 50,
        borderRadius: 5,
        padding: 5
    },
    delete: {
        backgroundColor: 'red',
        color: '#fff',
        width: 50,
        borderRadius: 5,
        padding: 5
    }
})