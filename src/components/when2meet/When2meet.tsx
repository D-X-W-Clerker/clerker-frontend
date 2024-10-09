import React, { useState } from 'react';
import { TimeGrid } from '@components';
import styled from 'styled-components';

const times: string[] = [
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
];
const dates: string[] = ['0729', '0730', '0731', '0801', '0802'];

const TimeGridContainer = styled.div`
  display: flex;
`;

const When2meet: React.FC = () => {
  const [personalAvailable, setPersonalAvailable] = useState<string[]>([]);
  const [meetingAvailable, setMeetingAvailable] = useState<string[]>([]);

  const toggleTime = (
    type: 'personal' | 'meeting',
    date: string,
    time: string,
  ): void => {
    const key = `${date}-${time}`;
    const setAvailable =
      type === 'personal' ? setPersonalAvailable : setMeetingAvailable;
    setAvailable((prev) => {
      return prev.includes(key)
        ? prev.filter((t) => {
            return t !== key;
          })
        : [...prev, key];
    });
  };

  return (
    <TimeGridContainer>
      <TimeGrid
        title="개인 가능 시간"
        times={times}
        dates={dates}
        selectedTimes={personalAvailable}
        toggleTime={(date, time): void => {
          toggleTime('personal', date, time); // 반환 타입을 명시적으로 void로 설정
        }}
      />
      <TimeGrid
        title="회의 가능 시간"
        times={times}
        dates={dates}
        selectedTimes={meetingAvailable}
        toggleTime={(date, time): void => {
          toggleTime('meeting', date, time); // 반환 타입을 명시적으로 void로 설정
        }}
      />
    </TimeGridContainer>
  );
};

export default When2meet;
