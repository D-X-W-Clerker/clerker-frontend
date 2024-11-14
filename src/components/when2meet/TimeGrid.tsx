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

const TimeBlockButton = styled.button<{
    selectedCount: number;
    disabled: boolean;
}>`
    width: 100%;
    height: 11px;
    border-radius: 4px;
    background-color: ${({ selectedCount }): string => {
        return selectedCount > 0
            ? `rgba(0, 132, 255, ${Math.min(0.1 + selectedCount * 0.3, 1)})`
            : '#d3d3d3';
    }};
    border: none;
    cursor: ${({ disabled }): string => {
        return disabled ? 'not-allowed' : 'pointer';
    }};

    &:hover {
        background-color: ${({ selectedCount, disabled }): string => {
            return disabled
                ? '#d3d3d3'
                : `rgba(0, 132, 255, ${Math.min(0.1 + selectedCount * 0.3, 1)})`;
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
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timeCounts: Record<string, number>;
    selectedTimes: string[];
    toggleTime: (date: string, time: string) => void;
    isDisabled?: boolean;
    isPersonal?: boolean;
};

const TimeGrid: React.FC<TimeGridProps> = ({
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    timeCounts,
    selectedTimes,
    toggleTime,
    isDisabled = false,
    isPersonal = false,
}) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // 날짜와 시간 배열 생성
    const generateDates = (start: string, end: string): string[] => {
        const dates: string[] = [];
        const currentDate = new Date(start);
        const computedEndDate = new Date(end);

        while (currentDate <= computedEndDate) {
            const month = (currentDate.getMonth() + 1)
                .toString()
                .padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            dates.push(`${month}${day}`);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const generateTimes = (start: string, end: string): string[] => {
        const times: string[] = [];
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);

        let currentHour = startHour;
        let currentMinute = startMinute;

        while (
            currentHour < endHour ||
            (currentHour === endHour && currentMinute <= endMinute)
        ) {
            const formattedTime = `${currentHour.toString().padStart(2, '0')}${currentMinute.toString().padStart(2, '0')}`;
            times.push(formattedTime);

            // 30분 단위로 증가
            currentMinute += 30;
            if (currentMinute === 60) {
                currentMinute = 0;
                currentHour += 1;
            }
        }

        return times;
    };

    const computedDates = generateDates(startDate, endDate);
    const computedTimes = generateTimes(startTime, endTime);

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

    const isHalfHour = (time: string): boolean => {
        return time.endsWith('30');
    };

    return (
        <ContentContainer onMouseUp={handleMouseUp}>
            <Title>{title}</Title>
            <GridContainer $dateCount={computedDates.length}>
                <TimeLabel />
                {computedDates.map((date) => {
                    return <TimeLabel key={date}>{date}</TimeLabel>;
                })}

                {computedTimes.map((time) => {
                    return (
                        <React.Fragment key={time}>
                            <TimeLabel>
                                {isHalfHour(time) ? '' : time}
                            </TimeLabel>
                            {computedDates.map((date) => {
                                const timeKey = `${date}-${time}`;
                                const isSelected =
                                    selectedTimes.includes(timeKey);
                                const count = timeCounts[timeKey] || 0;
                                const selectedCount = isPersonal
                                    ? isSelected
                                        ? 1
                                        : 0
                                    : count;

                                return (
                                    <TimeBlockButton
                                        key={timeKey}
                                        selectedCount={selectedCount}
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
