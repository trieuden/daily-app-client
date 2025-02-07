import react, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, SectionList } from "react-native";

import { ProgressChart } from "react-native-chart-kit";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";

import useIncomes from "../../../hook/UseIncomes";
import useSpends from "../../../hook/UseSpends";

import useCurrentAccount from "../../../utils/UseCurrentAccount";
import OverviewController from "../../controller/OverViewController";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: '#f2f2f2',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#f2f2f2',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 5) => `rgba(175, 169, 169, ${opacity})`,
    useShadowColorFromDataset: false,
};

const Overview = () => {
    const [incomeMonth, setIncomeMonth] = useState([]);
    const [spendMonth, setSpendMonth] = useState([]);
    const [incomeMonthValue, setIncomeMonthValue] = useState(0);
    const [spendMonthValue, setSpendMonthValue] = useState(0);
    const [data7days, setData7days] = useState([]);
    const [remainIncomePercent, setRemainIncome] = useState(1)


    const { getIncomeByDate, useIncomeList, getIncomesByUserId } = useIncomes();
    const { getSpendByDate, getSpendByMonth, useSpendList } = useSpends()

    const currentAccount = useCurrentAccount()
    
    const {GetSpendsData7Days} = OverviewController()


    //controlller
    useEffect(() => {
        const fetchData = async () => {
            const incomes = await getIncomeByDate(new Date());
            setIncomeMonth(incomes);
            setIncomeMonthValue(incomes.total);

            const spends = await getSpendByMonth(new Date());
            spends.forEach(item => {
                setSpendMonthValue(spendMonthValue + item.total)
            });
            setSpendMonth(spends);

            let data7days = await GetSpendsData7Days(currentAccount);               
            setData7days(data7days)    
        }
        fetchData();
        
    }, [currentAccount.id]);



    const data = {
        labels: ["Spend", "Income"], // optional
        data: [1, remainIncomePercent],
        colors: ['#00e699', '#004d33']
    };


    const chartConfigItem = {
        backgroundGradientFrom: 'white',
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: 'white',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 5) => `rgba(175, 169, 169, ${opacity})`,
        useShadowColorFromDataset: false,
    };

    return (
        <SectionList
            sections={[{ title: 'Main', data: [{}] }]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => (
                <View style={styles.container}>
                    <Text style={styles.title} >Overview</Text>
                    <View style={styles.main_chart}>
                        <ProgressChart
                            data={data}
                            width={screenWidth}
                            height={220}
                            radius={30}
                            chartConfig={chartConfig}
                            hideLegend={true}
                            withCustomBarColorFromData={true}
                            strokeWidth={11}
                        />
                        <View style={styles.ov_this_month}>
                            <FontAwesome5 name="coins" size={20} color="#00e699" />
                            <Text style={[styles.ov_this_month_title, { color: '#00e699' }]}>Your spending amount this month: <Text style={styles.ov_this_month_value}>{spendMonthValue.toLocaleString('vi-VN')} đ</Text></Text>
                        </View>
                        <View style={styles.ov_this_month}>
                            <MaterialIcons name="ssid-chart" size={20} color="#004d33" />
                            <Text style={[styles.ov_this_month_title, { color: '#004d33' }]}>Income amount this month: <Text style={styles.ov_this_month_value}>{incomeMonthValue.toLocaleString('vi-VN')} đ</Text></Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.header_box}>
                            <Text style={styles.header_box_title}>Daily spending</Text>
                            <Entypo name="chevron-small-right" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.header_box_time}>7 days</Text>
                        <View style={styles.spend_7days}>
                            <Text style={styles.spend_7days_total}>100.000 đ</Text>
                            <View style={styles.chart_7days}>
                                {data7days.reverse().map((item) => (
                                    <View style={styles.chart_day} key={item.id}>
                                        <ProgressChart
                                            data={item}
                                            width={22}
                                            height={22}
                                            radius={8}
                                            chartConfig={chartConfigItem}
                                            hideLegend={true}
                                            withCustomBarColorFromData={true}
                                            strokeWidth={3}
                                        />
                                        <Text>{item.day}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
            )}
        />
    )
}
export default Overview

const styles = StyleSheet.create({
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