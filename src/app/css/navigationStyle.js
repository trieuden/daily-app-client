import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container :{
        width: "100%",
        height: '10%',
        backgroundColor: "#e6fff7",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        paddingBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
    },
    buttonForm: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'20%'
    },
    title: {
        fontSize: 15
    }
})