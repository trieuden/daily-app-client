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
    inputComponent: {
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        margin: 8
    },
    chooseImageComponent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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
        fontSize: 16,
        color: '#004d33'

    },
    inputValue: {
        fontSize: 18,
        flex: 1,
        paddingLeft: 3
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
        marginBottom: 5
    },
    touch_left: {
        borderTopEndRadius: 30,
        backgroundColor: '#008040',
    },
    touch_text: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    touch_text_left: {
        color: 'white'
    },
    imageComponent: {
        marginTop: 5,
    },
    chooseIcon_touch: {
        backgroundColor: 'white',
        padding: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        width: 140
    },
    icon_touch: {
        borderRadius: 35,
        backgroundColor: '#33ffbb',
        padding: 5,
        marginRight: 5
    },
    touch_text: {
        fontSize: 13,
        color: '#808080'
    },
    camera_touch: {
        marginLeft: 5
    },
    image: {
        height: 140,
        marginTop: 20,
        alignSelf: 'center',
    },
    modal: {
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    },
    modal_view: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        height: '90%'
    },
    modal_title: {
        fontSize: 20,
        marginBottom: 20,
        color: '#008040'
    },
    touch_close: {
        backgroundColor: '#00cc66',
        width: 130,
        alignSelf: 'center',
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touch_close_text: {
        fontSize: 16,
        color: 'white'
    }
});
