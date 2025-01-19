import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import {
    ScheduleCreateModal,
    ScheduleCheckModal,
    CalendarButton,
} from '@components';
import {
    FlexCol,
    FlexRow,
    ItemsCenterEndRow,
    ItemsCenterRow,
    ItemsCenterSpaceRow,
} from '@styles';
import { getMonthYear, generateCalendar, isSameDay } from '@utils';
// const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
// });

// axiosInstance.interceptors.request.use((config) => {
//     const token = document.cookie
//         .split('; ')
//         .find((row) => row.startsWith('token='))
//         ?.split('=')[1];
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

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

interface DayCellProps {
    $isCurrentMonth: boolean;
    $hasEvent?: boolean;
    $isSelected?: boolean;
}

interface ProjectCalendarProps {
    projectId: string;
    addSchedule: (newSchedule: ScheduleData) => void;
}

// 레이아웃 스타일
const Container = styled(FlexCol)`
    margin-top: 44px;
    gap: 20px;
`;

const NavArea = styled(ItemsCenterSpaceRow)`
    padding: 0 20px;
`;

const WeekdaysArea = styled(ItemsCenterRow)``;

const ScheduleButtonArea = styled(ItemsCenterEndRow)`
    gap: 10px;
`;

// 컴포넌트 스타일
const NavButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 30px;
    cursor: pointer;

    &:hover {
        color: var(--color-blue-200);
    }
`;

const MonthYearTitle = styled.span`
    font-size: 26px;
    font-weight: var(--font-bold);
`;

const WeekdayCell = styled.div`
    flex: 1;
    text-align: center;
    font-size: 20px;
    font-weight: var(--font-medium);
    color: var(--color-gray-700);
`;

const DaysArea = styled(FlexCol)`
    gap: 20px;
`;

const WeekRow = styled(FlexRow)`
    width: 100%;
    gap: 10px;
`;

const DayCell = styled.div<DayCellProps>`
    flex: 1;
    position: relative;
    padding: 15px;
    font-size: 18px;
    border-radius: 13px;
    text-align: center;
    cursor: pointer;
    background-color: ${(props) => {
        if (props.$isSelected) return 'var(--color-blue-100)';
        if (props.$hasEvent) return '#E0F0FF';
        return 'var(--color-gray-50)';
    }};
    color: ${(props) => {
        return props.$isSelected
            ? 'var(--background-color)'
            : props.$isCurrentMonth
              ? '#000'
              : '#aaa';
    }};

    &:hover {
        background-color: ${(props) => {
            return props.$isSelected ? 'var(--color-blue-100)' : '#d4e5f6';
        }};
    }
`;

const EventDot = styled.div`
    width: 6px;
    height: 6px;
    background-color: var(--color-blue-100);
    border-radius: 50%;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
`;

const weekdays: string[] = ['일', '월', '화', '수', '목', '금', '토'];

const dummySchedules: ScheduleData[] = [
    {
        scheduleId: '1',
        scheduleName: 'Team Meeting',
        startDate: '2025-01-10',
        endDate: '2025-01-10',
        startTime: '10:00',
        endTime: '11:00',
        createdAt: '2025-01-01',
        isEnded: false,
    },
    {
        scheduleId: '2',
        scheduleName: 'Project Deadline',
        startDate: '2025-01-15',
        endDate: '2025-01-15',
        startTime: '12:00',
        endTime: '13:00',
        createdAt: '2025-01-05',
        isEnded: false,
    },
    {
        scheduleId: '3',
        scheduleName: 'Client Presentation',
        startDate: '2025-01-15',
        endDate: '2025-01-15',
        startTime: '15:00',
        endTime: '16:00',
        createdAt: '2025-01-07',
        isEnded: false,
    },
];

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
    const [schedules, setSchedules] = useState<ScheduleData[]>(dummySchedules);
    const [selectedSchedules, setSelectedSchedules] = useState<ScheduleData[]>(
        [],
    );

    useEffect(() => {
        // const fetchMeetings = async () => {
        //     try {
        //         const response = await axiosInstance.get(
        //             `/api/schedule/${projectId}`,
        //         );
        //         setSchedules(response.data.meetings);
        //     } catch (error) {
        //         console.error(
        //             '회의 일정 데이터를 가져오는데 실패했습니다:',
        //             error,
        //         );
        //     }
        // };

        // 초기 데이터 로드
        // fetchMeetings();

        // 주기적으로 데이터 가져오기 (5초마다 실행)
        const intervalId = setInterval(() => {
            // fetchMeetings();
        }, 100);

        // 컴포넌트 언마운트 시 interval 제거
        return () => {
            clearInterval(intervalId);
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

    const isSelected = (date: Date): boolean => {
        return selectedStartDate && selectedEndDate
            ? date >= selectedStartDate && date <= selectedEndDate
            : selectedStartDate
              ? isSameDay(selectedStartDate, date)
              : false;
    };

    const onClickDate = (date: Date): void => {
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
        <Container>
            <NavArea>
                <NavButton onClick={prevMonth}>&lt;</NavButton>
                <MonthYearTitle>{getMonthYear(currentDate)}</MonthYearTitle>
                <NavButton onClick={nextMonth}>&gt;</NavButton>
            </NavArea>
            <WeekdaysArea>
                {weekdays.map((day) => {
                    return <WeekdayCell key={day}>{day}</WeekdayCell>;
                })}
            </WeekdaysArea>
            <DaysArea>
                {generateCalendar(currentDate).map((week) => {
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
                                            return onClickDate(date);
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
            </DaysArea>
            <ScheduleButtonArea>
                {isSelectingDates && (
                    <CalendarButton
                        type="cancel"
                        onCancel={() => {
                            resetSelection();
                            setIsSelectingDates(false);
                        }}
                    />
                )}
                <CalendarButton
                    type="schedule"
                    isSelectingDates={isSelectingDates}
                    hasSelectedDates={!!selectedStartDate}
                    onClick={() => {
                        return isSelectingDates && selectedStartDate
                            ? setIsModalOpen(true)
                            : setIsSelectingDates(!isSelectingDates);
                    }}
                />
            </ScheduleButtonArea>
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
        </Container>
    );
};

export default ProjectCalendar;
