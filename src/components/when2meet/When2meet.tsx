import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TimeGrid, MemberTable, ModalButton } from '@components';
import { FlexCol, JustifyCenterRow, ItemsCenterRow } from '@styles';

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

const ButtonContainer = styled(ItemsCenterRow)`
  gap: 7px;
`;

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
  };
};

const When2meet: React.FC = () => {
  const [personalAvailable, setPersonalAvailable] = useState<string[]>([]);
  const [meetingAvailable, setMeetingAvailable] = useState<string[]>([]);
  const [memberData, setMemberData] = useState<
    {
      id: string;
      name: string;
      role: string | null;
      email: string;
      permission: string;
    }[]
  >([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]); // times 중복 방지
  const [availableDates, setAvailableDates] = useState<string[]>([]); // dates 중복 방지

  useEffect(() => {
    const loadEventData = async (): Promise<void> => {
      const { times, dates, members } = await fetchEventData();
      setAvailableTimes(times);
      setAvailableDates(dates);
      setMemberData(members);
    };

    loadEventData();
  }, []);

  const toggleTime = (
    type: 'personal' | 'meeting',
    date: string,
    time: string,
  ): void => {
    const key = `${date}-${time}`;

    // personal과 meeting 모두 동일하게 업데이트
    if (type === 'personal') {
      setPersonalAvailable((prev) => {
        return prev.includes(key)
          ? prev.filter((t) => {
              return t !== key;
            })
          : [...prev, key];
      });
      setMeetingAvailable((prev) => {
        return prev.includes(key)
          ? prev.filter((t) => {
              return t !== key;
            })
          : [...prev, key];
      }); // personal 선택 시 meeting에도 동일한 시간 추가
    } else {
      setMeetingAvailable((prev) => {
        return prev.includes(key)
          ? prev.filter((t) => {
              return t !== key;
            })
          : [...prev, key];
      });
    }
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
          selectedTimes={meetingAvailable}
          toggleTime={(date, time): void => {
            return toggleTime('meeting', date, time);
          }}
        />
      </TimeGridContainer>
      <MemberContainer>
        <Title>참여 인원</Title>
        <MemberTable data={memberData} />
      </MemberContainer>
      <ButtonContainer>
        <ModalButton text="취소" color="blue" />
        <ModalButton text="일정 조율 생성" color="blue" />
      </ButtonContainer>
    </>
  );
};

export default When2meet;
