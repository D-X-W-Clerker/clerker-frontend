// ContentDetail.tsx
import React from 'react';
import styled from 'styled-components';
import { FlexCol, FlexRow } from '@styles';
import { TutorialTexts } from '@data';

// -- 인터페이스 --
interface ContentDetailProps {
  tutorialKey: string;
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)`
  width: 100%;
  max-width: 1100px;
  align-items: center;
  padding: 0;
`;

const DetailArea = styled(FlexRow)`
  display: flex;
  flex-direction: column;
  width: 1300px;
  height: 700px;
  margin: 35px 45px;
  background-color: white;
  border: 0.55px solid #d2d2d2;
  border-radius: 33px;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: var(--font-semibold);
  color: #3a3a3a;
  margin: 44px 0 100px 0;
`;

const Subtitle = styled.h2`
  width: 500px;
  font-size: 28px;
  font-weight: var(--font-bold);
  color: #4a9df8;
  margin-bottom: 18px;
`;

const Description = styled.p`
  width: 500px;
  font-size: 18px;
  line-height: 1.6;
  color: #595959;
`;

const ContentDetail: React.FC<ContentDetailProps> = ({ tutorialKey }) => {
  const tutorialData = TutorialTexts[tutorialKey as keyof typeof TutorialTexts];
  return (
    <Container>
      <DetailArea>
        <Title>{tutorialData.title}</Title>
        <Subtitle>{tutorialData.subtitle}</Subtitle>
        <Description>{tutorialData.description}</Description>
      </DetailArea>
    </Container>
  );
};

export default ContentDetail;
