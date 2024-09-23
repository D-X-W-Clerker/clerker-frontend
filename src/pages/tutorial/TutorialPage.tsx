// TutorialPage.tsx
import React from 'react';
import styled from 'styled-components';
import { Clerker, WhiteAddIcon } from '@assets';
import { TutorialButton } from '@components';
import { CenterCol, ItemsCenterRow, CenterRow } from '@styles';
import Layout from '../../Layout';

const Container = styled(CenterCol)`
  gap: 60px;
`;

const WelcomeArea = styled(ItemsCenterRow)`
  gap: 7px;
`;

const SvgClerkerImage = styled.img`
  width: 160px;
  height: 50px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: var(--color-gray-700);
`;

const ModalArea = styled(ItemsCenterRow)`
  gap: 32px;
`;

const ModalData: {
  type: string;
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

const ProjectCreateArea = styled(CenterRow)`
  height: 50px;
  padding: 0 57px;
  background-color: var(--color-blue-100);
  border-radius: 30px;
  cursor: pointer;
  gap: 8px;
`;

const SvgAddImage = styled.img`
  width: 18px;
  height: 18px;
`;

const Content = styled.h3`
  font-size: 20px;
  color: var(--background-color);
`;

const TutorialPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <WelcomeArea>
          <SvgClerkerImage src={Clerker} />
          <Title>에 오신 것을 환영해요!</Title>
        </WelcomeArea>
        <ModalArea>
          {ModalData.map((button) => {
            return (
              <TutorialButton
                key={button.type}
                icon={button.type}
                text={button.text}
              />
            );
          })}
        </ModalArea>
        <ProjectCreateArea>
          <SvgAddImage src={WhiteAddIcon} />
          <Content>프로젝트 생성</Content>
        </ProjectCreateArea>
      </Container>
    </Layout>
  );
};

export default TutorialPage;
