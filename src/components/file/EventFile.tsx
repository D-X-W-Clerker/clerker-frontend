import React from 'react';
import styled from 'styled-components';
import { FileIcon } from '@assets';
import { ItemsCenterSpaceRow, ItemsCenterRow } from '@styles';
import { FormatDateTime } from '@utils';

// -- 인터페이스 --
interface MeetFileProps {
  meetingName: string;
  dateTime: string; // 백엔드에서 받아오는 날짜와 시간 (ISO 형식)
  onClick?: () => void;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterSpaceRow)`
  width: 100%;
  box-sizing: border-box;
  padding: 4px 20px;
  border-radius: 7px;
  cursor: pointer;
  background-color: var(--background-color);
  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const FileInfo = styled(ItemsCenterRow)`
  gap: 5px;
`;

const MeetingName = styled.span`
  color: #494949;
  font-size: 12.6px;
`;

const DateTime = styled.span`
  color: #494949;
  font-size: 12.6px;
`;

const SvgImage = styled.img`
  width: 14px;
  height: 14px;
`;

const EventFile: React.FC<MeetFileProps> = ({
  meetingName,
  dateTime,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <FileInfo>
        <SvgImage src={FileIcon} />
        <MeetingName>{meetingName}</MeetingName>
      </FileInfo>
      <DateTime>{FormatDateTime(dateTime)}</DateTime>
    </Container>
  );
};

export default EventFile;
