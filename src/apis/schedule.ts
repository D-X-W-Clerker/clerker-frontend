import axios from 'axios';

interface ScheduleRequest {
    timeTable: string[];
}

const apiUrl = process.env.REACT_APP_BASE_URL;
const token = process.env.REACT_APP_TOKEN;

export const postTimeTable = async (
    scheduleID: number,
    data: ScheduleRequest,
): Promise<void> => {
    try {
        const response = await axios.post(
            `${apiUrl}/api/schedule/${scheduleID}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error(`timeTable 보내기에 실패했습니다: ${error}`);
    }
};

export const getTimeTable = async (
    projectID: number,
    scheduleID: number,
): Promise<void> => {
    try {
        const response = await axios.get(
            `${apiUrl}/api/schedule/${projectID}/detail/${scheduleID}`,
        );
        return response.data;
    } catch (error) {
        throw new Error(`timeTable 가져오기에 실패했습니다: ${error}`);
    }
};
