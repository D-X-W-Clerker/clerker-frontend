import React from 'react';
import styled from 'styled-components';
import {
  FileIcon,
  DownArrowIcon,
  RightArrowIcon,
  FolderIcon,
  MoreIcon,
} from '@assets';
import { CenterRow, ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface FolderItemProps {
  isOpen?: boolean;
  isSelected: boolean;
  onClickToggle?: () => void;
  onClickNav: () => void;
  onClickMore: () => void;
  name: string;
  isSubFolder?: boolean;
}

const Container = styled(ItemsCenterRow)<{
  $isSelected: boolean;
  $isSubFolder?: boolean;
  $onClickToggle?: () => void;
}>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  gap: 4px;
  padding: 4px 3px 4px
    ${(props): string => {
      if (!props.$onClickToggle) return props.$isSubFolder ? '38px' : '20px'; // 파일에 대한 padding
      return props.$isSubFolder ? '20px' : '3px'; // 폴더에 대한 padding
    }};
  border-radius: 7px;
  cursor: pointer;
  user-select: none;
  color: var(--color-gray-600);
  background-color: ${(props): string => {
    return props.$isSelected ? 'var(--color-gray-50)' : 'transparent';
  }};

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const MoreIconArea = styled(CenterRow)`
  display: none;
  position: absolute;
  right: 3px;
  top: 58%;
  transform: translateY(-50%);

  ${Container}:hover & {
    display: block;
  }
`;

const Title = styled(ItemsCenterRow)`
  display: block;
  flex: 1;
  min-width: 0;
  font-weight: var(--font-normal);
  color: var(--color-gray-600);
  font-size: 12.6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  max-width: calc(100% - 40px);

  ${Container}:hover & {
    max-width: calc(100% - 50px);
  }
`;

const SvgImage = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

const MoreIconImage = styled(SvgImage)`
  padding: 1px 2px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

const FolderItem: React.FC<FolderItemProps> = ({
  isOpen = false,
  isSelected,
  onClickToggle,
  onClickNav,
  onClickMore,
  name,
  isSubFolder = false,
}) => {
  return (
    <Container
      $isSelected={isSelected}
      $isSubFolder={isSubFolder}
      $onClickToggle={onClickToggle}
    >
      {onClickToggle && (
        <SvgImage
          src={isOpen ? DownArrowIcon : RightArrowIcon}
          onClick={(e): void => {
            e.stopPropagation();
            onClickToggle();
          }}
        />
      )}
      <SvgImage
        onClick={onClickNav}
        src={!onClickToggle ? FileIcon : FolderIcon}
      />
      <Title onClick={onClickNav} onDoubleClick={onClickToggle}>
        {name}
      </Title>
      <MoreIconArea onClick={onClickMore}>
        <MoreIconImage src={MoreIcon} alt="More Options" />
      </MoreIconArea>
    </Container>
  );
};

export default FolderItem;
