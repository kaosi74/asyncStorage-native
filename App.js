import { StatusBar } from "expo-status-bar";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./component/HomeScreen.jsx";
import Login from "./component/Login";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("UserData").then((value) => {
        if (value != null) {
          let user = JSON.parse(value);
          setName(user.Name);
          setAge(user.Age);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert("Warning!", "Please enter your name");
    } else {
      try {
        await AsyncStorage.setItem("UserData", name);
        Alert.alert("Success, your data has been updated.");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("UserData");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome {name} </Text>
      <Text style={styles.heading}>You are {age} </Text>
      <View>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter your name"
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          style={styles.input}
          value={age}
          placeholder="Enter your age"
          onChangeText={(value) => setAge(value)}
        />
      </View>
      <View style={styles.flx}>
        <TouchableOpacity onPress={updateData} style={styles.btn}>
          <Text style={styles.txt}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={removeData}
          style={[styles.btn, styles.btn2]}
        >
          <Text style={styles.txt}>Delete</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  heading: {
    fontSize: 25,
    // marginVertical: 30,
  },
  input: {
    width: 300,
    paddingVertical: 20,
    paddingLeft: 20,
    borderColor: "blue",
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: "center",
    marginBottom: 7,
  },
  flx: {
    display: "flex",
    marginTop: 10,
    gap: 20,
  },
  btn: {
    backgroundColor: "violet",
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    borderRadius: 5,
    width: 200,
    alignSelf: "center",
  },
  btn2: {
    backgroundColor: "red",
  },
  txt: {
    textAlign: "center",
  },
});
