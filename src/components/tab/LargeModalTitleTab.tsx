import React from 'react';
import styled from 'styled-components';
import { FolderIcon, ActiveSettingIcon } from '@assets';
import { ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface LargeModalTitleTabProps {
  type: string;
  title: string;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterRow)`
  gap: 5px;
  font-size: 24px;
  background-color: var(--background-color);
  user-select: none;
`;

const IconImage = styled.img<{ $width: number; $height: number }>`
  width: ${(props): number => {
    return props.$width;
  }}px;
  height: ${(props): number => {
    return props.$height;
  }}px;
`;

const LargeModalTitleTab: React.FC<LargeModalTitleTabProps> = ({
  type,
  title,
}) => {
  const isProject = type === 'project';

  return (
    <Container>
      <IconImage
        src={isProject ? FolderIcon : ActiveSettingIcon}
        alt={isProject ? 'Folder Icon' : 'Setting Icon'}
        $width={isProject ? 30 : 24}
        $height={isProject ? 23 : 24}
      />
      {title}
    </Container>
  );
};

export default LargeModalTitleTab;