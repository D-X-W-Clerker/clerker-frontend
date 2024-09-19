import React from 'react';
import styled from 'styled-components';
import { MemberAddIcon } from '@assets';
import { ItemsCenterRow, ItemsCenterStartRow } from '@styles';

const Container = styled(ItemsCenterStartRow)`
  padding: 5px;
  border-bottom: 0.5px solid var(--color-gray-300);
`;

const ContentArea = styled(ItemsCenterRow)`
  background-color: var(--color-gray-50);
  border-radius: 3px;
  padding: 2px;
  gap: 1px;
  font-size: 7px;
  color: var(--color-gray-400);
  cursor: pointer;
`;

const SvgImage = styled.img`
  width: 7px;
  height: 7px;
`;

const MemberAddButton: React.FC = () => {
  return (
    <Container>
      <ContentArea>
        <SvgImage src={MemberAddIcon} />
        추가하기
      </ContentArea>
    </Container>
  );
};

export default MemberAddButton;
