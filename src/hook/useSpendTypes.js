import { useState, useEffect } from 'react';
import SpendTypesAPI from '../api/spendTypesAPI';

function useSpendTypes() {
    const [useSpendTypesList, setUseSpendTypesList] = useState(null);
    const spendTypeAPI = new SpendTypesAPI();


    useEffect(() => {
        const fetchSpendTypes = async () => {
            try {
                const spendTypes = await spendTypeAPI.getAllSpendTypes();
                setUseSpendTypesList(spendTypes);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchSpendTypes();
    }, []);

    const getSpendTypeById = async (id) => {
        const spendType = await spendTypeAPI.getSpendTypeById(id)
        return spendType[0] ;
    };

    // const deleteSpendTypeById = async (id) => {
    //     return await spendTypeAPI.deleteSpendTypeByID(id);
    // };

    const addSpendType = async (spendType) => {
        return await spendTypeAPI.addSpendType(spendType);
    };

    // Cung cấp các methods và state thông qua hook
    return {
        useSpendTypesList,
        getSpendTypeById,
        // deleteSpendTypeById,
        addSpendType,
    };
}

export default useSpendTypes;
