import { useState, useEffect } from 'react';
import UsersAPI from '../api/usersAPI';
import TimestampConverter from '../utils/timestampConverter';

function useUsers() {
    const [useUserList, setUseUserList] = useState(null);
    const usersAPI = new UsersAPI();


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await usersAPI.getAllUsers();
                setUseUserList(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const getUserById = async (id) => {
        const user =  await usersAPI.getUserById(id)
        return user[0];
    };

    // const deleteUserTypeById = async (id) => {
    //     return await UserTypeAPI.deleteUserTypeByID(id);
    // };

    const addUser = async (user) => {
        const usersAPI = new UsersAPI();
        const newUser = await usersAPI.addUser(user)
        return newUser;
    };
    const getUserMax = async () => {
        const usersAPI = new UsersAPI();
        const users = await usersAPI.getAllUsers();
        return users.length+1;
    };
    const updateUser = async (user) => {
        const usersAPI = new UsersAPI();
        const users = await usersAPI.updateUser(user);
        const userList = await usersAPI.getAllUsers();
        setUseUserList(userList);
        return users
    }

    // Cung cấp các methods và state thông qua hook
    return {
        useUserList,
        getUserById,
        addUser,
        getUserMax,
        updateUser,
        // deleteUserTypeById,
        // addUserType,
        // setUserrTypes // cung cấp phương thức này để có thể cập nhật state từ UI
    };
}

export default useUsers;
