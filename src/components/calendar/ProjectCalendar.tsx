import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarButton from './CalendarButton'; // CalendarButton 컴포넌트 import

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
      return '#40A3FF'; // 선택된 날짜 색상
    }
    if (props.hasEvent) {
      return '#e0f0ff'; // 일정 있는 날 색상
    }
    return '#ececec'; // 기본 배경색
  }};
  border-radius: 13px;
  text-align: center;
  margin: 10px 5px;
  cursor: pointer;
  color: ${(props: DayCellProps): string => {
    return props.isCurrentMonth ? '#000' : '#aaa';
  }};

  &:hover {
    background-color: ${(props: DayCellProps): string => {
      return props.isSelected ? '#40A3FF' : '#d4e5f6'; // hover 시 색상 유지
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

const ProjectCalendar: React.FC = () => {
  const today: Date = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isSelectingDates, setIsSelectingDates] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  // 일정이 있는 날짜 목록
  const eventDates: Date[] = [
    new Date(2024, 9, 14), // 2024년 10월 14일에 일정
    new Date(2024, 9, 20), // 2024년 10월 20일에 일정
    // 추가 일정...
  ];

  // 월과 연도를 가져오는 함수
  const getMonthYear = (date: Date): string => {
    return date.toLocaleString('ko-KR', { year: 'numeric', month: 'long' });
  };

  // 이전 달로 이동하는 함수
  const prevMonth = (): void => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  // 다음 달로 이동하는 함수
  const nextMonth = (): void => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // 요일 배열을 반환하는 함수
  const getWeekdays = (): string[] => {
    return ['일', '월', '화', '수', '목', '금', '토'];
  };

  // 달력을 생성하는 함수
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

  // 두 날짜가 같은 날인지 확인하는 함수
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 날짜가 두 날짜 사이에 있는지 확인하는 함수
  const isBetweenDates = (
    date: Date,
    startDate: Date,
    endDate: Date,
  ): boolean => {
    const time = date.getTime();
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    return time >= startTime && time <= endTime;
  };

  // 날짜 클릭 이벤트 처리 함수
  const handleDateClick = (date: Date): void => {
    if (isSelectingDates) {
      if (!selectedStartDate) {
        setSelectedStartDate(date);
      } else if (!selectedEndDate) {
        if (date >= selectedStartDate) {
          setSelectedEndDate(date);
        } else {
          setSelectedEndDate(selectedStartDate);
          setSelectedStartDate(date);
        }
      } else {
        // 이미 두 날짜가 선택된 경우, 선택 초기화하고 새로 시작
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      }
    } else {
      console.log(date);
    }
  };

  // 날짜가 선택되었는지 확인하는 함수
  const isSelected = (date: Date): boolean => {
    if (selectedStartDate && selectedEndDate) {
      return isBetweenDates(date, selectedStartDate, selectedEndDate);
    } else if (selectedStartDate) {
      return isSameDay(selectedStartDate, date);
    }
    return false;
  };

  const dates: Date[][] = generateCalendar();

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
        {getWeekdays().map(
          (day: string, index: number): JSX.Element => (
            <WeekdayCell
              key={day}
              isSunday={index === 0}
              isSaturday={index === 6}
            >
              <abbr title={day}>{day}</abbr>
            </WeekdayCell>
          ),
        )}
      </WeekdaysRow>
      <DaysGrid>
        {dates.map(
          (week: Date[]): JSX.Element => (
            <WeekRow key={week[0].toISOString()}>
              {week.map((date: Date): JSX.Element => {
                const isCurrentMonth: boolean =
                  date.getMonth() === currentDate.getMonth();

                // 일정이 있는 날짜인지 확인
                const hasEvent: boolean = eventDates.some(
                  (eventDate: Date): boolean => isSameDay(eventDate, date),
                );

                return (
                  <DayCell
                    key={date.toISOString()}
                    isCurrentMonth={isCurrentMonth}
                    hasEvent={hasEvent}
                    isSelected={isSelected(date)}
                    onClick={() => {
                      handleDateClick(date);
                    }}
                  >
                    {date.getDate()}
                    {hasEvent && <EventDot />}
                  </DayCell>
                );
              })}
            </WeekRow>
          ),
        )}
      </DaysGrid>
      <ScheduleButtonContainer>
        <CalendarButton
          isSelectingDates={isSelectingDates}
          hasSelectedDates={!!selectedStartDate}
          onClick={() => {
            if (isSelectingDates) {
              if (selectedStartDate) {
                console.log('선택된 시작 날짜:', selectedStartDate);
                if (selectedEndDate) {
                  console.log('선택된 종료 날짜:', selectedEndDate);
                } else {
                  console.log('종료 날짜는 선택되지 않았습니다.');
                }
                // 여기서 일정 추가 로직을 구현하세요.

                // 선택 초기화
                setIsSelectingDates(false);
                setSelectedStartDate(null);
                setSelectedEndDate(null);
              } else {
                console.log('날짜를 선택하세요.');
              }
            } else {
              setIsSelectingDates(true);
              setSelectedStartDate(null);
              setSelectedEndDate(null);
              console.log('회의 일정잡기 버튼 클릭');
            }
          }}
          onCancel={() => {
            setIsSelectingDates(false);
            setSelectedStartDate(null);
            setSelectedEndDate(null);
            console.log('취소 버튼 클릭');
          }}
        />
      </ScheduleButtonContainer>
    </CalendarContainer>
  );
};

export default ProjectCalendar;
