import useSpends from "../../../hook/UseSpends";
import useSpendItems from "../../../hook/UseSpendItems";
import useSpendTypes from "../../../hook/UseSpendTypes";
import { Alert } from "react-native";

function SpendsController() {
    const { getSpendByDate, addSpend, updateSpend, getSpendTypeByUserId } = useSpends();
    const { addSpendItem } = useSpendItems();
    const {useSpendTypesList} = useSpendTypes();

    const newSpendAction = async (currentAccount, currentType, moneySpent, description, currentDate, setRefreshKey) => {
        if (currentType == 0) {
            return { status: false, value: "Select your spend type!" };
        }
        if (moneySpent === "") {
            return { status: false, value: "Money spent cannot be null!" };
        }

        const dateStr = currentDate.toISOString().split("T")[0];
        let currentSpend = await getSpendByDate(dateStr);

        if (currentSpend == null) {
            currentSpend = {
                total: 0,
                created_date: dateStr,
                user_id: currentAccount.id,
            };
            await addSpend(currentSpend);
            currentSpend = await getSpendByDate(dateStr);
        }

        const spendItem = {
            spend_id: currentSpend.id,
            spend_type_id: currentType,
            price: parseInt(moneySpent, 10),
            description: description,
        };

        await addSpendItem(spendItem);

        currentSpend.total += spendItem.price;

        let newSpend = {
            id: currentSpend.id,
            created_date: dateStr,
            total: currentSpend.total,
            user_id: currentAccount.id,
        };

        await updateSpend(newSpend);

        setRefreshKey(spendItem);

        Alert.alert("App", "Success ", [{ text: "OK" }]);
        return { data: spendItem };
    };
    // close modal
    const handleCloseModal = async (setModalVisible, setSpendList, setSpendTypeListData) => {
        setModalVisible(false);

        // render lại data
        const spendList = await getSpendTypeByUserId(currentAccount.id);
        setSpendList(spendList);
        if (useSpendTypesList) {
            setSpendTypeListData([{ id: -1, name: "+", status: "active" }, ...useSpendTypesList]);
        }
    };

    return {
        newSpendAction,
        handleCloseModal
    };
}
export default SpendsController;
