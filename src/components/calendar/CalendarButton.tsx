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
  gap: 10px; /* 버튼 간의 간격 */
  margin-top: -2%;
`;

const Button = styled.button<CalendarButtonProps>`
  background-color: ${(props): string => {
    return props.isSelectingDates && !props.hasSelectedDates
      ? '#CCCCCC'
      : '#40a3ff';
  }};
  color: #ffffff;
  border: none;
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${(props): string => {
      return props.isSelectingDates && !props.hasSelectedDates
        ? '#CCCCCC'
        : '#3392e6';
    }};
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
        <CancelButton type="button" onClick={onCancel}>
          취소
        </CancelButton>
      )}
      <Button
        type="button"
        isSelectingDates={isSelectingDates}
        hasSelectedDates={hasSelectedDates}
        onClick={onClick}
        disabled={isSelectingDates && !hasSelectedDates}
      >
        {isSelectingDates ? '일정 추가하기' : '회의 일정잡기'}
      </Button>
    </ButtonWrapper>
  );
};

// 기본값 설정
CalendarButton.defaultProps = {
  onCancel: () => {}, // 기본값으로 빈 함수 설정
};

export default CalendarButton;
