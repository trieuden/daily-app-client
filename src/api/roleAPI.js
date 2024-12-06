import axios from 'axios';
import { SERVER_IP } from '../config/config';

class RolesAPI {
    constructor(apiUrl) {
        this.ip = SERVER_IP ;
        this.apiUrl = 'http://' + this.ip + ':3306/roles/';
    }

    async getAllRoles() {
        try {
            const response = await axios.get(this.apiUrl + 'getAllRoles');
            return response.data;
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw new Error('Error fetching roles from the API');
        }
    }

    async getRoleById(id) {
        try {
            const response = await axios.get(this.apiUrl + 'getRoleById?id=' + id);
            return response.data;
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw new Error('Error fetching roles from the API');
        }
    }  
    async addRole(name) {
        try {
            await axios.post(this.apiUrl + 'addRole', {
                name: name
            });

        } catch (error) {
            console.error('Error adding role:', error);
            throw new Error('Error adding role via the API');
        }
    }
    async deleteRole(id) {
        try {
            await axios.post(this.apiUrl + 'deleteRole', {
                id: id
            });

        } catch (error) {
            console.error('Error delete role:', error);
            throw new Error('Error delete role via the API');
        }
    }
    
}

export default RolesAPI;
