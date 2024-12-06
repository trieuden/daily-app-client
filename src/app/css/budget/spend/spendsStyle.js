import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'white'
    },
    values: {
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: 'white'
    },
    date_form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        margin: 15,
        marginRight: 0
    },
    moneySpent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 3,
        overflow: 'hidden',
        padding: 3,
        borderRadius: 30,
        borderColor: '#009966',
        borderBottomColor: '#00cca3'
    },
    moneySpent_input: {
        height: 35,
        width: 100,
        margin: 3,
        fontSize: 18
    },
    moneySpent_text: {
        fontSize: 17,
        color: 'gray',
    },
    spendTypes: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 15
    },
    spendTypesHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    spendTypesHeader_text: {
        fontSize: 20,
        marginRight: 10,
        color: '#006652'
    },
    spendTypeList_collapsed: {
        display: 'flex',
        flexDirection: 'row',
    },
    spendTypeList: {
        marginTop: 10,
        marginBottom: 5
    },
    spendType_view: {
        borderColor: '#00cc88',
        height: 70,
        width: 70,
        margin: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        padding: 3,
    },
    newSpendType_title: {
        fontSize: 36,
        textAlign: 'center',
        color: 'green',
        fontWeight: '500'
    },
    spendType_title: {
        fontSize: 16,
        height: 20,
        textAlign: 'center',
    },
    buttonSave: {
        borderColor: '#00cc88',
        borderWidth: 2,
        width: 100,
        marginVertical: 15,
        alignSelf: 'flex-end',
        borderRadius: 16,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderEndColor:'#006633',
        borderBottomColor:'#001a0d',
        backgroundColor:'#00cc88'
    },
    buttonSave_title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },
    spendDecription: {
        borderBottomWidth: 2.5,
        width: '80%',
        padding: 4,
        fontSize: 18,
        borderRadius: 2,
        borderColor: '#999999'
    },
    spendList: {
        width: '100%',
    },
})