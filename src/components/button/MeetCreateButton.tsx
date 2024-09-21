import React from 'react';
import styled from 'styled-components';
import { AddIcon } from '@assets';
import { ItemsCenterRow, ItemsCenterStartRow } from '@styles';

const Container = styled(ItemsCenterStartRow)`
  width: 100%;
  box-sizing: border-box;
  background-color: var(--background-color);
  padding: 5px 20px;
  border-radius: 8px;
  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const ContentArea = styled(ItemsCenterRow)`
  gap: 5px;
  font-size: 12.6px;
  color: var(--color-gray-500);
  cursor: pointer;
`;

const SvgImage = styled.img`
  width: 12px;
  height: 12px;
`;

const MeetCreateButton: React.FC = () => {
  return (
    <Container>
      <ContentArea>
        <SvgImage src={AddIcon} />
        회의 생성
      </ContentArea>
    </Container>
  );
};

export default MeetCreateButton;
