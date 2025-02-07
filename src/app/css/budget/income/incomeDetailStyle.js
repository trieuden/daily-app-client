import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        height: '100%',
        backgroundColor: 'white',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    touch_back: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        width: 45,
        height: 45,
        borderRadius: 30,
        marginTop: 40,
        marginBottom: 20
    },
    content: {
        width: '100%',
        alignItems: 'center'
    },
    box: {
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        backgroundColor: 'white',
        borderRadius: 20
    },
    incomeTotal: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#009966'
    },
    incomeMonth: {
        color: '#999999',
        fontStyle: 'italic',
        marginBottom: 10
    },
    touch_newItem: {
        height: 40,
        width: '70%',
        backgroundColor: '#e6e6e6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    touch_text: {
        fontSize: 16,
        fontWeight: '500'
    },
    incomeItems: {
        width: '100%',
        paddingHorizontal: 13,
        marginTop: 20
    },
    income_detail_title: {
        fontSize: 18,
        fontWeight: '500',
        color: '#808080'
    },
    income_list: {
        paddingHorizontal: 5
    },
    incomeItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center'
    },
    incomeItem_title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#009966'
    },
    incomeItem_date: {
        fontSize: 13,
        fontStyle: 'italic',
        color: '#bfbfbf'
    },
    incomeItem_value: {
        fontSize: 16
    }
})