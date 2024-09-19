import React from 'react';
import styled from 'styled-components';
import { AddIcon } from '@assets';
import { ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface AddSubFolderButtonProps {
  onClick: () => void;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterRow)`
  gap: 4px;
  padding: 5px 22px;
  font-size: 12px;
  border-radius: 7px;
  color: var(--color-gray-500);
  cursor: pointer;
  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const SvgIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const AddSubFolderButton: React.FC<AddSubFolderButtonProps> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <SvgIcon src={AddIcon} />
      하위 폴더 생성
    </Container>
  );
};

export default AddSubFolderButton;
