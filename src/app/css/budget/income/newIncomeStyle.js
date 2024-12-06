import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b5b5b575',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
    },
    box: {
        backgroundColor: 'white',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
        overflow: 'hidden'
    },
    header: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#666666'
    },
    month: {
        fontStyle: 'italic'
    },
    inputComponent: {
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        margin: 8
    },
    input: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 3,
        alignItems: 'center',
        borderWidth: 0.5,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        overflow: 'hidden',
        borderColor: '#808080',
        height: 45,
    },
    inputName: {
        padding: 5,
        backgroundColor: '#e6e6e6',
        width: 80,
        height: '100%',
        justifyContent: 'center'
    },
    inputName_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#004d33'

    },
    inputValue: {
        fontSize: 18,
        flex: 1,
        paddingLeft: 3
    },
    dateComponent: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    selectDate: {
        fontSize: 16,
        marginHorizontal: 10,
        height: 30,
        width: 80,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00cc88',
    },
    select_text: {
        inputIOS: {
            textAlign: 'center',
            height: '100%',
            width: '100%',
            fontWeight: '500',
            fontSize: 16
        }

    },
    buttonComponent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 3,
    },
    touch: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        borderRadius: 5,
        marginBottom: 5,
    },
    touch_left: {
        borderTopEndRadius: 30,
        backgroundColor: '#008040',
    },
    touch_text: {
        fontWeight: '500',
        fontSize: 16,
    },
    touch_text_left: {
        color: 'white'
    },
})