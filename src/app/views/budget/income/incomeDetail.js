import { StyleSheet, View, TouchableOpacity, Text, Modal, } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import TimestampConverter from "../../../../utils/TimestampConverter"
import { useEffect, useState, memo, useMemo } from "react"

import useIncomeItems from "../../../../hook/UseIncomeItems"
import useIncomes from "../../../../hook/UseIncomes"

import NewIncome from "./NewIncome"

import { styles } from "../../../css/budget/income/IncomeDetailStyle"


const IncomeDetail = ({ onCloseModal, currentIncome }) => {
    const [incomeItemList, setIncomeItemList] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [income, setIncome] = useState(null);


    const { useIncomeItemList, getIncomeItemsByIncomeId } = useIncomeItems()
    const { getIncomeById } = useIncomes()

    useEffect(() => {
        const fetchIncomeItem = async () => {
            const income = await getIncomeById(currentIncome.id);            
            setIncome(income);

            const incomeItemList = await getIncomeItemsByIncomeId(currentIncome.id);
            setIncomeItemList(incomeItemList);
        }
        fetchIncomeItem()

    }, [currentIncome, useIncomeItemList, modalVisible])

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    const incomeHeader = useMemo(() => (
        income != null ? (
            <View style={styles.box}>
                <Text style={styles.incomeTotal}>{income.total.toLocaleString('vi-VN')} đ</Text>
                <Text style={styles.incomeMonth}>{TimestampConverter.convert(income.month).newMonth}</Text>
                <TouchableOpacity style={styles.touch_newItem} onPress={() => setModalVisible(true)}>
                    <Text style={styles.touch_text}>Add</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <Text>Loading ...</Text>
        )
    ), [income])

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { onCloseModal(false) }} style={styles.touch_back}>
                        <AntDesign name="close" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch_back}>
                        <AntDesign name="questioncircleo" size={23} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    {incomeHeader}
                    <View style={styles.incomeItems}>
                        <Text style={styles.income_detail_title}>Detail</Text>
                        <View style={styles.income_list}>
                            {incomeItemList != null ? (
                                [...incomeItemList].reverse().map((item) => (
                                    <View style={styles.incomeItem} key={item.id}>
                                        <View>
                                            <Text style={styles.incomeItem_title}>{item.name}</Text>
                                            <Text style={styles.incomeItem_date}>{TimestampConverter.convert(item.created_date).newDate}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.incomeItem_value}>{item.price.toLocaleString('vi-VN')} đ</Text>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <Text>Loading ...</Text>
                            )
                            }
                        </View>
                    </View>
                </View>
            </View>
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <NewIncome onCloseModal={handleCloseModal} currentIncome={currentIncome} />
            </Modal>
        </View>
    )
}
export default IncomeDetail
