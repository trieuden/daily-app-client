import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import useSpendItems from '../../../../hook/UseSpendItems';
import useSpendTypes from '../../../../hook/UseSpendTypes';

import TimestampConverter from '../../../../utils/TimestampConverter';
import { styles } from '../../../css/budget/spend/SpendStyle';

const SpendItem = ({ spendItem, refreshKey }) => {
    const { getSpendTypeById } = useSpendTypes();

    const [spendType, setSpendType] = useState(null);
    useEffect(() => {
        const fetchSpendTypes = async () => {
            const item = await getSpendTypeById(spendItem.spend_type_id);
            setSpendType(item)
        }
        fetchSpendTypes()
    }, [spendItem, refreshKey])
    return (
        <>
            {spendType != null ?
                (
                    <View style={styles.spendItem}>
                        <View style={styles.spend_name}>
                            <Image style={{ height: 25, width: 25 }} source={{ uri: spendType.image }} />
                            <Text style={styles.spend_name_text}>{spendType.name}</Text>
                        </View>
                        <View style={styles.spend_price}>
                            <Text style={styles.spend_price_text}>{spendItem.price.toLocaleString('vi-VN')} đ</Text>
                            <TouchableOpacity onPress={() => fetchSpendItemDetails(spendItem.id)}>
                                <AntDesign name="right" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                :
                (
                    <Text>Loading....</Text>
                )

            }
        </>

    )
}

const Spend = ({ spend, refreshKey }) => {
    const { getSpendItemsBySpendId } = useSpendItems();
    const [spendItemList, setSpendItemList] = useState([]);

    useEffect(() => {
        const fetchSpendItems = async () => {
            const items = await getSpendItemsBySpendId(spend.id);
            setSpendItemList(items);
        };

        fetchSpendItems();
    }, [spend, refreshKey]);

    return (
        <View style={styles.spend_component}>
            <View style={styles.spend_date}>
                <Text style={styles.spend_date_text}>
                    {TimestampConverter.convert(spend.created_date).newDate}
                </Text>
                <Text style={styles.spend_date_total}>{spend.total.toLocaleString('vi-VN')} đ</Text>
            </View>
            {spendItemList != null && spendItemList.length > 0 ? (
                [...spendItemList].reverse().map((spendItem) => (
                    <SpendItem spendItem={spendItem} key={spendItem.id} />
                ))
            ) : (
                <Text>No items found for this spend ID.</Text>
            )}
        </View>
    );
};
export default Spend;
