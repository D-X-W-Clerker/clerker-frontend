import axios from 'axios';
import { useAuthStore } from '@store';

interface Notification {
    notificationId: string;
    content: string;
    createdAt: string;
}

const apiUrl = process.env.REACT_APP_BASE_URL;

export const getNotification = async (): Promise<Notification[]> => {
    try {
        const { token } = useAuthStore.getState();

        const response = await axios.get<Notification[]>(
            `${apiUrl}/api/notify`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`notification 가져오기에 실패했습니다: ${error}`);
    }
};

export const deleteNotification = async (
    notificationID: string,
): Promise<void> => {
    try {
        const { token } = useAuthStore.getState();
        const response = await axios.delete(
            `${apiUrl}/api/notify/${notificationID}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                params: { notificationID },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`notification 지우기에 실패했습니다: ${error}`);
    }
};
