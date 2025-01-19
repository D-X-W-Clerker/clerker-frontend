export const getMonthYear = (date: Date): string => {
    return date.toLocaleString('ko-KR', { year: 'numeric', month: 'long' });
};

export const generateCalendar = (currentDate: Date): Date[][] => {
    const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
    );
    const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
    );
    const dates: Date[][] = [];
    const current = new Date(startOfMonth);
    current.setDate(current.getDate() - current.getDay());

    while (current <= endOfMonth || current.getDay() !== 0) {
        const week: Date[] = [];
        for (let i = 0; i < 7; i += 1) {
            week.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        dates.push(week);
    }

    return dates;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};
