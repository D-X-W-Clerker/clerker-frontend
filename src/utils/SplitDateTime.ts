interface DateTimeField {
    label: string;
    value: string;
}

export const SplitDateTime = (dateTime: string): DateTimeField[] => {
    const date = new Date(dateTime);

    // 년, 월, 일, 시, 분을 추출하여 배열로 반환
    return [
        { label: '년', value: date.getFullYear().toString() },
        {
            label: '월',
            value: (date.getMonth() + 1).toString().padStart(2, '0'),
        },
        { label: '일', value: date.getDate().toString().padStart(2, '0') },
        { label: '시', value: date.getHours().toString().padStart(2, '0') },
        { label: '분', value: date.getMinutes().toString().padStart(2, '0') },
    ];
};
