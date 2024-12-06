import { useState, useEffect } from 'react';
import IncomeItemsAPI from '../api/incomeItemsAPI';

function useIncomeItems() {
    const [useIncomeItemList, setUseIncomeItemList] = useState(null);

    useEffect(() => {
        const fetchIncomeItems = async () => {
            try {
                const incomeItemsAPI = new IncomeItemsAPI();
                const incomeItems = await incomeItemsAPI.getAllIncomeItems();
                setUseIncomeItemList(incomeItems);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchIncomeItems();
    }, []);

    const getIncomeItemsByIncomeId = async (income_id) => {
        const incomeItemsAPI = new IncomeItemsAPI();
        const incomeItems = await incomeItemsAPI.getAllIncomeItems();
        const filteredItems = incomeItems.filter(spendItem => spendItem.income_id === income_id);
        return filteredItems;
    };

    const getIncomeItemById = async (id) => {
        return await IncomeItemsAPI.getIncomeItemById(id);
    };

    // const deleteSpendTypeById = async (id) => {
    //     return await spendTypeAPI.deleteSpendTypeByID(id);
    // };

    const addIncomeItem = async (incomeItem) => {
        const incomeItemsAPI = new IncomeItemsAPI();
        const newIncomeItem = await incomeItemsAPI.addIncomeItem(incomeItem)        
        return newIncomeItem ;
    };

    // Cung cấp các methods và state thông qua hook
    return {
        useIncomeItemList,
        getIncomeItemsByIncomeId,
        getIncomeItemById,
        addIncomeItem
        // deleteSpendTypeById,
        // addSpendType,
        // setSpendrTypes // cung cấp phương thức này để có thể cập nhật state từ UI
    };
}

export default useIncomeItems;
