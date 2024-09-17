import React from 'react';
import styled from 'styled-components';
import { TutorialButton } from '@components';
import { Clerker } from '@assets';
import { FlexCol, FlexRow } from '@styles';
import Layout from '../Layout';

const Container = styled(FlexCol)`
  width: 100%;
  max-width: 1100px;
  align-items: center;
  padding: 0;
`;

const WelcomeArea = styled(FlexRow)`
  align-items: center;
  margin-bottom: 61px;
`;

const SvgImage = styled.img`
  width: 160px;
  height: 50px;
  margin-right: 7px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: var(--font-medium);
  margin: 0 auto;
  color: #242424;
`;

const ButtonArea = styled(FlexRow)``;

const TutorialButtonArea: React.FC = () => {
  return (
    <ButtonArea>
      <TutorialButton
        type="project"
        text="새로운 프로젝트를 생성하여 회의를 시작해보세요!"
      />
      <TutorialButton
        type="schedule"
        text="회의 일정을 편리하게 조율할 수 있어요"
      />
      <TutorialButton
        type="summary"
        text="회의를 빠르고 간편하게! 모든 과정을 한번에 해결해요"
      />
      <TutorialButton
        type="other"
        text="귀찮은 회의 정리, 이젠 모두 Clerker에서!"
      />
    </ButtonArea>
  );
};

const TutorialPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <WelcomeArea>
          <SvgImage src={Clerker} />
          <Title>에 오신 것을 환영해요!</Title>
        </WelcomeArea>
        <TutorialButtonArea />
      </Container>
    </Layout>
  );
};

export default TutorialPage;
