import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, SectionList, SafeAreaView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import SpendsController from '../../../controller/spendsController';

import useSpendTypes from '../../../../hook/useSpendTypes';
import useSpends from '../../../../hook/useSpends';

import { styles } from '../../../css/budget/spend/spendsStyle';
import Spend from './spend';
import useCurrentAccount from '../../../../utils/useCurrentAccount';
import { Modal } from 'react-native';
import NewSpendType from './newSpendType';

const Spends = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());

    const [expanded, setExpanded] = useState(false);
    const [currentType, setCurrentType] = useState(0);
    const [moneySpent, setMoneySpent] = useState('');
    const [description, setDescription] = useState('');

    const [spendTypeListData, setSpendTypeListData] = useState([]);
    const [spendList, setSpendList] = useState([]);

    const { useSpendTypesList } = useSpendTypes();
    const { getSpendTypeByUserId } = useSpends();

    const [modalVisible, setModalVisible] = useState(false);

    //controlller

    const {newSpendAction} = SpendsController();

    const currentAccount = useCurrentAccount();

    useEffect(() => {
        const fetchSpends = async () => {
            const spendList = await getSpendTypeByUserId(currentAccount.id);
            setSpendList(spendList);
        }

        if (useSpendTypesList) {
            setSpendTypeListData([{ id: -1, name: '+', status: 'active' }, ...useSpendTypesList]);
            fetchSpends();
        }

    }, [currentAccount.id, refreshKey, useSpendTypesList]);

    const chooseSpendType = useCallback((spendType) => {
        setCurrentType(spendType.id);
        setMoneySpent(spendType.price.toString());
    }, []);

    const handleNewSpend = async () => {
        try {            
            const spendsController = await newSpendAction(currentAccount, currentType, moneySpent, description, currentDate);
            setRefreshKey(spendsController.data);

            Alert.alert('App', spendsController.value, [
                { text: 'OK' },
            ]);

        } catch (error) {
            console.error(error);
        }
    }

    const renderItem = useCallback(({ item }) => {
        if (item.status === 'active') {
            if (item.id === -1) {
                return (
                    <TouchableOpacity style={styles.spendType_view} onPress={() => setModalVisible(true)}>
                        <Text style={styles.newSpendType_title}>{item.name}</Text>
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity
                        style={[styles.spendType_view, { backgroundColor: currentType === item.id ? '#e6fff7' : 'white' }]}
                        key={item.id}
                        onPress={() => chooseSpendType(item)}
                    >
                        <Text style={styles.spendType_title}>{item.name}</Text>
                        <Image source={{ uri: item.image }} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                );
            }
        }
    }, [useSpendTypesList, refreshKey, currentType]);




    const spendComponents = useMemo(() => (
        spendList.length ? (
            [...spendList].reverse().map((item) => (
                <View key={item.id}>
                    <Spend spend={item} refreshKey={refreshKey} />
                </View>
            ))
        ) : (
            <Text>Loading ....</Text>
        )
    ), [spendList, refreshKey]);

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.values}>
                <View style={styles.date_form}>
                    <RNDateTimePicker value={currentDate} onChange={(event, date) => setCurrentDate(date)} />
                </View>
                <View style={styles.moneySpent}>
                    <Text style={styles.moneySpent_text}>Money Spent:</Text>
                    <TextInput style={styles.moneySpent_input} inputMode="numeric" value={moneySpent.toLocaleString('vi-VN')} onChangeText={(value) => setMoneySpent(value)} />
                </View>
                <View style={styles.spendTypes}>
                    <View style={styles.spendTypesHeader}>
                        <Text style={styles.spendTypesHeader_text}>Spend Types</Text>
                        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                            <AntDesign name={expanded ? "down" : 'right'} size={21} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spendTypeList}>
                        {spendTypeListData.length ? (
                            expanded ? (
                                <SafeAreaView>
                                    <FlatList
                                        data={spendTypeListData}
                                        renderItem={renderItem}
                                        numColumns={5}
                                        keyExtractor={(item) => item.id.toString()}
                                    />
                                </SafeAreaView>
                            ) : (
                                <FlatList
                                    data={spendTypeListData}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id.toString()}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />
                            )
                        ) : (
                            <Text>Loading ....</Text>
                        )}
                    </View>
                    <View>
                        <Text style={styles.spendTypesHeader_text}>Note</Text>
                        <TextInput multiline={true} style={styles.spendDecription} onChangeText={(text) => setDescription(text)} />
                    </View>
                    <TouchableOpacity style={styles.buttonSave} onPress={handleNewSpend}>
                        <Text style={styles.buttonSave_title}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.spendList}>
                {spendComponents}
            </View>
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <NewSpendType onCloseModal={handleCloseModal}/>
            </Modal>
        </View>
    );
};

export default Spends;
