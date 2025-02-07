import axios from 'axios';
import { SERVER_IP } from '../config/Config';


class SpendItemsAPI {
    constructor(apiUrl) {
        this.ip = SERVER_IP;
        this.apiUrl = 'http://' + this.ip + ':3306/spendItems/';
    }

    async getAllSpendItems() {
        try {
            const response = await axios.get(this.apiUrl + 'getAllSpendItems');
            return response.data;
        } catch (error) {
            console.error('Error fetching spendItems:', error);
            throw new Error('Error fetching spendItems from the API');
        }
    }

    async getSpendItemById(id) {
        try {
            const response = await axios.get(this.apiUrl + 'getSpendItemById?id=' + id);
            return response.data;
        } catch (error) {
            console.error('Error fetching spendItems:', error);
            throw new Error('Error fetching spendItems from the API');
        }
    }  
    async addSpendItem(spendItem) {
        try {
            const response = await axios.post(this.apiUrl + 'addSpendItem', {
                data: spendItem
            });
            return response;

        } catch (error) {
            console.error('Error adding spendItems:', error);
            throw new Error('Error adding spendItems via the API');
        }
    }
    async deleteSpendItem(id) {
        try {
            await axios.post(this.apiUrl + 'deleteSpendItem', {
                id: id
            });

        } catch (error) {
            console.error('Error delete spendItems:', error);
            throw new Error('Error delete spendItems via the API');
        }
    }
    
}

export default SpendItemsAPI;
