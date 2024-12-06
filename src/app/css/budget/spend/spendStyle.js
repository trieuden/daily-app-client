import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    spend_date: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'#e6fff2',
        borderColor:'#99ffcc',
        borderWidth:1,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    
    spend_date_text: {
        fontSize: 16,
    },
    spend_date_total: {
        fontSize: 16,
        fontWeight:'600',
        color:'#009999'
    },
    spendItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#cccccc',
        marginTop: 3,
        padding: 10,
    },
    spend_name: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    spend_name_text: {
        fontSize: 16,
        marginLeft: 5,
        color: '#009966',
        fontWeight: '600',
    },
    spend_price: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    spend_price_text: {
        fontSize: 16,
        marginRight: 4
    }
})