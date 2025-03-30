import React, { useState, useMemo } from "react";
import { View, StyleSheet, Text, SectionList, TouchableOpacity, Switch, Modal } from "react-native";

import { FontAwesome6, AntDesign, MaterialIcons, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../css/setting/SettingStyle";
import SettingController from "../../controller/setting/SettingController";

import { useTranslation } from "react-i18next";

import LanguageModal from "./LanguageModal";

const Setting = ({ setKey }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const [modalVisible, setModalVisible] = useState(false);
    const [currentModal, setCurrentModal] = useState("language");

    const {t} = useTranslation()

    const {actionLogout} = SettingController()

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenLanguageModal = () => {
        setCurrentModal("language");
        setModalVisible(true);
    };

    const renderModal = useMemo(() => {
        switch (currentModal) {
            case "language":
                return <LanguageModal onCloseModal={handleCloseModal} />;
            default:
                break;
        }
    }, [modalVisible]);
    
    return (
        <SectionList
            sections={[{ title: "Main", data: [{}] }]}
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
            renderItem={() => (
                <View style={styles.main}>
                    <Text style={styles.title}>{t("Setting_title")}</Text>
                    <View style={styles.header}>
                        <Text style={styles.header_title}>{t("Preferences_title")}</Text>
                    </View>
                    <TouchableOpacity style={styles.option}>
                        <View>
                            <Text style={styles.option_name}>{t("Theme_title")}</Text>
                            <Text style={styles.option_value}>{t("Light_title")}</Text>
                        </View>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.option}>
                        <View>
                            <Text style={styles.option_name}>{t("Notification_title")}</Text>
                            <Text style={styles.option_value}>{t("On_title")}</Text>
                        </View>
                        <Switch
                            trackColor={"#81b0ff"}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#e6e6e6"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                        />
                    </View>
                    <TouchableOpacity style={styles.option} onPress={() => handleOpenLanguageModal()}>
                        <View>
                            <Text style={styles.option_name}>{t("Language_title")}</Text>
                            <Text style={styles.option_value}>{t("Language_value_title")}</Text>
                        </View>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Text style={styles.header_title}>{t("About_title")}</Text>
                    </View>
                    <TouchableOpacity style={styles.option}>
                        <View>
                            <Text style={styles.option_name}>Daily app</Text>
                            <Text style={styles.option_value}>v1.0</Text>
                        </View>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.btn_logout, { color: "red" }]} onPress={ async () => await actionLogout(setKey)}>
                            {t("Logout_title")}
                        </Text>
                    </View>
                    <Modal animationType="fade" transparent={true} visible={modalVisible}>
                        {renderModal}
                    </Modal>
                </View>
            )}
        />
    );
};

export default Setting;

