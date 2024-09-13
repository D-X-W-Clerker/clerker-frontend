import React from 'react';
import styled from 'styled-components';
import { ItemsCenterRow } from '../../styles/FlexModule';
import { DownArrowIcon, RightArrowIcon, FolderIcon } from '../../assets';

// -- 인터페이스 --
interface FolderItemProps {
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
  padding: 4px 3px;
  padding-left: ${(props): string => {
    return props.isSubFolder ? '20px' : '3px';
  }};
  border-radius: 7px;
  cursor: pointer;
  color: #3d3d3d;
  background-color: ${(props): string => {
    return props.isSelected ? '#ececec' : 'transparent';
  }};
  &:hover {
    background-color: #ececec;
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
  color: #3d3d3d;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
`;

const FolderItem: React.FC<FolderItemProps> = ({
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
      <SvgIcon src={isSelected ? DownArrowIcon : RightArrowIcon} />
      <SvgIcon src={FolderIcon} />
      <Title>{name}</Title>
    </Container>
  );
};

export default FolderItem;
