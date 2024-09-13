import React from 'react';
import styled from 'styled-components';
import { ItemsCenterRow, ItemsCenterStartRow } from '../../styles/FlexModule';
import { AddIcon } from '../../assets';

const Container = styled(ItemsCenterStartRow)``;

const ContentArea = styled(ItemsCenterRow)`
  background-color: var(--background-color);
  gap: 5px;
  font-size: 12px;
  color: #707070;
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
