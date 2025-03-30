import react, { useEffect, useMemo, useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { View, StyleSheet, Text } from "react-native";

import { MaterialIcons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";

import useCurrentAccount from "../../../../utils/UseCurrentAccount";
import TimestampConverter from "../../../../utils/TimestampConverter";

import useIncomes from "../../../../hook/UseIncomes";
import useIncomeItems from "../../../../hook/UseIncomeItems";
import IncomeDetail from "./IncomeDetail";
import NewIncome from "./NewIncome";

import IncomesController from "../../../controller/income/IncomesController";

import { styles } from "../../../css/budget/income/IncomesStyle";

const Incomes = () => {
    const currentAccount = useCurrentAccount();

    const {t} = useTranslation()

    const { useIncomeList, getIncomesByUserId, getIncomeByDate, getIncomeById } = useIncomes();
    const { useIncomeItemList, getIncomeItemsByIncomeId } = useIncomeItems();

    const [refreshKey, setRefreshKey] = useState(0);
    const [incomeList, setIncomeList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIncome, setCurrentIncome] = useState(0);
    const [currentModal, setCurrentModal] = useState("detail");

    const [incomeItemsQuantity, setIncomeItemsQuantity] = useState(0);
    const [currentRating, setCurrentRating] = useState(0);
    const [currentIncomeValue, setCurrentIncomeValue] = useState(0);

    const incomeController = IncomesController();

    useEffect(() => {
        const fetchIncomes = async () => {
            const incomeList = await getIncomesByUserId(currentAccount.id);
            setIncomeList(incomeList);

            await renderData();
        };
        fetchIncomes();
    }, [useIncomeList, currentAccount.id, refreshKey]);

    const renderData = async () => {
        const rating = await incomeController.CurrentRating();
        setCurrentRating(rating.value);

        const incomeValue = await incomeController.CurrentIncomeValue();
        setCurrentIncomeValue(incomeValue.value);
    };

    const handleOpenDetail = (income) => {
        setCurrentIncome(income);
        setCurrentModal("detail");
        setModalVisible(true);
    };

    const handleOpenNewIncome = async () => {
        const income = await getIncomeByDate(new Date());
        setCurrentIncome(income);
        setCurrentModal("add");
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
        setRefreshKey(refreshKey + 1);
    };
    const renderModal = useMemo(() => {
        switch (currentModal) {
            case "detail":
                return <IncomeDetail onCloseModal={handleCloseModal} currentIncome={currentIncome} />;
            case "add":
                return <NewIncome onCloseModal={handleCloseModal} currentIncome={currentIncome} />;
            default:
                break;
        }
    }, [currentModal, currentIncome, refreshKey]);

    const incomeComponent = useMemo(
        () =>
            incomeList.length ? (
                [...incomeList].reverse().map(async (item) => {
                    const incomeItems = await getIncomeItemsByIncomeId(item.id);

                    return (
                        <TouchableOpacity style={styles.income} key={item.id} onPress={() => handleOpenDetail(item)}>
                            <View>
                                <Text style={styles.total_month_value}>{item.total.toLocaleString("vi-VN")}</Text>
                                <Text style={styles.total_month_text}>{TimestampConverter.convert(item.month).newMonth}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.total_month_items}>{incomeItems.length} {t("items_title")}</Text>
                                <Entypo name="chevron-small-right" size={30} color="black" />
                            </View>
                        </TouchableOpacity>
                    );
                })
            ) : (
                <Text>Loading ....</Text>
            ),
        [incomeList, refreshKey]
    );

    return (
        <View style={styles.container}>
            <View style={styles.total_view}>
                <Text style={styles.total}>{currentIncomeValue.toLocaleString("vi-VN")} đ</Text>
                <Text style={styles.total_title}>{t("TotalIncome_title")}</Text>
            </View>
            <View style={styles.header}>
                <View style={styles.section}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.section_title}>{t("Rated_title")}</Text>
                        <Text style={styles.section_value}>{currentRating}%</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.section_title}>{t("Date_title")}</Text>
                        <Text style={styles.section_value}>{TimestampConverter.convert(new Date()).newMonth}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button_newIncome} onPress={() => handleOpenNewIncome()}>
                    <MaterialIcons name="data-saver-off" size={24} color="#0099cc" />
                    <Text style={styles.button_newIncome_title}>{t("NewIncome_title")}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.income_month}>
                <Text style={styles.income_month_title}><MaterialCommunityIcons name="calendar-month" size={18} color="#737373" /> {t("MonthlyIncome_title")}</Text>
                <View style={styles.income_list}>{incomeComponent}</View>
            </View>
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                {renderModal}
            </Modal>
        </View>
    );
};
export default Incomes;
