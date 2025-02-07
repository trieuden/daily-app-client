import { useState, useEffect } from 'react';
import SpendItemsAPI from '../api/SpendItemsAPI';

function useSpendItems() {
    const [useSpendItemList, setUseSpendItemList] = useState(null);
    const [useSpendItemBySpendId, setUseSpendItemBySpendId] = useState([]);


    useEffect(() => {
        const fetchSpendItems = async () => {
            try {
                const spendItemsAPI = new SpendItemsAPI();
                const spendItems = await spendItemsAPI.getAllSpendItems();
                setUseSpendItemList(spendItems);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchSpendItems();
    }, []);

    const getSpendItemsBySpendId = async (spend_id) => {
        const spendItemsAPI = new SpendItemsAPI();
        const spendItems = await spendItemsAPI.getAllSpendItems();
        const filteredItems = spendItems.filter(spendItem => spendItem.spend_id === spend_id);
        setUseSpendItemBySpendId(filteredItems);
        return filteredItems;
    };

    const getSpendItemById = async (id) => {
        return await SpendItemsAPI.getSpendItemById(id);
    };

    // const deleteSpendTypeById = async (id) => {
    //     return await spendTypeAPI.deleteSpendTypeByID(id);
    // };

    const addSpendItem = async (spendItem) => {
        const spendItemsAPI = new SpendItemsAPI();
        const newSpendItem = await spendItemsAPI.addSpendItem(spendItem)
        return newSpendItem ;
    };

    // Cung cấp các methods và state thông qua hook
    return {
        useSpendItemList,
        getSpendItemsBySpendId,
        getSpendItemById,
        addSpendItem
        // deleteSpendTypeById,
        // addSpendType,
        // setSpendrTypes // cung cấp phương thức này để có thể cập nhật state từ UI
    };
}

export default useSpendItems;
