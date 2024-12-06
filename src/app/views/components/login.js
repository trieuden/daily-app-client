import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { styles } from "../../css/loginStyle";

import useUsers from "../../../hook/useUsers";

import loginController from "../../controller/loginController";

const Login = ({ setKey }) => {
    const [userList, setUserList] = useState(null);
    const { useUserList } = useUsers();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setUserList(useUserList);
    },[useUserList])


    const login = async () => {
        const loginHandle = loginController(username, password, userList);
        if(loginHandle.status == true){
            await AsyncStorage.setItem('currentAccount', loginHandle.value.toString());
            setKey(loginHandle.value);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.login_text}>Account</Text>
            <View style={styles.input}>
                <MaterialIcons name="account-balance-wallet" size={24} color="black" style={styles.icon_input} />
                <TextInput style={styles.text_input} onChangeText={(text) => setUsername(text)} />
            </View>
            <Text style={styles.login_text}>Password</Text>
            <View style={styles.input}>
                <Entypo name="dial-pad" size={24} color="black" style={styles.icon_input} />
                <TextInput secureTextEntry={true} style={styles.text_input} onChangeText={(text) => setPassword(text)} />
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.button_text}>Login</Text>
                </TouchableOpacity>
            </View>
            <Text>Forgot password?</Text>
            <View style={styles.connect_form}>
                <Text style={styles.connect_text}>Connect</Text>
                <View style={styles.connect_icons}>
                    <Entypo name="facebook" size={24} color="#1a8cff" style={styles.connect_icon} />
                    <AntDesign name="google" size={24} color="#ff3333" style={styles.connect_icon} />
                    <FontAwesome name="telegram" size={24} color="#3377ff" style={styles.connect_icon} />
                </View>
            </View>
        </View>
    );
}

export default Login;
