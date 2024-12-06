import React, { useState } from "react";
import { View, StyleSheet, Text, SectionList, TouchableOpacity, Switch } from "react-native";

import { FontAwesome6, AntDesign, MaterialIcons, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({ setKey }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const actionLogout = async () => {
        try {
            await AsyncStorage.setItem('currentAccount', '0');
            setKey(false)
        } catch (e) {

        }
    }
    return (
        <SectionList
            sections={[{ title: 'Main', data: [{}] }]}
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
            renderItem={() => (
                <View style={styles.main}>
                    <Text style={styles.title} >Setting</Text>
                    <View style={styles.header}>
                        <Text style={styles.header_title}>Preferences</Text>
                    </View>
                    <TouchableOpacity style={styles.option}>
                        <View>
                            <Text style={styles.option_name}>Theme</Text>
                            <Text style={styles.option_value}>Light</Text>
                        </View>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.option}>
                        <View>
                            <Text style={styles.option_name}>Notification</Text>
                            <Text style={styles.option_value}>On</Text>
                        </View>
                        <Switch
                            trackColor={'#81b0ff'}
                            thumbColor={'#f4f3f4'}
                            ios_backgroundColor="#e6e6e6"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                        />
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.header_title}>About</Text>
                    </View>
                    <TouchableOpacity style={styles.option}>
                        <View>
                            <Text style={styles.option_name}>Daily app</Text>
                            <Text style={styles.option_value}>v1.0</Text>
                        </View>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.btn_logout, { color: 'red' }]} onPress={() => actionLogout()} >Logout</Text>
                    </View>
                </View>
            )}
        />
    )
}

export default Setting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#f2f2f2',
    },
    main: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 24,
        marginHorizontal: 14,
        fontWeight: '400',
        color: '#b3b3b3',
        paddingBottom: 20
    },
    header: {
        borderBottomWidth: 0.5,
        paddingVertical: 10,
    },
    header_title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#008040'
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    option_name: {
        fontSize: 17,
    },
    option_value: {
        fontSize: 13,
        color: '#a6a6a6'
    },
    btn_logout: {
        fontSize: 16.6,
        paddingVertical: 5
    }
});