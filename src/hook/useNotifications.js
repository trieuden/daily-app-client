import { useState, useEffect } from 'react';
import NotificationsAPI from '../api/notificationsAPI';

function useNotifications() {
    const [useNotificationList, setUseNotificationList] = useState(null);

    const notificationsAPI = new NotificationsAPI();


    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const notifications = await notificationsAPI.getAllNotifications();
                setUseNotificationList(notifications);
            } catch (error) {
                console.error('Error fetching notification:', error);
            }
        };

        fetchNotifications();
    }, []);

    const getNotificationById = async (id) => {
        return await notificationsAPI.getNotificationById(id);
    };

    const deleteNotification = async (id) => {
        return await notificationsAPI.deleteNotification(id);
    };

    const addNotification = async (notification) => {
        const notificationsAPI = new NotificationsAPI();
        const newNotification = await notificationsAPI.addNotification(notification)
        return newNotification;
    };

    // Cung cấp các methods và state thông qua hook
    return {
        useNotificationList,
        getNotificationById,
        addNotification,
        deleteNotification,
        // addSpendType,
        // setSpendrTypes // cung cấp phương thức này để có thể cập nhật state từ UI
    };
}

export default useNotifications;
