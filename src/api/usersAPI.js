import axios from 'axios';
import { SERVER_IP } from '../config/Config';


class UsersAPI {
    constructor(apiUrl) {
        this.ip = SERVER_IP;
        this.apiUrl = 'http://' + this.ip + ':3306/users/';
    }

    async getAllUsers() {
        try {
            const response = await axios.get(this.apiUrl + 'getAllUsers');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users from the API');
        }
    }

    async getUserById(id) {
        try {
            const response = await axios.get(this.apiUrl + 'getUserById?id=' + id);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users from the API');
        }
    }  
    async addUser(user) {
        try {
            await axios.post(this.apiUrl + 'addUser', {
                data: user
            });

        } catch (error) {
            console.error('Error adding users:', error);
            throw new Error('Error adding users via the API');
        }
    }
    async deleteUser(id) {
        try {
            await axios.post(this.apiUrl + 'deleteUser', {
                id: id
            });

        } catch (error) {
            console.error('Error delete users:', error);
            throw new Error('Error delete users via the API');
        }
    }
    
}

export default UsersAPI;
