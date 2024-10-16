import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TimeGrid, MemberTable, ModalButton } from '@components';
import { FlexCol, JustifyCenterRow, ItemsCenterEndRow } from '@styles';

// 스타일 컴포넌트 정의
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

// 임의의 사용자 정보 생성
const myInfo = {
  id: '5',
  name: '황현진',
  role: 'FE',
  email: 'jjini6530@kookmin.ac.kr',
  permission: 'member',
};

// API로 이벤트 데이터 가져오기
const fetchEventData = async (): Promise<{
  times: string[];
  dates: string[];
  members: {
    id: string;
    name: string;
    role: string | null;
    email: string;
    permission: string;
  }[];
  meetingTimes: Record<string, string[]>;
}> => {
  return {
    times: [
      '0800',
      '0900',
      '1000',
      '1100',
      '1200',
      '1300',
      '1400',
      '1500',
      '1600',
      '1700',
      '1800',
      '1900',
      '2000',
      '2100',
    ],
    dates: ['0729', '0730', '0731', '0801', '0802'],
    members: [
      {
        id: '1',
        name: '이정욱',
        role: 'BE',
        email: 'dlwjddnr5438@kookmin.ac.kr',
        permission: 'owner',
      },
      {
        id: '2',
        name: '신진욱',
        role: 'FE',
        email: 'jinwook2765@kookmin.ac.kr',
        permission: 'member',
      },
      {
        id: '3',
        name: '임형빈',
        role: 'AI',
        email: 'gudqls3157@gmail.com',
        permission: 'owner',
      },
      {
        id: '4',
        name: '박건민',
        role: 'DE',
        email: 'pkm021118@kookmin.ac.kr',
        permission: 'member',
      },
    ],
    meetingTimes: {
      '0729': ['0800', '0830', '0900'],
      '0730': ['0900', '0930'],
      '0731': ['1130', '1200', '1230', '1300'],
    },
  };
};

// When2meet 컴포넌트
const When2meet: React.FC = () => {
  const [personalAvailable, setPersonalAvailable] = useState<string[]>([]);
  const [meetingAvailable, setMeetingAvailable] = useState<
    Record<string, string[]>
  >({});
  const [memberData, setMemberData] = useState<
    {
      id: string;
      name: string;
      role: string | null;
      email: string;
      permission: string;
    }[]
  >([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    const loadEventData = async (): Promise<void> => {
      const { times, dates, members, meetingTimes } = await fetchEventData();
      setAvailableTimes(times);
      setAvailableDates(dates);
      setMemberData(members);
      setMeetingAvailable(meetingTimes);
    };

    loadEventData();
  }, []);

  // personalAvailable이 변경될 때 본인 정보 추가/제거 처리
  useEffect(() => {
    if (personalAvailable.length > 0) {
      if (
        !memberData.some((member) => {
          return member.id === myInfo.id;
        })
      ) {
        setMemberData((prevMembers) => {
          return [...prevMembers, myInfo];
        });
      }
    } else {
      setMemberData((prevMembers) => {
        return prevMembers.filter((member) => {
          return member.id !== myInfo.id;
        });
      });
    }
  }, [personalAvailable, memberData]);

  const toggleTime = (type: 'personal', date: string, time: string): void => {
    const key = `${date}-${time}`;

    setPersonalAvailable((previous) => {
      return previous.includes(key)
        ? previous.filter((t) => {
            return t !== key;
          })
        : [...previous, key];
    });

    setMeetingAvailable((previousMeeting) => {
      const updatedTimes = previousMeeting[date] || [];
      const newTimes = updatedTimes.includes(time)
        ? updatedTimes.filter((t) => {
            return t !== time;
          })
        : [...updatedTimes, time];

      return { ...previousMeeting, [date]: newTimes };
    });
  };

  return (
    <>
      <TimeGridContainer>
        <TimeGrid
          title="개인 가능 시간"
          times={availableTimes}
          dates={availableDates}
          selectedTimes={personalAvailable}
          toggleTime={(date, time): void => {
            return toggleTime('personal', date, time);
          }}
        />
        <TimeGrid
          title="회의 가능 시간"
          times={availableTimes}
          dates={availableDates}
          selectedTimes={availableDates.flatMap((date) => {
            return (
              meetingAvailable[date]?.map((time) => {
                return `${date}-${time}`;
              }) || []
            );
          })}
          toggleTime={(): void => {}} // 회의 시간은 선택 불가
        />
      </TimeGridContainer>

      <MemberContainer>
        <Title>참여 인원</Title>
        <MemberTable data={memberData} />
      </MemberContainer>

      <ButtonContainer>
        <ModalButton text="취소" color="blue" />
        <ModalButton
          text="일정 조율 저장"
          color="blue"
          disabled={personalAvailable.length === 0} // 선택된 시간이 없으면 비활성화
        />
      </ButtonContainer>
    </>
  );
};

export default When2meet;
