import {React, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, 
         Text, 
         StyleSheet, 
         TouchableOpacity, 
         ScrollView, 
         SafeAreaView, StatusBar, 
         TextInput,
         KeyboardAvoidingView,
         Platform
         } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const WriteScreen = ({navigation, route}) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date().toLocaleDateString('ko-KR'));
    const [content, setContent] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#fff");
    const [isEditing, setIsEditing] = useState(false);
    const [entryId, setEntryId] = useState(null);

    useEffect(()=>{
        if(route.params?.entry){
            const {entry} = route.params;
            setTitle(entry.title);
            setContent(entry.content);
            setIsEditing(route.params.isEditing || false);
            setEntryId(entry.id);
            setBackgroundColor(entry.backgroundColor || '#fff');
        }
    }, [route.params])

    const saveMemo = async() => {
        try{
            const newData = { id: entryId || Date.now(), date, title, content, backgroundColor}
            const storedEntries = await AsyncStorage.getItem('entries');
            const entries = storedEntries ? JSON.parse(storedEntries) : [];
            let updateEntries;
            if(isEditing){
                updateEntries = entries.map((item) => (item.id === entryId ? newData : item))
            }else{
                updateEntries = [...entries. newData];
            }
            await AsyncStorage.setItem('entries', JSON.stringify(updateEntries));
            navigation.goBack();
        }catch(error){
            console.error("메모를 저장하는 동안 문제가 발생했습니다. 다시 시도해주세요." + error);
        }
    }


  return (
    <SafeAreaView style={styles.safeAreaContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={{flex:1}}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>메모 작성</Text>
                <View style={styles.container}>
                    <Text>날짜 : {date}</Text>
                </View>
                <View style={styles.container}>
                    <TextInput placeholder='제목'
                                value={title}
                                onChangeText={setTitle} />
                </View>
                <View style={styles.container}>
                    <TextInput multiline
                                value={content}
                                placeholder='내용'
                                onChangeText={setContent}
                                style={{height: 100, textAlignVertical: 'top'}} />
                </View>
                <View style={styles.container}>
                    <Picker selectedValue={backgroundColor}
                            onValueChange={(itemValue)=>setBackgroundColor(itemValue)} >
                        <Picker.Item label="기본" value="#fff" />
                        <Picker.Item label="violet" value="#e8dff5" />
                        <Picker.Item label="pink" value="#fce1e4" />
                        <Picker.Item label="daisy" value="#fcf4dd" />
                        <Picker.Item label="sprout" value="#ddedea" />
                        <Picker.Item label="sky" value="#daeaf6" />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={saveMemo}>
                    <Text style={styles.buttonText}>저장</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default WriteScreen

const styles = StyleSheet.create({
    title: {
        width: '100%',
        fontSize: 25,
        fontWeight: 'bold',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomStyle: 'dashed',
        borderBottomColor:'#000',
        paddingBottom:10,
        textAlign:'center',
        marginBottom:30
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 30
    },
    safeAreaContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    container: {
        borderBottomWidth: 1,
        borderBottomStyle: 'dashed',
        borderBottomColor: '#999',
        paddingVertical: 10
    },
    picker: {
        fontSize: 20
    },
    button: {
        backgroundColor : '#7a9cff',
        paddingVertical : 15,
        paddingHorizontal : 50,
        borderRadius : 30,
        alignItems : 'center',
        justifyContent : 'center',
        marginBottom : 50,
        marginTop: 40
      },
      buttonText : {
        fontSize : 20,
        color : '#fff',
        fontWeight : 'bold'
      }
})