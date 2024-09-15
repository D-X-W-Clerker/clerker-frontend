import React from 'react';
import styled from 'styled-components';
import { ItemsCenterCol } from '../styles/FlexModule';
import { Header } from '../components';

const Container = styled(ItemsCenterCol)`
  height: 100vh;
  margin-top: 50px;
  overflow-y: auto;
`;

const OnboardingPage: React.FC = () => {
  return (
    <Container>
      <Header />
      Onboarding Page 입니다.
    </Container>
  );
};

export default OnboardingPage;
