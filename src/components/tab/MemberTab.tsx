import React from 'react';
import styled from 'styled-components';
import { ItemsCenterRow } from '../../styles/FlexModule';
import { MemberIcon } from '../../assets';

const Container = styled(ItemsCenterRow)`
  gap: 5px;
  padding-left: 3px;
  font-size: 20px;
  color: #3c3c3c;
`;

const SvgIcon = styled.img`
  width: 28px;
  height: 20px;
`;

const MemberTab: React.FC = () => {
  return (
    <Container>
      <SvgIcon src={MemberIcon} />
      Member
    </Container>
  );
};

export default MemberTab;
