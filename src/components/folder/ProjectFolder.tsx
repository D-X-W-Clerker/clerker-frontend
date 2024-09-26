import React from 'react';
import styled from 'styled-components';
import { DownArrowIcon, RightArrowIcon, FolderIcon, MoreIcon } from '@assets';
import { CenterRow, ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface FolderItemProps {
  isSelected: boolean;
  onClickArrow: () => void;
  onClickTitle: () => void;
  onClickMore: () => void;
  name: string;
  isSubFolder: boolean;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterRow)<{
  $isSelected: boolean;
  $isSubFolder?: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  gap: 4px;
  padding: 4px 3px 4px
    ${(props): string => {
      return props.$isSubFolder ? '20px' : '3px';
    }};
  border-radius: 7px;
  cursor: pointer;
  color: var(--color-gray-600);
  background-color: ${(props): string => {
    return props.$isSelected ? 'var(--color-gray-50)' : 'transparent';
  }};
  position: relative;

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const MoreIconArea = styled(CenterRow)`
  display: none;
  position: absolute;
  right: 3px;
  top: 60%;
  transform: translateY(-50%);

  ${Container}:hover & {
    display: block;
  }
`;

const Title = styled(ItemsCenterRow)<{ $isSubFolder: boolean }>`
  flex: 1;
  min-width: 0;
  gap: 4px;
  font-weight: var(--font-normal);
  color: var(--color-gray-600);
  font-size: 12.6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  max-width: ${(props): string => {
    return props.$isSubFolder ? '100px' : '130px';
  }};
  &:hover {
    max-width: ${(props): string => {
      return props.$isSubFolder ? '90px' : '120px';
    }};
  }
`;

const SvgImage = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

const MoreIconImage = styled(SvgImage)`
  padding: 2px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

const ProjectFolder: React.FC<FolderItemProps> = ({
  isSelected,
  onClickArrow,
  onClickTitle,
  onClickMore,
  name,
  isSubFolder,
}) => {
  return (
    <Container $isSelected={isSelected} $isSubFolder={isSubFolder}>
      <SvgImage
        src={isSelected ? DownArrowIcon : RightArrowIcon}
        onClick={onClickArrow}
      />
      <Title
        className="folder-title"
        onClick={onClickTitle}
        $isSubFolder={isSubFolder}
      >
        <SvgImage src={FolderIcon} />
        {name}
      </Title>
      <MoreIconArea onClick={onClickMore}>
        <MoreIconImage src={MoreIcon} alt="More Options" />
      </MoreIconArea>
    </Container>
  );
};

export default ProjectFolder;
