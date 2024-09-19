import React from 'react';
import styled from 'styled-components';
import { Header } from '@components';
import { ItemsCenterCol } from '@styles';

const Container = styled(ItemsCenterCol)`
  height: 100vh;
  margin-top: 50px;
  overflow-y: auto;
`;

const OnboardingPage: React.FC = () => {
  return (
    <Container>
      <Header />
      Onboarding Page
    </Container>
  );
};

export default OnboardingPage;
