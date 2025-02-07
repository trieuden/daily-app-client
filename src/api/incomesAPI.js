import axios from 'axios';
import { SERVER_IP } from '../config/Config';


class IncomesAPI {
    constructor(apiUrl) {
        this.ip = SERVER_IP;
        this.apiUrl = 'http://' + this.ip + ':3306/incomes/';
    }

    async getAllIncomes() {
        try {
            const response = await axios.get(this.apiUrl + 'getAllIncomes');
            return response.data;
        } catch (error) {
            console.error('Error fetching incomes:', error);
            throw new Error('Error fetching incomes from the API');
        }
    }

    async getIncomeById(id) {
        try {
            const response = await axios.get(this.apiUrl + 'getIncomeById?id=' + id);
            return response.data;
        } catch (error) {
            console.error('Error fetching incomes:', error);
            throw new Error('Error fetching incomes from the API');
        }
    }  
    async getIncomesByUserId(userId) {
        try {
            const response = await axios.get(this.apiUrl + 'getIncomesByUserId?user_id=' + userId);
            return response.data;
        } catch (error) {
            console.error('Error fetching incomes:', error);
            throw new Error('Error fetching incomes from the API');
        }
    }  

    async addIncome(income) {
        try {
            const response = await axios.post(this.apiUrl + 'addIncome', {
                data: income
            });
            return response;
        } catch (error) {
            console.error('Error adding incomes:', error);
            throw new Error('Error adding incomes via the API');
        }
    }
    async deleteIncome(id) {
        try {
            await axios.post(this.apiUrl + 'deleteIncome', {
                id: id
            });

        } catch (error) {
            console.error('Error delete incomes:', error);
            throw new Error('Error delete incomes via the API');
        }
    }
    async updateIncome(income) {
        try {
            const response = await axios.post(this.apiUrl + 'updateIncome', {
                data: income,
            });
            return response
        } catch (error) {
            console.error('Error update incomes:', error);
            throw new Error('Error update incomes via the API');
        }
    }
    
    
}

export default IncomesAPI;
