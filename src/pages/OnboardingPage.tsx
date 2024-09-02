import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
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
