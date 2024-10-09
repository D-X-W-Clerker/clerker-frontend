import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div``;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: var(--font-medium);
  margin-bottom: 10px;
`;

const TimeBlockButton = styled.button<{ selected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 5px;
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
  return (
    <ContentContainer>
      <Title>{title}</Title>
      <GridContainer>
        {times.map((time) => {
          return (
            <React.Fragment key={time}>
              {dates.map((date) => {
                return (
                  <TimeBlockButton
                    key={`${date}-${time}`}
                    selected={selectedTimes.includes(`${date}-${time}`)}
                    onClick={(): void => {
                      toggleTime(date, time);
                    }}
                  >
                    {`${date}-${time}`}
                  </TimeBlockButton>
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
