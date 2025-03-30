import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 30
    },
    title: {
        fontSize: 24,
        marginHorizontal: 24,
        fontWeight: '400',
        color: '#b3b3b3',
        marginTop: 24
    },
    main_chart: {
        backgroundColor: '#f2f2f2'
    },
    ov_this_month: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ov_this_month_title: {
        paddingHorizontal: 5,
        fontWeight: '500'
    },
    ov_this_month_value: {
        color: '#006644',
        fontSize: 16,
        fontWeight: 'bold'
    },
    box: {
        backgroundColor: 'white',
        margin: 20,
        padding: 15,
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
    },
    header_box: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header_box_title: {
        fontWeight: '500',
        fontSize: 16
    },
    header_box_time: {
        fontSize: 12,
        color: '#666666'
    },
    spend_7days: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20
    },
    spend_7days_total: {
        fontSize: 19,
        color: '#00994d',
        fontWeight: '600'
    },
    chart_7days: {
        display: 'flex',
        flexDirection: 'row'
    },
    chart_day: {
        display: 'flex',
        alignItems: 'center',
        marginHorizontal: 3
    }
})