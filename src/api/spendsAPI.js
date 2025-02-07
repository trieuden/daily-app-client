import axios from 'axios';
import { SERVER_IP } from '../config/Config';


class SpendsAPI {
    constructor(apiUrl) {
        this.ip = SERVER_IP;
        this.apiUrl = 'http://' + this.ip + ':3306/spends/';
    }

    async getAllSpends() {
        try {
            const response = await axios.get(this.apiUrl + 'getAllSpends');
            return response.data;
        } catch (error) {
            console.error('Error fetching spends:', error);
            throw new Error('Error fetching spends from the API');
        }
    }

    async getSpendById(id) {
        try {
            const response = await axios.get(this.apiUrl + 'getSpendById?id=' + id);
            return response.data;
        } catch (error) {
            console.error('Error fetching spends:', error);
            throw new Error('Error fetching spends from the API');
        }
    }  
    async getSpendByUserId(userId) {
        try {
            const response = await axios.get(this.apiUrl + 'getSpendByUserId?user_id=' + userId);
            return response.data;
        } catch (error) {
            console.error('Error fetching spends:', error);
            throw new Error('Error fetching spends from the API');
        }
    }  

    async addSpend(spend) {
        try {
            const response = await axios.post(this.apiUrl + 'addSpend', {
                data: spend
            });
            return response;
        } catch (error) {
            console.error('Error adding spends:', error);
            throw new Error('Error adding spends via the API');
        }
    }
    async deleteSpend(id) {
        try {
            await axios.post(this.apiUrl + 'deleteSpend', {
                id: id
            });

        } catch (error) {
            console.error('Error delete spends:', error);
            throw new Error('Error delete spends via the API');
        }
    }
    async updateSpend(spend) {
        try {
            const response = await axios.post(this.apiUrl + 'updateSpend', {
                data: spend,
            });
            return response
        } catch (error) {
            console.error('Error delete spends:', error);
            throw new Error('Error delete spends via the API');
        }
    }
    
    async getSpendByUserIdAndBetweenDate(userId, startDate, endDate){
        try {
            const response = await axios.get(this.apiUrl + 'getSpendByUserIdAndBetweenDate', {
                params: {
                    userId: userId,
                    startDate: startDate,
                    endDate: endDate
                }
            });
            return response
        } catch (error) {
            console.error('Error get spends:', error);
            throw new Error('Error get spends via the API');
        }
    }
    async getSpendByUserIdAndDate(userId, date) {
        try {
            const response = await axios.get(this.apiUrl + 'getSpendByUserIdAndDate', {
                params: {
                    userId: userId,
                    date: date
                }
            })
            return response[0]
        } catch (error) {
            console.error('Error get spends:', error);
            throw new Error('Error get spends via the API');
        }
    }
    
}

export default SpendsAPI;
