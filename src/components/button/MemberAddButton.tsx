import React from 'react';
import styled from 'styled-components';
import { ItemsCenterRow, ItemsCenterStartRow } from '../../styles/FlexModule';
import { MemberAddIcon } from '../../assets';

const Container = styled(ItemsCenterStartRow)`
  padding: 5px;
  border-bottom: 0.5px solid #b6b6b6;
`;

const ContentArea = styled(ItemsCenterRow)`
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
