import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, SectionList, SafeAreaView, Alert } from "react-native";
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import SpendsController from "../../../controller/SpendsController";

import useSpendTypes from "../../../../hook/UseSpendTypes";
import useSpends from "../../../../hook/UseSpends";

import { styles } from "../../../css/budget/spend/SpendsStyle";
import Spend from "./Spend";
import useCurrentAccount from "../../../../utils/UseCurrentAccount";
import { Modal } from "react-native";
import NewSpendType from "./NewSpendType";

const Spends = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());

    const [expanded, setExpanded] = useState(false);
    const [currentType, setCurrentType] = useState(0);
    const [moneySpent, setMoneySpent] = useState("");
    const [description, setDescription] = useState("");

    const [spendTypeListData, setSpendTypeListData] = useState([]);
    const [spendList, setSpendList] = useState([]);

    const { useSpendTypesList } = useSpendTypes();
    const { getSpendTypeByUserId } = useSpends();

    const [modalVisible, setModalVisible] = useState(false);

    //controlller

    const { newSpendAction } = SpendsController();

    const currentAccount = useCurrentAccount();

    //fetch data spend type
    useEffect(() => {
        const fetchSpends = async () => {
            const spendList = await getSpendTypeByUserId(currentAccount.id);
            setSpendList(spendList);
        };

        if (useSpendTypesList) {
            setSpendTypeListData([{ id: -1, name: "+", status: "active" }, ...useSpendTypesList]);
            fetchSpends();
        }
    }, [currentAccount.id, refreshKey, useSpendTypesList]);

    //action choose spend type
    const chooseSpendType = useCallback((spendType) => {
        setCurrentType(spendType.id);
        setMoneySpent(spendType.price.toString());
    }, []);

    //action new spend
    const handleNewSpend = async () => {
        try {
            const spendsController = await newSpendAction(currentAccount, currentType, moneySpent, description, currentDate);
            setRefreshKey(spendsController.data);

            Alert.alert("App", spendsController.value, [{ text: "OK" }]);
        } catch (error) {
            console.error(error);
        }
    };

    //render spend type theo kiểu nào
    const renderItem = useCallback(
        ({ item }) => {
            if (item.status === "active") {
                if (item.id === -1) {
                    return (
                        <TouchableOpacity style={styles.spendType_view} onPress={() => setModalVisible(true)}>
                            <Text style={styles.newSpendType_title}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <TouchableOpacity style={[styles.spendType_view, { backgroundColor: currentType === item.id ? "#e6fff7" : "white" }]} key={item.id} onPress={() => chooseSpendType(item)}>
                            <Text style={styles.spendType_title}>{item.name}</Text>
                            <Image source={{ uri: item.image }} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                    );
                }
            }
        },
        [useSpendTypesList, refreshKey, currentType]
    );

    //render spend items
    const spendComponents = useMemo(
        () =>
            spendList.length ? (
                [...spendList].reverse().map((item) => (
                    <View key={item.id}>
                        <Spend spend={item} refreshKey={refreshKey} />
                    </View>
                ))
            ) : (
                <Text>Loading ....</Text>
            ),
        [spendList, refreshKey]
    );

    // close modal
    const handleCloseModal = async () => {
        setModalVisible(false);

        // render lại data
        const spendList = await getSpendTypeByUserId(currentAccount.id);
        setSpendList(spendList);
        if (useSpendTypesList) {
            setSpendTypeListData([{ id: -1, name: "+", status: "active" }, ...useSpendTypesList]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.date_container}>
                <AntDesign name="left" size={26} color="#00cc88" />
                <View style={styles.date_picker}>
                    <RNDateTimePicker
                        value={currentDate}
                        onChange={(event, date) => setCurrentDate(date)}
                    />
                </View>
                <AntDesign name="right" size={26} color="#00cc88" />
            </View>
            <View style={styles.values}>
                <View style={styles.moneySpent}>
                    <MaterialIcons name="attach-money" size={24} color="#009966" />
                    <Text style={styles.moneySpent_text}>Money Spent:</Text>
                    <TextInput style={styles.moneySpent_input} inputMode="numeric" value={moneySpent.toLocaleString("vi-VN")} onChangeText={(value) => setMoneySpent(value)} />
                </View>
                <View style={styles.spendTypes}>
                    <View style={styles.spendTypesTitle}>
                        <Text style={styles.spendTypesTitle_text}>Spend Types</Text>
                        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                            <AntDesign name={expanded ? "down" : "right"} size={20} color="#006652" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spendTypeList}>
                        {spendTypeListData.length ? (
                            expanded ? (
                                <SafeAreaView>
                                    <FlatList data={spendTypeListData} renderItem={renderItem} numColumns={5} keyExtractor={(item) => item.id.toString()} />
                                </SafeAreaView>
                            ) : (
                                <FlatList data={spendTypeListData} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} horizontal={true} showsHorizontalScrollIndicator={false} />
                            )
                        ) : (
                            <Text>Loading ....</Text>
                        )}
                    </View>
                </View>

                <View style={styles.note_container}>
                    <Text style={styles.spendTypesTitle_text}>Note</Text>
                    <TextInput multiline={true} style={styles.spendDescription} onChangeText={(text) => setDescription(text)} />
                </View>
                <TouchableOpacity style={styles.buttonSave} onPress={handleNewSpend}>
                    <MaterialIcons name="data-saver-off" size={24} color="white" />
                    <Text style={styles.buttonSave_title}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.spendList}>{spendComponents}</View>
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <NewSpendType onCloseModal={handleCloseModal} />
            </Modal>
        </View>
    );
};

export default Spends;
