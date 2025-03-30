import react from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import i18next from "../../../../services/i18next";

import { styles } from "../../css/setting/LanguageModalStyle";

const LanguageModal = ({ onCloseModal }) => {
    const changeLanguage = (lng) => {
        Alert.alert("Xác nhận", "Bạn có chắc chắn muốn thay đổi?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Lưu",
                onPress: () => {
                    i18next.changeLanguage(lng);
                    onCloseModal(false);
                },
            },
        ]);
    };
    return (
        <View>
            <TouchableOpacity
                style={styles.outSite}
                onPress={() => {
                    onCloseModal(false);
                }}
            ></TouchableOpacity>
            <View style={styles.box}>
                <Text style={styles.title}>Change language</Text>
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => changeLanguage("en")}>
                        <Text style={styles.options}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeLanguage("vi")}>
                        <Text style={styles.options}>Tiếng việt</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default LanguageModal;


