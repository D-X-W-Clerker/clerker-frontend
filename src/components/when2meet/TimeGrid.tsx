import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexRow, ItemsCenterRow } from '@styles';

const ContentContainer = styled(ItemsCenterRow)`
  flex-direction: column;
`;

const GridContainer = styled.div<{ $dateCount: number }>`
  display: grid;
  grid-template-columns: 25px repeat(
      ${({ $dateCount }): number => {
        return $dateCount;
      }},
      1fr
    );
  grid-gap: 2px 5px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: var(--font-medium);
  padding-bottom: 10px;
  margin-top: 44px;
`;

const TimeBlockButton = styled.button<{ selected: boolean; disabled: boolean }>`
  width: 100%;
  height: 11px;
  border-radius: 4px;
  background-color: ${({ selected }): string => {
    return selected ? '#6495ED' : '#d3d3d3';
  }};
  border: none;
  cursor: ${({ disabled }): string => {
    return disabled ? 'not-allowed' : 'pointer';
  }};

  &:hover {
    background-color: ${({ selected, disabled }): string => {
      return selected ? '#6495ED' : disabled ? '#d3d3d3' : '#A9A9A9';
    }};
  }

  &:active {
    background-color: #1e90ff;
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
  isDisabled?: boolean;
};

const TimeGrid: React.FC<TimeGridProps> = ({
  title,
  times,
  dates,
  selectedTimes,
  toggleTime,
  isDisabled = false,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMouseDown = (date: string, time: string): void => {
    if (isDisabled) return;
    setIsDragging(true);
    toggleTime(date, time);
  };

  const handleMouseOver = (date: string, time: string): void => {
    if (isDragging && !isDisabled) {
      toggleTime(date, time);
    }
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  // 정각인지 30분인지 확인하는 함수
  const isHalfHour = (time: string): boolean => {
    return time.endsWith('30');
  };

  return (
    <ContentContainer onMouseUp={handleMouseUp}>
      <Title>{title}</Title>
      <GridContainer $dateCount={dates.length}>
        <TimeLabel />
        {dates.map((date) => {
          return <TimeLabel key={date}>{date}</TimeLabel>;
        })}

        {times.map((time) => {
          return (
            <React.Fragment key={time}>
              {/* 정각이면 시간 표시, 30분이면 빈 라벨 */}
              <TimeLabel>{isHalfHour(time) ? '' : time}</TimeLabel>
              {dates.map((date) => {
                const timeKey = `${date}-${time}`;

                return (
                  <TimeBlockButton
                    key={timeKey}
                    selected={selectedTimes.includes(timeKey)}
                    onMouseDown={(): void => {
                      return handleMouseDown(date, time);
                    }}
                    onMouseOver={(): void => {
                      return handleMouseOver(date, time);
                    }}
                    disabled={isDisabled}
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
