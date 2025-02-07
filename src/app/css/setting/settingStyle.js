import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#f2f2f2",
    },
    main: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginHorizontal: 14,
        fontWeight: "400",
        color: "#b3b3b3",
        paddingBottom: 20,
    },
    header: {
        borderBottomWidth: 0.5,
        paddingVertical: 10,
    },
    header_title: {
        fontSize: 17,
        fontWeight: "500",
        color: "#008040",
    },
    option: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    option_name: {
        fontSize: 17,
    },
    option_value: {
        fontSize: 13,
        color: "#a6a6a6",
    },
    btn_logout: {
        fontSize: 16.6,
        paddingVertical: 5,
    },
})

export default styles