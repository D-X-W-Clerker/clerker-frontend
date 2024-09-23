import React from 'react';
import styled from 'styled-components';
import { Clerker, WhiteAddIcon } from '@assets';
import { TutorialButton } from '@components';
import { CenterCol, ItemsCenterRow, CenterRow } from '@styles';
import Layout from '../../Layout';

// -- 스타일 컴포넌트 --
const Container = styled(CenterCol)`
  gap: 60px;
`;

const WelcomeArea = styled(ItemsCenterRow)`
  gap: 7px;
`;

const ModalArea = styled(ItemsCenterRow)`
  gap: 32px;
  flex-wrap: wrap;
  // 1200px 이하에서 바로 2x2 배치로 변경
  @media (max-width: 1200px) {
    justify-content: center;
    gap: 32px;
    & > div {
      flex: 1 1 calc(45% - 32px); // 가로로 2개씩 배치
      max-width: 290px;
    }
  }
  // 768px 이하에서 모달을 한 줄로 배치하고 크기 더 축소
  @media (max-width: 890px) {
    & > div {
      flex: 1 1 calc(50% - 32px); // 가로로 2개씩 배치
      max-width: 200px;
    }
  }
`;

const ProjectCreateArea = styled(CenterRow)`
  height: 50px;
  padding: 0 57px;
  gap: 8px;
  border-radius: 30px;
  cursor: pointer;
  background-color: var(--color-blue-100);
  &:hover {
    background-color: var(--color-blue-200);
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: var(--color-gray-700);
`;

const Content = styled.h3`
  font-size: 20px;
  color: var(--background-color);
`;

const SvgImage = styled.img<{ $width: number; $height: number }>`
  width: ${(props): number => {
    return props.$width;
  }}px;
  height: ${(props): number => {
    return props.$height;
  }}px;
`;

const ModalData: {
  type: string;
  text: React.ReactNode;
}[] = [
  {
    type: 'project',
    text: (
      <>
        새로운 프로젝트를 생성하여
        <br />
        회의를 시작해보세요!
      </>
    ),
  },
  {
    type: 'schedule',
    text: (
      <>
        회의 일정을 편리하게
        <br />
        조율할 수 있어요
      </>
    ),
  },
  {
    type: 'summary',
    text: (
      <>
        회의를 빠르고 간편하게!
        <br />
        모든 과정을 한번에 해결해요
      </>
    ),
  },
  {
    type: 'other',
    text: (
      <>
        귀찮은 회의 정리,
        <br />
        이젠 모두 Clerker에서!
      </>
    ),
  },
];

const TutorialPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <WelcomeArea>
          <SvgImage src={Clerker} $width={160} $height={50} />
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
          <SvgImage src={WhiteAddIcon} $width={18} $height={18} />
          <Content>프로젝트 생성</Content>
        </ProjectCreateArea>
      </Container>
    </Layout>
  );
};

export default TutorialPage;
