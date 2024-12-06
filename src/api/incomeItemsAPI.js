import axios from 'axios';
import { SERVER_IP } from '../config/config';


class IncomeItemsAPI {
    constructor(apiUrl) {
        this.ip = SERVER_IP;
        this.apiUrl = 'http://' + this.ip + ':3306/incomeItems/';
    }

    async getAllIncomeItems() {
        try {
            const response = await axios.get(this.apiUrl + 'getAllIncomeItems');
            return response.data;
        } catch (error) {
            console.error('Error fetching incomeItems:', error);
            throw new Error('Error fetching incomeItems from the API');
        }
    }

    async getIncomeItemById(id) {
        try {
            const response = await axios.get(this.apiUrl + 'getIncomeItemById?id=' + id);
            return response.data;
        } catch (error) {
            console.error('Error fetching incomeItems:', error);
            throw new Error('Error fetching incomeItems from the API');
        }
    }  
    async addIncomeItem(incomeItem) {
        try {
            const response = await axios.post(this.apiUrl + 'addIncomeItem', {
                data: incomeItem
            });
            return response;

        } catch (error) {
            console.error('Error adding incomeItems:', error);
            throw new Error('Error adding incomeItems via the API');
        }
    }
    async deleteIncomeItem(id) {
        try {
            await axios.post(this.apiUrl + 'deleteIncomeItem', {
                id: id
            });

        } catch (error) {
            console.error('Error delete incomeItems:', error);
            throw new Error('Error delete incomeItems via the API');
        }
    }
    
}

export default IncomeItemsAPI;
