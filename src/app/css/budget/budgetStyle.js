import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    buttonComponent: {
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#e6e6e6',
        padding: 2,
        borderRadius: 5
    },
    button: {
        height: 35,
        width: 98,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#e6e6e6',
        borderRadius: 5
    },
    button_text: {
        fontWeight: 'bold',
    },
})
