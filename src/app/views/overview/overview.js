import react, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, SectionList } from "react-native";

import { ProgressChart } from "react-native-chart-kit";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";

import useIncomes from "../../../hook/UseIncomes";
import useSpends from "../../../hook/UseSpends";

import useCurrentAccount from "../../../utils/UseCurrentAccount";
import OverviewController from "../../controller/OverViewController";

import { styles } from "../../css/overview/OverviewStyle";

import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#f2f2f2",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#f2f2f2",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 5) => `rgba(175, 169, 169, ${opacity})`,
    useShadowColorFromDataset: false,
};

const Overview = () => {
    const [budgetThisMonth, setBudgetThisMonth] = useState(null);
    const [data7days, setData7days] = useState([]);
    const [totalData7days, setTotalData7days] = useState(0);

    const [remainIncomePercent, setRemainIncomePercent] = useState(1);
    const [remainSpendPercent, setRemainSpendPercent] = useState(1);

    const { getIncomeByDate, useIncomeList, getIncomesByUserId } = useIncomes();
    const { getSpendByDate, getSpendByMonth, useSpendList } = useSpends();

    const currentAccount = useCurrentAccount();

    const { t } = useTranslation();

    const { GetTotalSpends7Days, GetSpendsData7Days, GetBudgetThisMonth } = OverviewController();

    //controlller
    useEffect(() => {
        const fetchData = async () => {
            //budget this month
            await GetBudgetThisMonth(setBudgetThisMonth, setRemainIncomePercent, setRemainSpendPercent);

            //lấy dữ liệu 7 ngày vừa qua
            setTotalData7days(await GetTotalSpends7Days(currentAccount, new Date()));
            await GetSpendsData7Days(currentAccount, setData7days);
        };
        fetchData();
    }, [currentAccount, useSpendList, useIncomeList]);

    const data = {
        labels: ["Spend", "Income"], // optional
        data: [1 - remainIncomePercent, remainIncomePercent],
        colors: ["#00e699", "#004d33"],
    };

    const chartConfigItem = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 5) => `rgba(175, 169, 169, ${opacity})`,
        useShadowColorFromDataset: false,
    };

    return (
        <SectionList
            sections={[{ title: "Main", data: [{}] }]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => (
                <View style={styles.container}>
                    <Text style={styles.title}>{t("Overview_title")}</Text>
                    <View style={styles.main_chart}>
                        <ProgressChart data={data} width={screenWidth} height={220} radius={30} chartConfig={chartConfig} hideLegend={true} withCustomBarColorFromData={true} strokeWidth={11} />
                        <View style={styles.ov_this_month}>
                            <FontAwesome5 name="coins" size={20} color="#00e699" />
                            <Text style={[styles.ov_this_month_title, { color: "#00e699" }]}>
                                {t("Spend-amount-month_title")} <Text style={styles.ov_this_month_value}>{budgetThisMonth ? budgetThisMonth.spends.total.toLocaleString("vi-VN") : 0} đ</Text>
                            </Text>
                        </View>
                        <View style={styles.ov_this_month}>
                            <MaterialIcons name="ssid-chart" size={20} color="#004d33" />
                            <Text style={[styles.ov_this_month_title, { color: "#004d33" }]}>
                                {t("Income-amount-month_title")} <Text style={styles.ov_this_month_value}>{budgetThisMonth ? budgetThisMonth.incomes.total.toLocaleString("vi-VN") : 0} đ</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.header_box}>
                            <Text style={styles.header_box_title}>{t("DailySpend_title")}</Text>
                            <Entypo name="chevron-small-right" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.header_box_time}>{t("7days_title")}</Text>
                        <View style={styles.spend_7days}>
                            <Text style={styles.spend_7days_total}>{totalData7days.toLocaleString("vi-VN")} đ</Text>
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
    );
};
export default Overview;
