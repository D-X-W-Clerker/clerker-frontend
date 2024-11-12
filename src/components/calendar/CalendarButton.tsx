import React from 'react';
import styled from 'styled-components';

interface CalendarButtonProps {
    isSelectingDates: boolean;
    hasSelectedDates: boolean;
    onClick: () => void;
    onCancel?: () => void;
}

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const Button = styled.button<{
    $isSelectingDates: boolean;
    $hasSelectedDates: boolean;
}>`
    background-color: ${(props) =>
        props.$isSelectingDates && !props.$hasSelectedDates
            ? '#CCCCCC'
            : '#40a3ff'};
    color: #ffffff;
    border: none;
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 10px;
    cursor: ${(props) =>
        props.$isSelectingDates && !props.$hasSelectedDates
            ? 'not-allowed'
            : 'pointer'};

    &:hover {
        background-color: ${(props) =>
            props.$isSelectingDates && !props.$hasSelectedDates
                ? '#CCCCCC'
                : '#3392e6'};
    }
`;

const CancelButton = styled.button`
    background-color: #40a3ff;
    color: #ffffff;
    border: none;
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: #3392e6;
    }
`;

const CalendarButton: React.FC<CalendarButtonProps> = ({
    isSelectingDates,
    hasSelectedDates,
    onClick,
    onCancel,
}) => {
    return (
        <ButtonWrapper>
            {isSelectingDates && onCancel && (
                <CancelButton onClick={onCancel}>취소</CancelButton>
            )}
            <Button
                $isSelectingDates={isSelectingDates}
                $hasSelectedDates={hasSelectedDates}
                onClick={onClick}
            >
                {isSelectingDates ? '일정 추가하기' : '회의 일정잡기'}
            </Button>
        </ButtonWrapper>
    );
};

export default CalendarButton;
