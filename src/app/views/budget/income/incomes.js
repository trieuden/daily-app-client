import react, { useEffect, useMemo, useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { View, StyleSheet, Text } from "react-native";

import { AntDesign, Entypo } from '@expo/vector-icons';

import useCurrentAccount from "../../../../utils/useCurrentAccount";
import TimestampConverter from "../../../../utils/timestampConverter";

import useIncomes from "../../../../hook/useIncomes";
import useIncomeItems from "../../../../hook/useIncomeItems";
import IncomeDetail from "./incomeDetail";
import NewIncome from "./newIncome";

import { styles } from "../../../css/budget/income/incomesStyle";


const Incomes = () => {
    const currentAccount = useCurrentAccount();

    const { useIncomeList, getIncomesByUserId, getIncomeByDate, getIncomeById } = useIncomes();
    const { useIncomeItemList, getIncomeItemsByIncomeId } = useIncomeItems()

    const [refreshKey, setRefreshKey] = useState(0);
    const [incomeList, setIncomeList] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIncome, setCurrentIncome] = useState();
    const [currentModal, setCurrentModal] = useState('detail');

    useEffect(() => {
        const fetchIncomes = async () => {
            const incomeList = await getIncomesByUserId(currentAccount.id)            
            setIncomeList(incomeList);
        }
        fetchIncomes()
    }, [useIncomeList, currentAccount.id, refreshKey])

    const IncomeItemQuanity = ({ item }) => {
        const [incomeItemsQuantity, setIncomeItemsQuantity] = useState(0)
        useEffect(() => {
            const fetchIncomeItem = async () => {
                const incomeItems = await getIncomeItemsByIncomeId(item.id);
                setIncomeItemsQuantity(incomeItems.length)
            }
            fetchIncomeItem()
        }, [item])
        return <Text style={styles.total_month_items}>{incomeItemsQuantity} items</Text>
    }

    const handleOpenDetail = (income) => {
        setCurrentIncome(income);
        setCurrentModal('detail');
        setModalVisible(true);
    }

    const handleOpenNewIncome = async () => {
        const income = await getIncomeByDate(new Date());
        setCurrentIncome(income);
        setCurrentModal('add');
        setModalVisible(true);
    }
    const handleCloseModal = () => {
        setModalVisible(false);
        setRefreshKey(refreshKey + 1);
    }
    const renderModal = useMemo(() => {
        switch (currentModal) {
            case 'detail':
                return <IncomeDetail onCloseModal={handleCloseModal} currentIncome={currentIncome}/>
            case 'add':
                return <NewIncome onCloseModal={handleCloseModal} currentIncome={currentIncome}/>;
            default:
                break;
        }
    }, [currentModal, currentIncome, refreshKey])

    const incomeComponent = useMemo(() => (
        incomeList.length ? (
            [...incomeList].reverse().map((item) => (
                <TouchableOpacity style={styles.income} key={item.id} onPress={() => handleOpenDetail(item)}>
                    <View>
                        <Text style={styles.total_month_value}>{item.total.toLocaleString('vi-VN')}</Text>
                        <Text style={styles.total_month_text}>{TimestampConverter.convert(item.month).newMonth}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IncomeItemQuanity item={item} />
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            ))
        ) : (
            <Text>Loading ....</Text>
        )
    ), [incomeList, refreshKey])

    return (
        <View style={styles.container}>
            <View style={styles.total_view}>
                <Text style={styles.total}>{incomeList.length ? [...incomeList].reverse()[0].total.toLocaleString('vi-VN') : 0} đ</Text>
                <Text style={styles.total_title}>Total Income</Text>
            </View>
            <View style={styles.header}>
                <View style={styles.section}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.section_title}>Rated</Text>
                        <Text style={styles.section_value}>-2%</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.section_title}>Date</Text>
                        <Text style={styles.section_value}>{incomeList.length ? TimestampConverter.convert([...incomeList].reverse()[0].month).newMonth : 0}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.touch_newIncome} onPress={() => handleOpenNewIncome()}>
                    <Text style={styles.touch_title}>Add Income</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.income_month}>
                <Text style={styles.income_month_title}>Month</Text>
                <View style={styles.income_list}>
                    {incomeComponent}
                </View>
            </View>
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                {renderModal}
            </Modal>
        </View>
    )
}
export default Incomes
