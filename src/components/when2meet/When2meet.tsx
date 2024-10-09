import React, { useState } from 'react';
import { TimeGrid, MemberTable } from '@components';
import styled from 'styled-components';
import { JustifyCenterRow } from '@styles';

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

const TimeGridContainer = styled(JustifyCenterRow)`
  gap: 25px;
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
          return toggleTime('personal', date, time);
        }}
      />
      <TimeGrid
        title="회의 가능 시간"
        times={times}
        dates={dates}
        selectedTimes={meetingAvailable}
        toggleTime={(date, time): void => {
          return toggleTime('meeting', date, time);
        }}
      />
    </TimeGridContainer>
  );
};

export default When2meet;
