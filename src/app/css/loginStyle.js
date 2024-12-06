import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: '40%',
        alignItems: 'center'
    },
    input: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 15,
        borderColor: 'gray',
        height: 45,
        width: '70%',
    },
    login_text: {
        fontSize: 16,
        padding: 3,
        fontStyle: 'italic',
        color: '#006652',
        width: '70%',
    },
    icon_input: {
        paddingHorizontal: 5
    },
    text_input: {
        width: 100,
        fontSize: 18,
        flex: 1,
    },
    button: {
        borderColor: '#00cc88',
        borderWidth: 1,
        width: 100,
        marginVertical: 15,
        borderRadius: 7,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b377',
    },
    button_text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14
    },
    connect_form: {
        alignItems: 'center',
        marginTop: 50,
    },
    connect_text: {
        color:'#006652',
        fontSize: 16
    },
    connect_icons: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 2,
    },
    connect_icon: {
        paddingHorizontal:3,
    }
})
