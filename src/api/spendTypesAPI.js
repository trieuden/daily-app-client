import axios from 'axios';
import { SERVER_IP } from '../config/Config';

class SpendTypesAPI {
    constructor(apiUrl) {
        this.ip = SERVER_IP;
        this.apiUrl = 'http://' + this.ip + ':3306/spendTypes/';
    }

    async getAllSpendTypes() {
        try {
            const response = await axios.get(this.apiUrl + 'getAllSpendTypes');
            return response.data;
        } catch (error) {
            console.error('Error fetching spendTypes:', error);
            throw new Error('Error fetching spendTypes from the API');
        }
    }
    async getSpendTypeById(id) {
        try {
            const response = await axios.get(this.apiUrl + 'getSpendTypeById?id=' + id);
            return response.data;
        } catch (error) {
            console.error('Error fetching spendTypes:', error);
            throw new Error('Error fetching spendTypes from the API');
        }
    }
    async addSpendType(spendType) {
        try {
            const response = await axios.post(this.apiUrl + 'addSpendType', {
                data: spendType
            });
            return response;
        } catch (error) {
            console.error('Error adding spend type:', error);
            throw new Error('Error adding spend type via the API');
        }
    }
}

export default SpendTypesAPI;
