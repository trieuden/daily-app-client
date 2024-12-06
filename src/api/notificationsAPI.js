import axios from 'axios';
import { SERVER_IP } from '../config/config';


class NotificationsAPI {
    constructor(apiUrl) {
        this.ip = SERVER_IP;
        this.apiUrl = 'http://' + this.ip + ':3306/notifications/';
    }

    async getAllNotifications() {
        try {
            const response = await axios.get(this.apiUrl + 'getAllNotifications');
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw new Error('Error fetching notifications the API');
        }
    }

    async getNotificationById(id) {
        try {
            const response = await axios.get(this.apiUrl + 'getNotificationById?id=' + id);
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw new Error('Error fetching notifications from the API');
        }
    }  
    async addNotification(notification) {
        try {
            const response = await axios.post(this.apiUrl + 'addNotification', {
                data: notification
            });
            return response;
        } catch (error) {
            console.error('Error adding notifications:', error);
            throw new Error('Error adding notifications via the API');
        }
    }
    async deleteNotification(id) {
        try {
            await axios.post(this.apiUrl + 'deleteNotification', {
                id: id
            });

        } catch (error) {
            console.error('Error delete notifications:', error);
            throw new Error('Error delete notifications via the API');
        }
    }
    
    
}

export default NotificationsAPI;
