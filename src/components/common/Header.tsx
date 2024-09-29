import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Clerker } from '@assets';
import { ItemsCenterRow } from '@styles';

const Container = styled(ItemsCenterRow)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  padding-left: 130px;
  background-color: var(--background-color);
  border-bottom: 0.5px solid var(--color-gray-300);
  z-index: 1000;
`;

const IconImage = styled.img`
  width: 90px;
  height: 30px;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickLogo = (): void => {
    if (location.pathname !== '/') {
      navigate('/home');
    }
  };

  return (
    <Container onClick={onClickLogo}>
      <IconImage src={Clerker} />
    </Container>
  );
};

export default Header;
