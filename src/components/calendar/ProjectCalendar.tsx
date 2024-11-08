import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarButton from './CalendarButton'; // 경로 수정
import ScheduleCreateModal from '../modal/schedule/ScheduleCreateModal'; // 경로 수정
import ScheduleCheckModal from '../modal/schedule/ScheduleCheckModal'; // 경로 수정

const CalendarContainer = styled.div`
    margin-top: 40px;
`;

const CalendarNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
`;

const NavButton = styled.button`
    background-color: transparent;
    border: none;
    color: #000000;
    font-size: 26px;
    cursor: pointer;

    &:hover {
        color: #007bff;
    }
`;

const MonthYearTitle = styled.span`
    font-size: 26px;
    font-weight: bold;
`;

const WeekdaysRow = styled.div`
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-weight: medium;
    color: #2f2f2f;
    margin-top: 25px;
    margin-bottom: 10px;
`;

interface WeekdayCellProps {
    isSunday?: boolean;
    isSaturday?: boolean;
}

const WeekdayCell = styled.div<WeekdayCellProps>`
    width: 14.28%;
    color: ${(props: WeekdayCellProps): string => {
        return props.isSunday
                ? '#ff4343'
                : props.isSaturday
                        ? '#0085ff'
                        : '#2f2f2f';
    }};
    abbr {
        text-decoration: none;
    }
`;

const DaysGrid = styled.div`
    display: flex;
    flex-direction: column;
`;

const WeekRow = styled.div`
    display: flex;
    width: 100%;
`;

interface DayCellProps {
    isCurrentMonth: boolean;
    hasEvent?: boolean;
    isSelected?: boolean;
}

const DayCell = styled.div<DayCellProps>`
    flex: 1;
    padding: 15px 15px;
    font-size: 18px;
    background-color: ${(props: DayCellProps): string => {
        if (props.isSelected) {
            return '#40A3FF';
        }
        if (props.hasEvent) {
            return '#E0F0FF'; // 일정 있는 날 배경색
        }
        return '#ececec';
    }};
    border-radius: 13px;
    text-align: center;
    margin: 10px 5px;
    cursor: pointer;
    color: ${(props: DayCellProps): string => {
        return props.isSelected
                ? '#ffffff'
                : props.isCurrentMonth
                        ? '#000'
                        : '#aaa';
    }};

    &:hover {
        background-color: ${(props: DayCellProps): string => {
            return props.isSelected ? '#40A3FF' : '#d4e5f6';
        }};
    }

    position: relative;
`;

const EventDot = styled.div`
    width: 6px;
    height: 6px;
    background-color: #40a3ff; // 일정 있는 날 점 색상
    border-radius: 50%;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
