import React from 'react';
import styled from 'styled-components';
import { FolderIcon, ActiveLogoutIcon } from '@assets';
import { ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface SmallModalTitleTabProps {
  type: string;
  title: string;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterRow)`
  gap: 5px;
  font-size: 20px;
  background-color: var(--background-color);
`;

const IconImage = styled.img<{ $width: number; $height: number }>`
  width: ${(props): number => {
    return props.$width;
  }}px;
  height: ${(props): number => {
    return props.$height;
  }}px;
`;

const SmallModalTitleTab: React.FC<SmallModalTitleTabProps> = ({
  type,
  title,
}) => {
  const isProject = type === 'project';

  return (
    <Container>
      <IconImage
        src={isProject ? FolderIcon : ActiveLogoutIcon}
        alt={isProject ? 'Folder Icon' : 'Logout Icon'}
        $width={isProject ? 24 : 21}
        $height={isProject ? 19 : 19}
      />
      {title}
    </Container>
  );
};

export default SmallModalTitleTab;
