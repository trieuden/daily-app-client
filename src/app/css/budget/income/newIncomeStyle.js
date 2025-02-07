import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingTop: 40
    },
    header: {
        paddingHorizontal: 10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 5,
        marginBottom: 20,
        alignItems:'center'
    },
    title: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#666666",

    },
    month: {
        fontStyle: "italic",
    },
    input_component: {
        padding: 10,
        borderRadius: 5,
        margin: 8,
    },
    input: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        marginVertical: 3,
        alignItems: "center",
        borderWidth: 0.5,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        overflow: "hidden",
        borderColor: "#808080",
        height: 45,
        marginBottom: 30
    },
    inputTitle: {
        padding: 5,
        width: 80,
        height: "100%",
        justifyContent: "center",
        borderRightWidth: 1
    },
    inputTitle_text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        color: "#004d33",
    },
    inputValue: {
        fontSize: 18,
        flex: 1,
        paddingLeft: 3,
    },
    date_component: {
        display: "flex",
        alignItems:'flex-end',
    },
    selectDate: {
        fontSize: 16,
        marginHorizontal: 10,
        height: 30,
        width: 80,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00cc88",
    },
    select_text: {
        inputIOS: {
            textAlign: "center",
            height: "100%",
            width: "100%",
            fontWeight: "500",
            fontSize: 16,
        },
    },
    buttonComponent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 3,
    },
    touch: {
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        width: '90%',
        borderRadius: 45,
        marginBottom: 5,
        backgroundColor: "#00b377",
    },
    touch_text: {
        fontWeight: "500",
        fontSize: 16,
        color: "white",
    },
});
