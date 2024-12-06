import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    total_view: {
        display: 'flex',
        alignItems: 'center'
    },
    total: {
        fontSize: 27,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#008055'
    },
    total_title: {
        marginBottom: 30,
        color: '#bfbfbf'
    },
    header: {
        display: 'flex',
        width: '97%',
        alignSelf: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        borderRadius: 20
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    section_title: {
        fontSize: 12
    },
    section_value: {
        fontSize: 18,
        fontWeight: '500'
    },
    touch_newIncome: {
        backgroundColor: '#00cc88',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 8
    },
    touch_title: {
        fontSize: 16,
        fontWeight: '500'
    },
    income_month: {
        width: '97%',
        alignSelf: 'center',
        padding: 5,
        marginTop: 20
    },
    income_month_title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#004d33'
    },
    income_list: {
    },
    income: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center'
    },
    total_month_value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#009966'
    },
    total_month_text: {
        fontSize: 13,
        fontStyle: 'italic',
        color: '#bfbfbf'
    },
    total_month_items: {
        fontSize: 14,
        marginRight: 20
    }
})