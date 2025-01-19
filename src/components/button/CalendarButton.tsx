import React from 'react';
import styled from 'styled-components';

interface CalendarButtonProps {
    type: 'schedule' | 'cancel';
    isSelectingDates?: boolean; // 기본값 제공
    hasSelectedDates?: boolean; // 기본값 제공
    onClick?: () => void; // 'schedule' 타입일 때 실행할 함수
    onCancel?: () => void; // 'cancel' 타입일 때 실행할 함수
}

const Container = styled.button<{ $isDisabled: boolean }>`
    background-color: ${(props) => {
        return props.$isDisabled
            ? 'var(--color-gray-200)'
            : 'var(--color-blue-100)';
    }};
    color: var(--background-color);
    border: none;
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 10px;
    cursor: ${(props) => {
        return props.$isDisabled ? 'not-allowed' : 'pointer';
    }};

    &:hover {
        background-color: ${(props) => {
            return props.$isDisabled
                ? 'var(--color-gray-200)'
                : 'var(--color-blue-200)';
        }};
    }
`;

const CalendarButton: React.FC<CalendarButtonProps> = ({
    type,
    isSelectingDates = false,
    hasSelectedDates = false,
    onClick,
    onCancel,
}) => {
    const isDisabled =
        type === 'schedule' && isSelectingDates && !hasSelectedDates;

    const handleClick = () => {
        if (type === 'schedule' && onClick) {
            onClick();
        } else if (type === 'cancel' && onCancel) {
            onCancel();
        }
    };

    const buttonLabel =
        type === 'schedule'
            ? isSelectingDates
                ? '일정 추가하기'
                : '회의 일정잡기'
            : '취소';

    return (
        <Container type="button" $isDisabled={isDisabled} onClick={handleClick}>
            {buttonLabel}
        </Container>
    );
};

export default CalendarButton;
