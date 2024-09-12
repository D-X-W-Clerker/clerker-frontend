import React from 'react';
import styled from 'styled-components';
import { MemberAddIcon } from '../../assets';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  border-bottom: 0.5px solid #b6b6b6;
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  background-color: #ededed;
  border-radius: 3px;
  padding: 2px;
  gap: 1px;
  font-size: 7px;
  color: #858585;
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
