import useIncomeItems from "../../hook/useIncomeItems";
import useIncomes from "../../hook/useIncomes";
import TimestampConverter from "../../utils/timestampConverter";

function IncomesController() {

    const {addIncome, getIncomeByDate, updateIncome} = useIncomes();
    const {addIncomeItem} = useIncomeItems()

    const NewIncomesAction = async (title, price, currentIncome, currentAccount, currentDay) => {
        if (title === '') {
            return { status: false, value: 'Title cannot be null!' };
        }
        if (price === '') {
            return { status: false, value: 'Price cannot be null!' };
        }
        if (currentIncome == null) {
            const newIncome = {
                user_id: currentAccount.id,
                month: new Date(),
                total: 0,
            }
            await addIncome(newIncome)
            currentIncome = await getIncomeByDate(new Date());
        }
        const year = TimestampConverter.convert(currentIncome.month).newOnlyYear
        const month = TimestampConverter.convert(currentIncome.month).newOnlyMonth
        var newIncomeItem = {
            income_id: currentIncome.id,
            name: title,
            created_date: new Date(Date.UTC(year, month - 1, currentDay, 0, 0, 0)),
            price: parseInt(price, 10)
        }
    
        await addIncomeItem(newIncomeItem);
    
        const totalUpdate = currentIncome.total + newIncomeItem.price;    
    
        const newIncomeUpdate = {
            id: currentIncome.id,
            user_id: currentIncome.user_id,
            month: new Date(Date.UTC(year, month - 1, 1)),
            total: totalUpdate,
        }
    
        await updateIncome(newIncomeUpdate)
    
        return { status: true, value: 'Susses !' };
    }
    return {
        NewIncomesAction,
    }
}
export default IncomesController