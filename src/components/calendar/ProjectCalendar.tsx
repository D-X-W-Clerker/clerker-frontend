import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CalendarButton from './CalendarButton';
import ScheduleCreateModal from '../modal/schedule/ScheduleCreateModal';
import ScheduleCheckModal from '../modal/schedule/ScheduleCheckModal';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = document.cookie
        .split('; ')
        .find((row) => {
            return row.startsWith('token=');
        })
        ?.split('=')[1];
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

interface ScheduleData {
    scheduleId: string;
    scheduleName: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    isEnded: boolean;
    meetingId?: string;
    name?: string;
}

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
    $isCurrentMonth: boolean;
    $hasEvent?: boolean;
    $isSelected?: boolean;
}

const DayCell = styled.div<DayCellProps>`
    flex: 1;
    padding: 15px 15px;
    font-size: 18px;
    background-color: ${(props) => {
        if (props.$isSelected) return '#40A3FF';
        if (props.$hasEvent) return '#E0F0FF';
        return '#ececec';
    }};
    border-radius: 13px;
    text-align: center;
    margin: 10px 5px;
    cursor: pointer;
    color: ${(props) => {
        return props.$isSelected
            ? '#ffffff'
            : props.$isCurrentMonth
              ? '#000'
              : '#aaa';
    }};

    &:hover {
        background-color: ${(props) => {
            return props.$isSelected ? '#40A3FF' : '#d4e5f6';
        }};
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
    const [selectedSchedules, setSelectedSchedules] = useState<ScheduleData[]>(
        [],
    );

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/schedule/${projectId}`,
                );
                setSchedules(response.data.meetings);
            } catch (error) {
                console.error(
                    '회의 일정 데이터를 가져오는데 실패했습니다:',
                    error,
                );
            }
        };

        // 초기 데이터 로드
        fetchMeetings();

        // 주기적으로 데이터 가져오기 (5초마다 실행)
        const intervalId = setInterval(() => {
             fetchMeetings();
        }, 100);

        // 컴포넌트 언마운트 시 interval 제거
        return () => {
            return clearInterval(intervalId);
        };
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
        setSelectedSchedules([]);
    };

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

    const getWeekdays = (): string[] => {
        return ['일', '월', '화', '수', '목', '금', '토'];
    };

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

    const isSelected = (date: Date): boolean => {
        return selectedStartDate && selectedEndDate
            ? date >= selectedStartDate && date <= selectedEndDate
            : selectedStartDate
              ? isSameDay(selectedStartDate, date)
              : false;
    };

    const handleDateClick = (date: Date): void => {
        if (isSelectingDates) {
            if (!selectedStartDate) setSelectedStartDate(date);
            else if (!selectedEndDate) {
                setSelectedEndDate(
                    date >= selectedStartDate ? date : selectedStartDate,
                );
            } else {
                setSelectedStartDate(date);
                setSelectedEndDate(null);
            }
        } else {
            const schedulesOnDate = schedules.filter((s) => {
                return isSameDay(new Date(s.startDate), date);
            });
            if (schedulesOnDate.length > 0) {
                setSelectedSchedules(schedulesOnDate);
                setIsCheckModalOpen(true);
            }
        }
    };

    const hasEvent = (date: Date): boolean => {
        return schedules.some((schedule) => {
            return isSameDay(new Date(schedule.startDate), date);
        });
    };

    return (
        <CalendarContainer>
            <CalendarNavigation>
                <NavButton onClick={prevMonth}>&lt;</NavButton>
                <MonthYearTitle>{getMonthYear(currentDate)}</MonthYearTitle>
                <NavButton onClick={nextMonth}>&gt;</NavButton>
            </CalendarNavigation>
            <WeekdaysRow>
                {getWeekdays().map((day) => {
                    return <WeekdayCell key={day}>{day}</WeekdayCell>;
                })}
            </WeekdaysRow>
            <DaysGrid>
                {generateCalendar().map((week) => {
                    return (
                        <WeekRow key={week[0].toISOString()}>
                            {week.map((date) => {
                                return (
                                    <DayCell
                                        key={date.toISOString()}
                                        $isCurrentMonth={
                                            date.getMonth() ===
                                            currentDate.getMonth()
                                        }
                                        $hasEvent={hasEvent(date)}
                                        $isSelected={isSelected(date)}
                                        onClick={() => {
                                            return handleDateClick(date);
                                        }}
                                    >
                                        {date.getDate()}
                                        {hasEvent(date) && <EventDot />}
                                    </DayCell>
                                );
                            })}
                        </WeekRow>
                    );
                })}
            </DaysGrid>
            <ScheduleButtonContainer>
                <CalendarButton
                    isSelectingDates={isSelectingDates}
                    hasSelectedDates={!!selectedStartDate}
                    onClick={() => {
                        return isSelectingDates && selectedStartDate
                            ? setIsModalOpen(true)
                            : setIsSelectingDates(!isSelectingDates);
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
            {isCheckModalOpen && selectedSchedules.length > 0 && (
                <ScheduleCheckModal
                    scheduleData={selectedSchedules}
                    onConfirm={closeCheckModal}
                />
            )}
        </CalendarContainer>
    );
};

export default ProjectCalendar;
