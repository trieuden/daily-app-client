import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Button, Alert } from "react-native";

import RNDateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import TimestampConverter from "../../../../utils/TimestampConverter";

import useCurrentAccount from "../../../../utils/UseCurrentAccount";
import NewIncomesController from "../../../controller/income/NewIncomesController";

import { styles } from "../../../css/budget/income/NewIncomeStyle";

const NewIncome = ({ onCloseModal, currentIncome }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const currentAccount = useCurrentAccount();

    //controller
    const { NewIncomesAction } = NewIncomesController();

    useEffect(() => {        
        if (currentIncome != null) {
            const year = TimestampConverter.convert(currentIncome.month).newOnlyYear;
            const month = TimestampConverter.convert(currentIncome.month).newOnlyMonth;
            const date = new Date(year, month-1, 1);
            setCurrentDate(date);
        }
    }, [currentIncome]);

    const handleNewIncome = async () => {
        const incomesController = await NewIncomesAction(title, price, currentIncome, currentAccount, currentDate);
        Alert.alert("App", incomesController.value, [{ text: "OK" }]);
        if (incomesController.status == true) {
            onCloseModal(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="leftcircleo" size={24} onPress={() => {onCloseModal(false)}} color="black" />
                <Text style={styles.title}>New Income</Text>
                <AntDesign name="infocirlceo" size={18} color="black" />
            </View>
            <View style={styles.input_component}>
                <View style={styles.input}>
                    <View style={styles.inputTitle}>
                        <Text style={styles.inputTitle_text}>Title</Text>
                    </View>
                    <TextInput style={styles.inputValue} onChangeText={(value) => setTitle(value)} />
                </View>
                <View style={styles.input}>
                    <View style={styles.inputTitle}>
                        <Text style={styles.inputTitle_text}>Price</Text>
                    </View>
                    <TextInput style={styles.inputValue} inputMode="numeric" onChangeText={(value) => setPrice(value)} />
                </View>
                <View style={styles.date_component}>
                    <RNDateTimePicker value={currentDate} />
                </View>
            </View>
            <View style={styles.buttonComponent}>
                <TouchableOpacity style={styles.touch} onPress={() => handleNewIncome()}>
                    <Text style={styles.touch_text}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default NewIncome;
