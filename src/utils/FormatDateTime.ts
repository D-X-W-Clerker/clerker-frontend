export const FormatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export const FormatModalDateTime = (dateTime: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
}): string => {
    const { year, month, day, hour, minute } = dateTime;

    if (!year || !month || !day || !hour || !minute) {
        throw new Error('모든 필드가 입력되지 않았습니다.');
    }

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
};
