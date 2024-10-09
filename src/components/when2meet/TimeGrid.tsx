import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexRow, ItemsCenterRow } from '@styles';

const ContentContainer = styled(ItemsCenterRow)`
  flex-direction: column;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 25px repeat(5, 1fr); /* 1개의 시간 열과 5개의 날짜 열 */
  grid-gap: 2px 5px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: var(--font-medium);
  padding-bottom: 10px;
  margin-top: 44px;
`;

const TimeBlockButton = styled.button<{ selected: boolean }>`
  width: 100%; /* 그리드 너비에 맞춤 */
  height: 11px; /* 블록의 높이 조정 */
  border-radius: 4px;
  background-color: ${({ selected }): string => {
    return selected ? '#6495ED' : '#d3d3d3';
  }};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ selected }): string => {
      return selected ? '#4169E1' : '#A9A9A9';
    }};
  }
`;

const TimeLabel = styled(FlexRow)`
  width: 100%;
  font-size: 10px;
  font-weight: var(--font-normal);
`;

type TimeGridProps = {
  title: string;
  times: string[];
  dates: string[];
  selectedTimes: string[];
  toggleTime: (date: string, time: string) => void;
};

const TimeGrid: React.FC<TimeGridProps> = ({
  title,
  times,
  dates,
  selectedTimes,
  toggleTime,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);

  const handleMouseDown = (date: string, time: string): void => {
    setIsDragging(true);
    toggleTime(date, time); // 드래그 시작 시 첫 번째 선택
    setStartTime(`${date}-${time}`);
  };

  const handleMouseOver = (date: string, time: string): void => {
    if (isDragging) {
      toggleTime(date, time); // 드래그하면서 선택
    }
  };

  const handleMouseUp = (): void => {
    setIsDragging(false); // 드래그 끝
    setStartTime(null); // 선택 초기화
  };

  return (
    <ContentContainer onMouseUp={handleMouseUp}>
      {' '}
      {/* 드래그가 끝나면 상태를 초기화 */}
      <Title>{title}</Title>
      <GridContainer>
        {/* 날짜 헤더 */}
        <TimeLabel />
        {dates.map((date) => {
          return <TimeLabel key={date}>{date}</TimeLabel>;
        })}

        {/* 시간 및 타임 블록 */}
        {times.map((time) => {
          return (
            <React.Fragment key={time}>
              {/* 시간 레이블 */}
              <TimeLabel>{time}</TimeLabel>
              {/* 첫 번째 행: 00분 타임 블록 */}
              {dates.map((date) => {
                return (
                  <TimeBlockButton
                    key={`${date}-${time}-00`}
                    selected={selectedTimes.includes(`${date}-${time}-00`)}
                    onMouseDown={(): void => {
                      return handleMouseDown(date, `${time}-00`);
                    }}
                    onMouseOver={(): void => {
                      return handleMouseOver(date, `${time}-00`);
                    }}
                  />
                );
              })}
              {/* 두 번째 행: 30분 타임 블록 */}
              <TimeLabel /> {/* 빈 시간 레이블을 추가하여 맞춤 */}
              {dates.map((date) => {
                return (
                  <TimeBlockButton
                    key={`${date}-${time}-30`}
                    selected={selectedTimes.includes(`${date}-${time}-30`)}
                    onMouseDown={(): void => {
                      return handleMouseDown(date, `${time}-30`);
                    }}
                    onMouseOver={(): void => {
                      return handleMouseOver(date, `${time}-30`);
                    }}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </GridContainer>
    </ContentContainer>
  );
};

export default TimeGrid;
