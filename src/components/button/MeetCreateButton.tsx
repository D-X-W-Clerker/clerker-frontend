import React from 'react';
import styled from 'styled-components';
import { AddIcon } from '../../assets';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
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
