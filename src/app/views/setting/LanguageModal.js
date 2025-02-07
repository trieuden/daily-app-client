import react from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import i18next from "../../../../services/i18next";

const LanguageModal = ({ onCloseModal }) => {
    const changeLanguage = (lng) => {
        Alert.alert("Xác nhận", "Bạn có chắc chắn muốn thay đổi?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Đăng xuất",
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
                    <TouchableOpacity onPress={() => changeLanguage("vn")}>
                        <Text style={styles.options}>Tiếng việt</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default LanguageModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    outSite: {
        backgroundColor: "#cccccc75",
        height: "60%",
    },
    box: {
        height: "40%",
        padding: 24,
    },
    title: {
        fontWeight: "500",
    },
    content: {
        marginTop: 20,
        marginLeft: 5,
    },
    options: {
        fontSize: 16,
        marginTop: 15,
        padding: 5,
    },
});
