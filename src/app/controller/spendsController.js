import useSpends from "../../hook/useSpends";
import useSpendItems from "../../hook/useSpendItems";

function SpendsController()  {

    const {getSpendByDate, addSpend, updateSpend} = useSpends();
    const {addSpendItem} = useSpendItems()
    
    const newSpendAction = async (currentAccount, currentType, moneySpent, description, currentDate) => {
        if (currentType == 0) {
            return { status: false, value: 'Select your spend type!'};
        }
        if (moneySpent === '') {
            return { status: false, value: 'Money spent cannot be null!'};
        }
    
        var currentSpend = await getSpendByDate(currentDate);
    
        if (currentSpend == null) {
            currentSpend = {
                total: 0,
                created_date: currentDate,
                user_id: currentAccount.id
            };
            await addSpend(currentSpend);
            currentSpend = await getSpendByDate(currentDate);
        }
    
    
        const spendItem = {
            spend_id: currentSpend.id,
            spend_type_id: currentType,
            price: parseInt(moneySpent, 10),
            description: description,
        };
    
        await addSpendItem(spendItem);
    
        currentSpend.total += spendItem.price;
    
        newSpend = {
            id: currentSpend.id,
            created_date: currentDate,
            total: currentSpend.total,
            user_id: currentAccount.id
        }
    
        await updateSpend(newSpend);
    
        return { status: true, value: 'Success !', data: spendItem};

    }
    return {
        newSpendAction
    }
};
export default SpendsController;
