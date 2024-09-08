import React from 'react';
import styled from 'styled-components';
import { Clerker } from '../../assets';

const Container = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 130px;
  background-color: var(--background-color);
  border-bottom: 0.5px solid #b6b6b6;
  z-index: 1000;
`;

const IconImage = styled.img`
  width: 90px;
  height: 30px;
`;

const Header: React.FC = () => {
  return (
    <Container>
      <IconImage src={Clerker} />
    </Container>
  );
};

export default Header;
