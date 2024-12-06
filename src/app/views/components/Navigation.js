import React, { useState, useRef } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, ImageBackground, StyleSheet, Button, PanResponder, Dimensions } from 'react-native';
import { Foundation, AntDesign, Ionicons, Feather,FontAwesome6 } from '@expo/vector-icons';
import { styles } from '../../css/navigationStyle';

import pageNavigation from '../../../utils/pageNavigation';

const Navigation = () => {
    const { navigateToProfile, navigateToBudget, navigateToOverview, navigateToSetting } = pageNavigation();


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonForm} >
                <AntDesign name="clockcircleo" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonForm} onPress={navigateToBudget}  >
                <Foundation name="clipboard-notes" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonForm} onPress={navigateToProfile}   >
                <Feather name="user" size={38} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonForm} onPress={navigateToOverview}>
                <FontAwesome6 name="uncharted" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonForm} onPress={navigateToSetting} >
                <AntDesign name="setting" size={26} color="black" />
            </TouchableOpacity>
        </View>
    )
}
export default Navigation;