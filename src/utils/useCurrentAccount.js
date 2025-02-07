import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import useUsers from "../hook/UseUsers";

const useCurrentAccount = () => {
    const [currentAccount, setCurrentAccount] = useState('0');
    const { useUserList, getUserById } = useUsers();


    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('currentAccount');
                if (value !== null) {
                    const user = await getUserById(value);
                    setCurrentAccount(user);
                }
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, []);

    return currentAccount;
};

export default useCurrentAccount;
