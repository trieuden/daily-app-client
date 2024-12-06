import { useState, useEffect } from 'react';
import IncomesAPI from '../api/incomesAPI';
import TimestampConverter from '../utils/timestampConverter';

function useIncomes() {
    const [useIncomeList, setUseIncomeList] = useState(null);
    const [income, setIncome] = useState(null);

    const incomesAPI = new IncomesAPI();


    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const incomes = await incomesAPI.getAllIncomes();
                setUseIncomeList(incomes);
            } catch (error) {
                console.error('Error fetching incomes:', error);
            }
        };

        fetchIncomes();
    }, []);

    const getIncomeById = async (id) => {
        const income = await incomesAPI.getIncomeById(id)
        return income[0];
    };

    const getIncomesByUserId = async (userId) => {
        const incomes = await incomesAPI.getIncomesByUserId(userId)
        return incomes;
    };

    const getIncomeByDate = async (date) => {
        const incomesAPI = new IncomesAPI();
        const incomes = await incomesAPI.getAllIncomes();
        const dateToCompare = TimestampConverter.convert(date).newMonth;

        for (let incomeItem of incomes) {
            if (TimestampConverter.convert(incomeItem.month).newMonth === dateToCompare) {
                return incomeItem;
            }
        }
        return null;
    };

    // const deleteSpendTypeById = async (id) => {
    //     return await spendTypeAPI.deleteSpendTypeByID(id);
    // };

    const addIncome = async (income) => {
        const incomesAPI = new IncomesAPI();
        const newIncome = await incomesAPI.addIncome(income)
        return newIncome;
    };
    const getIncomeMax = async () => {
        const incomesAPI = new IncomesAPI();
        const incomes = await incomesAPI.getAllIncomes();
        return incomes.length+1;
    };
    const updateIncome = async (income) => {
        const incomesAPI = new IncomesAPI();
        const incomes = await incomesAPI.updateIncome(income);
        const incomeList = await incomesAPI.getAllIncomes();
        setUseIncomeList(incomeList);
        return incomes
    }

    // Cung cấp các methods và state thông qua hook
    return {
        useIncomeList,
        getIncomeById,
        getIncomesByUserId,
        getIncomeByDate,
        addIncome,
        getIncomeMax,
        updateIncome,
        // deleteSpendTypeById,
        // addSpendType,
        // setSpendrTypes // cung cấp phương thức này để có thể cập nhật state từ UI
    };
}

export default useIncomes;
