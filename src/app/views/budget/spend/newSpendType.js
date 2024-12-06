import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Text, TextInput, Image, Alert, Modal, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import SpendTypeController from "../../../controller/spendTypeController";
import useSpendTypes from "../../../../hook/useSpendTypes";

import { ConvertToBase64 } from "../../../../utils/convertToBase64";

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { captureRef } from 'react-native-view-shot';

import { styles } from "../../../css/budget/spend/newSpendTypeStyle";

const NewSpendType = ({ onCloseModal }) => {
    const [imageUri, setImageUri] = useState();
    const [base64Image, setBase64Image] = useState('');
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const iconRef = useRef(null);

    const { addSpendType } = useSpendTypes();

    //controlller
    const {NewSpendTypeAction} = SpendTypeController()

    const icons = ['home', 'star', 'heart', 'camera', 'bell', 'check', 'home', 'star', 'heart', 'camera', 'bell', 'check'];


    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }

        // Open image picker and allow the user to select an image
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);

            const base64 = await ConvertToBase64(uri);
            setBase64Image('data:image/jpg;base64,' + base64);

        }
        setSelectedIcon(null)
    };

    const handleNewSpendType = async () => {
        try {
            const imageLength = base64Image.length;
            var newSpendTypeAction = await NewSpendTypeAction(addSpendType, name, price, base64Image, imageLength);
            Alert.alert('App', newSpendTypeAction.value, [
                { text: 'OK' },
            ]);
            onCloseModal(false)

        } catch (error) {
            console.error(error);
        }
    };


    const handleIconSelect = async (iconName) => {
        setModalVisible(false);
        setSelectedIcon(iconName);

        setTimeout(async () => {
            if (iconRef.current) {
                try {
                    // Chụp lại ảnh của icon và chuyển thành base64
                    const uri = await captureRef(iconRef, {
                        format: 'png',
                        quality: 1,
                    });
                    const base64 = await ConvertToBase64(uri);
                    setBase64Image('data:image/png;base64,' + base64);
                } catch (error) {
                    console.error("Error capturing the icon:", error);
                }
            }
        }, 100);
        setImageUri(null)
    };


    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <Text style={styles.title}>New Spend Type</Text>
                </View>
                <View style={styles.inputComponent}>
                    <View style={[styles.input]}>
                        <View style={styles.inputName}>
                            <Text style={styles.inputName_text}>Name</Text>
                        </View>
                        <TextInput
                            style={styles.inputValue}
                            onChangeText={(value) => setName(value)}
                        />
                    </View>
                    <View style={styles.input}>
                        <View style={styles.inputName}>
                            <Text style={styles.inputName_text}>Price</Text>
                        </View>
                        <TextInput
                            style={styles.inputValue}
                            inputMode="numeric"
                            onChangeText={(value) => setPrice(value)}
                        />
                    </View>
                    <View style={styles.imageComponent}>
                        <View style={styles.chooseImageComponent}>
                            <TouchableOpacity style={styles.chooseIcon_touch} onPress={() => setModalVisible(true)}>
                                <View style={styles.icon_touch}>
                                    <MaterialCommunityIcons name="emoticon-outline" size={24} color="black" />
                                </View>
                                <Text style={styles.touch_text}>Choose Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.camera_touch} onPress={pickImage}>
                                <AntDesign name="camerao" size={25} color="black" />
                            </TouchableOpacity>
                        </View>
                        {imageUri && (
                            <Image
                                source={{ uri: imageUri }}
                                style={styles.image}
                            />
                        )}
                        {selectedIcon && (
                            <View ref={iconRef} collapsable={false} style={styles.image}>
                                <FontAwesome name={selectedIcon} size={140} color="#000" />
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.buttonComponent}>
                    <TouchableOpacity style={[styles.touch, styles.touch_left]} onPress={handleNewSpendType}>
                        <Text style={[styles.touch_text, styles.touch_text_left]}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={() => { onCloseModal(false) }}>
                        <Text style={styles.touch_text}>Exit</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modal}>
                        <View style={styles.modal_view}>
                            <Text style={styles.modal_title}>Choose Icon</Text>
                            <FlatList
                                data={icons}
                                keyExtractor={(item) => item}
                                numColumns={7}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleIconSelect(item)}>
                                        <FontAwesome name={item} size={33} color="#000" style={{ margin: 10 }} />
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.touch_close}>
                                <Text style={styles.touch_close_text}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default NewSpendType;

