import React from 'react';
import styled from 'styled-components';
import { FileIcon } from '@assets';
import { ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface MeetSummaryFileProps {
  isSelected: boolean;
  onClick: () => void;
  name: string;
  isSubFolder: boolean;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterRow)<{
  isSelected: boolean;
  isSubFolder?: boolean;
}>`
  gap: 4px;
  padding: 4px 3px 4px 20px;
  padding-left: ${(props): string => {
    return props.isSubFolder ? '38px' : '20px';
  }};
  border-radius: 7px;
  cursor: pointer;
  color: var(--color-gray-600);
  background-color: ${(props): string => {
    return props.isSelected ? 'var(--color-gray-50)' : 'transparent';
  }};
  &:hover {
    background-color: var(--color-gray-50);
    mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0));
  }
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0));
`;

const SvgIcon = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

const Title = styled.div`
  display: block;
  font-weight: var(--font-normal);
  color: var(--color-gray-600);
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
`;

const MeetSummaryFile: React.FC<MeetSummaryFileProps> = ({
  isSelected,
  onClick,
  name,
  isSubFolder,
}) => {
  return (
    <Container
      isSelected={isSelected}
      onClick={onClick}
      isSubFolder={isSubFolder}
    >
      <SvgIcon src={FileIcon} />
      <Title>{name}</Title>
    </Container>
  );
};

export default MeetSummaryFile;
