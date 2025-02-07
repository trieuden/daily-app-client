import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        paddingBottom: 5
    },
    buttonComponent: {
        display:'flex',
        flexDirection:'row',
        backgroundColor:'white',
        padding: 2,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
    },
    button: {
        height: 35,
        width: 98,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 5
    },
    button_text: {
        fontWeight: 'bold',
    },
})