`;

const ScheduleButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const ProjectCalendar: React.FC = () => {
    const today: Date = new Date();
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [isSelectingDates, setIsSelectingDates] = useState<boolean>(false);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
        null,
    );
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCheckModalOpen, setIsCheckModalOpen] = useState<boolean>(false);

    const closeModal = (): void => {
        setIsModalOpen(false);
        setSelectedStartDate(null);
        setSelectedEndDate(null);
    };

    const closeCheckModal = (): void => {
        setIsCheckModalOpen(false);
    };

    const eventDates: Date[] = [
        new Date(2024, 9, 14), // 기존 일정
        new Date(2024, 9, 20), // 기존 일정
        new Date(2024, 10, 15), // 11월 15일 일정 추가 (11월은 10번째 월)
    ];

    const getMonthYear = (date: Date): string => {
        return date.toLocaleString('ko-KR', { year: 'numeric', month: 'long' });
    };

    const prevMonth = (): void => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );
    };

    const nextMonth = (): void => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
        );
    };

    const getWeekdays = (): string[] => [
        '일',
        '월',
        '화',
        '수',
        '목',
        '금',
        '토',
    ];

    const generateCalendar = (): Date[][] => {
        const startOfMonth: Date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1,
        );
        const endOfMonth: Date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
        );
        const dates: Date[][] = [];
        const current: Date = new Date(startOfMonth);
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

    const isSameDay = (date1: Date, date2: Date): boolean => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const isBetweenDates = (
        date: Date,
        startDate: Date,
        endDate: Date,
    ): boolean => {
        const time = date.getTime();
        return time >= startDate.getTime() && time <= endDate.getTime();
    };

    const handleDateClick = (date: Date): void => {
        if (isSelectingDates) {
            if (!selectedStartDate) {
                setSelectedStartDate(date);
            } else if (!selectedEndDate) {
                setSelectedEndDate(
                    date >= selectedStartDate ? date : selectedStartDate,
                );
                if (date < selectedStartDate) setSelectedStartDate(date);
            } else {
                setSelectedStartDate(date);
                setSelectedEndDate(null);
            }
        } else {
            setIsCheckModalOpen(true);
        }
    };

    const isSelected = (date: Date): boolean => {
        if (selectedStartDate && selectedEndDate) {
            return isBetweenDates(date, selectedStartDate, selectedEndDate);
        }
        return selectedStartDate ? isSameDay(selectedStartDate, date) : false;
    };

    const handleScheduleButtonClick = (): void => {
        if (isSelectingDates && selectedStartDate) {
            setIsModalOpen(true);
            setIsSelectingDates(false);
        } else {
            setIsSelectingDates(true);
            setSelectedStartDate(null);
            setSelectedEndDate(null);
        }
    };

    return (
        <CalendarContainer>
            <CalendarNavigation>
                <NavButton type="button" onClick={prevMonth}>
                    &lt;
                </NavButton>
                <MonthYearTitle>{getMonthYear(currentDate)}</MonthYearTitle>
                <NavButton type="button" onClick={nextMonth}>
                    &gt;
                </NavButton>
            </CalendarNavigation>
            <WeekdaysRow>
                {getWeekdays().map((day, index) => (
                    <WeekdayCell
                        key={day}
                        isSunday={index === 0}
                        isSaturday={index === 6}
                    >
                        <abbr title={day}>{day}</abbr>
                    </WeekdayCell>
                ))}
            </WeekdaysRow>
            <DaysGrid>
                {generateCalendar().map((week) => (
                    <WeekRow key={week[0].toISOString()}>
                        {week.map((date) => {
                            const isCurrentMonth =
                                date.getMonth() === currentDate.getMonth();
                            const hasEvent = eventDates.some((eventDate) =>
                                isSameDay(eventDate, date),
                            );

                            return (
                                <DayCell
                                    key={date.toISOString()}
                                    isCurrentMonth={isCurrentMonth}
                                    hasEvent={hasEvent}
                                    isSelected={isSelected(date)}
                                    onClick={() => handleDateClick(date)}
                                >
                                    {date.getDate()}
                                    {hasEvent && <EventDot />}
                                </DayCell>
                            );
                        })}
                    </WeekRow>
                ))}
            </DaysGrid>
            <ScheduleButtonContainer>
                <CalendarButton
                    isSelectingDates={isSelectingDates}
                    hasSelectedDates={!!selectedStartDate}
                    onClick={handleScheduleButtonClick}
                    onCancel={() => {
                        setIsSelectingDates(false);
                        setSelectedStartDate(null);
                        setSelectedEndDate(null);
                    }}
                />
            </ScheduleButtonContainer>

            {isModalOpen && (
                <ScheduleCreateModal projectId="1234" onCancel={closeModal} />
            )}

            {isCheckModalOpen && (
                <ScheduleCheckModal
                    scheduleName="일정 제목" // 임시 더미 데이터
                    dateTime="2024-11-15T10:30:00" // 임시 더미 날짜 데이터
                    onConfirm={closeCheckModal}
                />
            )}
        </CalendarContainer>
    );
};

export default ProjectCalendar;
