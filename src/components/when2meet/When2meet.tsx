import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TimeGrid, MemberTable, ModalButton } from '@components';
import { FlexCol, JustifyCenterRow, ItemsCenterEndRow } from '@styles';

const TimeGridContainer = styled(JustifyCenterRow)`
  gap: 25px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: var(--font-medium);
  padding-bottom: 6px;
  margin-top: 10px;
`;

const MemberContainer = styled(FlexCol)``;

const ButtonContainer = styled(ItemsCenterEndRow)`
  gap: 7px;
`;

const myInfo = {
  username: '황현진',
  email: 'jjini6530@kookmin.ac.kr',
  type: 'member',
  role: 'FE',
  timeTables: [],
};

const fetchEventData = async (): Promise<{
  times: string[];
  dates: string[];
  members: {
    username: string;
    email: string;
    type: string;
    role: string;
    timeTables: { time: string }[];
  }[];
}> => {
  return {
    times: [
      '0800',
      '0830',
      '0900',
      '0930',
      '1000',
      '1030',
      '1100',
      '1130',
      '1200',
      '1230',
      '1300',
      '1330',
      '1400',
      '1430',
      '1500',
      '1530',
      '1600',
      '1630',
      '1700',
      '1730',
      '1800',
      '1830',
      '1900',
      '1930',
      '2000',
      '2030',
      '2100',
      '2130',
    ],
    dates: ['1006', '1007', '1008', '1009', '1010'],
    members: [
      {
        username: '류건',
        email: 'sksnsfbjrjs@kookmin.ac.kr',
        type: 'owner',
        role: 'BE',
        timeTables: [
          { time: '2024-10-06 16:00:00' },
          { time: '2024-10-06 16:30:00' },
          { time: '2024-10-06 17:00:00' },
          { time: '2024-10-06 17:30:00' },
          { time: '2024-10-06 18:00:00' },
          { time: '2024-10-06 18:30:00' },
          { time: '2024-10-06 19:00:00' },
          { time: '2024-10-06 19:30:00' },
          { time: '2024-10-06 20:00:00' },
          { time: '2024-10-06 20:30:00' },
        ],
      },
      {
        username: '신진욱',
        email: 'jinwook2765@kookmin.ac.kr',
        type: 'member',
        role: 'FE',
        timeTables: [
          { time: '2024-10-06 16:00:00' },
          { time: '2024-10-06 16:30:00' },
          { time: '2024-10-06 17:00:00' },
          { time: '2024-10-06 17:30:00' },
          { time: '2024-10-07 16:00:00' },
          { time: '2024-10-07 16:30:00' },
          { time: '2024-10-07 17:00:00' },
          { time: '2024-10-07 17:30:00' },
        ],
      },
    ],
  };
};

const When2meet: React.FC = () => {
  const [personalAvailable, setPersonalAvailable] = useState<string[]>([]);
  const [memberData, setMemberData] = useState<
    {
      username: string;
      email: string;
      type: string;
      role: string;
      timeTables: { time: string }[];
    }[]
  >([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const formatMeetingTimesWithCounts = (): { [key: string]: number } => {
    const timeCounts: { [key: string]: number } = {};

    // 개인이 선택한 시간을 카운트에 포함
    personalAvailable.forEach((time) => {
      timeCounts[time] = (timeCounts[time] || 0) + 1;
    });

    memberData.forEach((member) => {
      member.timeTables.forEach((table) => {
        if (!table.time) return;

        const [date, time] = table.time.split(' ');
        const formattedTime = `${date.slice(5, 7)}${date.slice(8, 10)}-${time.slice(0, 2)}${time.slice(3, 5)}`;

        timeCounts[formattedTime] = (timeCounts[formattedTime] || 0) + 1;
      });
    });

    console.log('Meeting Time Counts:', timeCounts); // 카운트 결과 출력

    return timeCounts;
  };

  useEffect(() => {
    const loadEventData = async (): Promise<void> => {
      const { times, dates, members } = await fetchEventData();
      setAvailableTimes(times);
      setAvailableDates(dates);
      setMemberData(members);
    };

    loadEventData();
  }, []);

  return (
    <>
      <TimeGridContainer>
        <TimeGrid
          title="개인 가능 시간"
          times={availableTimes}
          dates={availableDates}
          selectedTimes={personalAvailable}
          toggleTime={(date, time): void => {
            const key = `${date}-${time}`;
            setPersonalAvailable((prev) => {
              return prev.includes(key)
                ? prev.filter((t) => {
                    return t !== key;
                  })
                : [...prev, key];
            });
          }}
        />
        <TimeGrid
          title="회의 가능 시간"
          times={availableTimes}
          dates={availableDates}
          selectedTimes={[
            ...Object.keys(formatMeetingTimesWithCounts()),
            ...personalAvailable,
          ]}
          toggleTime={(): void => {}}
          isDisabled
        />
      </TimeGridContainer>

      <MemberContainer>
        <Title>참여 인원</Title>
        <MemberTable
          data={memberData.map((member) => {
            return {
              id: member.username,
              name: member.username,
              email: member.email,
              role: member.role,
              permission: member.type,
            };
          })}
        />
      </MemberContainer>

      <ButtonContainer>
        <ModalButton text="취소" color="blue" />
        <ModalButton
          text="일정 조율 저장"
          color="blue"
          disabled={personalAvailable.length === 0}
        />
      </ButtonContainer>
    </>
  );
};

export default When2meet;
