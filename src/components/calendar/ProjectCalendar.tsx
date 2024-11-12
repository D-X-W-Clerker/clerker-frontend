import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CalendarButton from './CalendarButton';
import ScheduleCreateModal from '../modal/schedule/ScheduleCreateModal';
import ScheduleCheckModal from '../modal/schedule/ScheduleCheckModal';

// ScheduleData 인터페이스 정의
interface TimeData {
    hour: string;
    minute: string;
    second: string;
    nano: string;
}

interface ScheduleData {
    scheduleId: string;
    scheduleName: string;
    startDate: string;
    endDate: string;
    startTime: TimeData;
    endTime: TimeData;
    createdAt: string;
    isEnded: boolean;
}

// 스타일 컴포넌트
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

const WeekdayCell = styled.div`
    width: 14.28%;
    text-align: center;
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
    background-color: ${(props) => {
        if (props.isSelected) return '#40A3FF';
        if (props.hasEvent) return '#E0F0FF';
        return '#ececec';
    }};
    border-radius: 13px;
    text-align: center;
    margin: 10px 5px;
    cursor: pointer;
    color: ${(props) =>
        props.isSelected ? '#ffffff' : props.isCurrentMonth ? '#000' : '#aaa'};

    &:hover {
        background-color: ${(props) =>
            props.isSelected ? '#40A3FF' : '#d4e5f6'};
    }

    position: relative;
`;

const EventDot = styled.div`
    width: 6px;
    height: 6px;
    background-color: #40a3ff;
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

// Props 인터페이스
interface ProjectCalendarProps {
    projectId: string;
    addSchedule: (newSchedule: ScheduleData) => void;
}

const ProjectCalendar: React.FC<ProjectCalendarProps> = ({
    projectId,
    addSchedule,
}) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [isSelectingDates, setIsSelectingDates] = useState<boolean>(false);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
        null,
    );
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCheckModalOpen, setIsCheckModalOpen] = useState<boolean>(false);
    const [schedules, setSchedules] = useState<ScheduleData[]>([]);
    const [selectedSchedule, setSelectedSchedule] =
        useState<ScheduleData | null>(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get(`/api/schedule/${projectId}`);
                const fetchedSchedules = response.data.schedules.map(
                    (schedule: any): ScheduleData => ({
                        ...schedule,
                        startTime: {
                            hour: String(schedule.startTime.hour),
                            minute: String(schedule.startTime.minute),
                            second: String(schedule.startTime.second),
                            nano: String(schedule.startTime.nano),
                        },
                        endTime: {
                            hour: String(schedule.endTime.hour),
                            minute: String(schedule.endTime.minute),
                            second: String(schedule.endTime.second),
                            nano: String(schedule.endTime.nano),
                        },
                    }),
                );
                setSchedules(fetchedSchedules);
            } catch (error) {
                console.error('Failed to fetch schedules:', error);
            }
        };

        fetchSchedules();
    }, [projectId]);

    const resetSelection = (): void => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
        resetSelection();
        setIsSelectingDates(false);
    };

    const closeCheckModal = (): void => {
        setIsCheckModalOpen(false);
        setSelectedSchedule(null); // 선택된 일정 초기화
    };

    const getMonthYear = (date: Date): string =>
        date.toLocaleString('ko-KR', { year: 'numeric', month: 'long' });

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
            for (let i = 0; i < 7; i++) {
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

    const isSelected = (date: Date): boolean => {
        if (selectedStartDate && selectedEndDate) {
            return date >= selectedStartDate && date <= selectedEndDate;
        }
        return selectedStartDate ? isSameDay(selectedStartDate, date) : false;
    };

    const handleDateClick = (date: Date): void => {
        if (isSelectingDates) {
            if (!selectedStartDate) {
                setSelectedStartDate(date);
            } else if (!selectedEndDate) {
                setSelectedEndDate(
                    date >= selectedStartDate ? date : selectedStartDate,
                );
            } else {
                setSelectedStartDate(date);
                setSelectedEndDate(null);
            }
        } else {
            const schedule = schedules.find((s) =>
                isSameDay(new Date(s.startDate), date),
            );
            if (schedule) {
                setSelectedSchedule(schedule);
                setIsCheckModalOpen(true);
            }
        }
    };

    const hasEvent = (date: Date): boolean => {
        return schedules.some((schedule) =>
            isSameDay(new Date(schedule.startDate), date),
        );
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
                {getWeekdays().map((day) => (
                    <WeekdayCell key={day}>{day}</WeekdayCell>
                ))}
            </WeekdaysRow>
            <DaysGrid>
                {generateCalendar().map((week) => (
                    <WeekRow key={week[0].toISOString()}>
                        {week.map((date) => (
                            <DayCell
                                key={date.toISOString()}
                                isCurrentMonth={
                                    date.getMonth() === currentDate.getMonth()
                                }
                                hasEvent={hasEvent(date)}
                                isSelected={isSelected(date)}
                                onClick={() => handleDateClick(date)}
                            >
                                {date.getDate()}
                                {hasEvent(date) && <EventDot />}
                            </DayCell>
                        ))}
                    </WeekRow>
                ))}
            </DaysGrid>
            <ScheduleButtonContainer>
                <CalendarButton
                    isSelectingDates={isSelectingDates}
                    hasSelectedDates={!!selectedStartDate}
                    onClick={() => {
                        if (isSelectingDates && selectedStartDate) {
                            setIsModalOpen(true);
                        } else {
                            setIsSelectingDates(!isSelectingDates);
                        }
                    }}
                    onCancel={() => {
                        resetSelection();
                        setIsSelectingDates(false);
                    }}
                />
            </ScheduleButtonContainer>
            {isModalOpen && selectedStartDate && selectedEndDate && (
                <ScheduleCreateModal
                    projectId={projectId}
                    onCancel={closeModal}
                    onCreate={(newSchedule: ScheduleData) => {
                        addSchedule(newSchedule);
                        closeModal();
                    }}
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                />
            )}
            {isCheckModalOpen && selectedSchedule && (
                <ScheduleCheckModal
                    scheduleName={selectedSchedule.scheduleName}
                    dateTime={selectedSchedule.startDate}
                    onConfirm={closeCheckModal}
                />
            )}
        </CalendarContainer>
    );
};

export default ProjectCalendar;
