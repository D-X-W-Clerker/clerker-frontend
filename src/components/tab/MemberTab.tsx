import React from 'react';
import styled from 'styled-components';
import { MemberIcon } from '@assets';
import { ItemsCenterRow } from '@styles';

const Container = styled(ItemsCenterRow)`
  gap: 5px;
  padding-left: 3px;
  font-size: 20px;
  color: var(--color-gray-600);
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
