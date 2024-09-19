// TutorialPage.tsx
import React from 'react';
import styled from 'styled-components';
import { Clerker } from '@assets';
import { TutorialButton } from '@components';
import { CenterCol, ItemsCenterRow } from '@styles';
import Layout from '../../Layout';

const Container = styled(CenterCol)`
  width: 100%;
  max-width: 1100px;
  gap: 60px;
`;

const WelcomeArea = styled(ItemsCenterRow)`
  gap: 7px;
`;

const SvgImage = styled.img`
  width: 160px;
  height: 50px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #242424;
`;

const ButtonArea = styled(ItemsCenterRow)`
  gap: 32px;
`;

const buttonData: {
  type: 'project' | 'schedule' | 'summary' | 'other';
  text: string;
}[] = [
  {
    type: 'project',
    text: '새로운 프로젝트를 생성하여 회의를 시작해보세요!',
  },
  {
    type: 'schedule',
    text: '회의 일정을 편리하게 조율할 수 있어요',
  },
  {
    type: 'summary',
    text: '회의를 빠르고 간편하게! 모든 과정을 한번에 해결해요',
  },
  {
    type: 'other',
    text: '귀찮은 회의 정리, 이젠 모두 Clerker에서!',
  },
];

const TutorialPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <WelcomeArea>
          <SvgImage src={Clerker} />
          <Title>에 오신 것을 환영해요!</Title>
        </WelcomeArea>
        <ButtonArea>
          {buttonData.map((button) => {
            return (
              <TutorialButton
                key={button.type}
                icon={button.type}
                text={button.text}
              />
            );
          })}
        </ButtonArea>
      </Container>
    </Layout>
  );
};

export default TutorialPage;
