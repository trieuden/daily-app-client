import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Button, Alert } from "react-native"

import RNPickerSelect from 'react-native-picker-select';
import TimestampConverter from "../../../../utils/timestampConverter";

import useCurrentAccount from "../../../../utils/useCurrentAccount";
import IncomesController from "../../../controller/incomesController";

import { styles } from "../../../css/budget/income/newIncomeStyle";

const NewIncome = ({ onCloseModal, currentIncome }) => {
    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const [daysInMonth, setDaysInMonth] = useState(31);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const currentAccount = useCurrentAccount()

    //controller
    const {NewIncomesAction} = IncomesController()


    useEffect(() => {
        if (currentIncome != null) {
            const year = TimestampConverter.convert(currentIncome.month).newOnlyYear
            const month = TimestampConverter.convert(currentIncome.month).newOnlyMonth
            const dayQuantity = new Date(year, month, 0).getDate();
            setDaysInMonth(dayQuantity);
        } else {
            const dayQuantity = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
            setDaysInMonth(dayQuantity);
        }
    }, [currentIncome]);

    const dayOptions = Array.from({ length: daysInMonth }, (_, i) => ({
        label: String(i + 1),
        value: i + 1
    }));


    const handleNewIncome = async () => {
        const incomesController = await NewIncomesAction(title, price, currentIncome, currentAccount, currentDay);
        Alert.alert('App', incomesController.value, [
            { text: 'OK' },
        ]);
        if (incomesController.status == true) {
            onCloseModal(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <Text style={styles.title}>New Income Item</Text>
                    <Text style={styles.month}>{currentIncome != null ? TimestampConverter.convert(currentIncome.month).newMonth : (new Date().getMonth() + 1 + '-' + new Date().getFullYear())}</Text>
                </View>
                <View style={styles.inputComponent}>
                    <View style={[styles.input]}>
                        <View style={styles.inputName}>
                            <Text style={styles.inputName_text}>Title</Text>
                        </View>
                        <TextInput
                            style={styles.inputValue}
                            onChangeText={(value) => setTitle(value)}
                        />
                    </View>
                    <View style={styles.input}>
                        <View style={styles.inputName}>
                            <Text style={styles.inputName_text}>Price</Text>
                        </View>
                        <TextInput
                            style={styles.inputValue}
                            inputMode="numeric"
                            onChangeText={(value) => setPrice(value)}
                        />
                    </View>
                    <View style={styles.dateComponent}>
                        <Text style={styles.inputName_text}>Day: </Text>
                        <TouchableOpacity style={styles.selectDate}>
                            <RNPickerSelect
                                onValueChange={(value) => setCurrentDay(value)}
                                items={dayOptions}
                                value={currentDay}
                                placeholder={{}}
                                style={styles.select_text}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonComponent}>
                    <TouchableOpacity style={[styles.touch, styles.touch_left]} onPress={() => handleNewIncome()}>
                        <Text style={[styles.touch_text, styles.touch_text_left]}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={() => { onCloseModal(false) }}>
                        <Text style={styles.touch_text}>Exit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default NewIncome

