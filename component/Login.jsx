import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (name.length === 0 || age.length === 0) {
      Alert.alert("Empty credentials submitted");
    } else {
      try {
        const user = {
          Name: name,
          Age: age,
        }
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem("UserData", jsonValue);
        navigation.navigate("Home");
      } catch (error) {
        console.log('Error saving data:', error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        value={name}
        placeholder="Name"
        onChangeText={(value) => setName(value)}
        style={styles.input}
      />
      <TextInput
        value={age}
        placeholder="Age"
        onChangeText={(value) => setAge(value)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.btn} onPress={setData}>
        <Text style={styles.txt}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 45 : 0,
    paddingHorizontal: 20,
    display: "flex",
    gap: 20,
  },
  header: {
    fontSize: 30,
    fontStyle: 'italic',
    textAlign: "center",
    fontWeight: '400'
  },
  input: {
    width: 300,
    paddingVertical: 20,
    paddingLeft: 20,
    borderColor: "blue",
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: "center"
  },
  btn: {
    backgroundColor: "violet",
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    borderRadius: 5,
    width: 200,
    alignSelf: "center"
  },
  txt: {
    textAlign: "center",
    fontSize: 20,
  }
});
