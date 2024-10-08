import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ExampleImage,
  FirstPageIcon,
  SecondPageIcon,
  SproutIcon,
  CalendarIcon,
  WindIcon,
  LightBulbIcon,
} from '@assets';
import { TutorialButton } from '@components';
import { FlexCol, FlexRow, ItemsCenterSpaceRow } from '@styles';
import { TutorialData } from '@data';
import { useParams, useNavigate } from 'react-router-dom'; // URL 경로에서 파라미터를 가져오는 Hook
import Layout from '../../Layout';

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)`
  max-width: 1000px;
  width: 100%;
  height: 507px;
  padding: 45px;
  border: 0.5px solid var(--color-gray-100);
  border-radius: 33px;
  gap: 70px;
`;

const TitleArea = styled(FlexRow)`
  gap: 9px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: var(--font-semibold);
  color: var(--color-gray-600);
`;

const ContentArea = styled(FlexRow)`
  gap: 45px;
`;

const Description = styled(FlexCol)`
  flex-grow: 6;
  gap: 17px;
`;

const Subtitle = styled.div`
  font-size: 26px;
  padding-top: 16px;
  font-weight: var(--font-bold);
  color: var(--color-blue-100);
`;

const Content = styled.p`
  font-size: 15px;
  line-height: 28px;
  color: var(--color-gray-500);
`;

const Image = styled.img`
  flex-grow: 4;
`;

const ButtonArea = styled(ItemsCenterSpaceRow)``;

const IconImage = styled.img<{
  $width: number;
  $height: number;
  $isClickable?: boolean;
}>`
  width: ${(props): number => {
    return props.$width;
  }}px;
  height: ${(props): number => {
    return props.$height;
  }}px;
  ${(props): string | undefined => {
    return props.$isClickable ? 'cursor: pointer;' : undefined;
  }}
`;

// -- 튜토리얼 키 배열 --
const tutorialKeys = [
  'CreateProject',
  'ScheduleMeeting',
  'CreateMeeting',
  'AISummarize',
];

const TutorialDetailPage: React.FC = (): React.ReactElement => {
  const { key } = useParams<{ key: string }>(); // URL 경로에서 key 값을 추출
  const navigate = useNavigate(); // navigate 함수 호출
  const [tutorialId, setTutorialId] = useState(1); // 현재 튜토리얼 ID
  const tutorialIndex = key ? tutorialKeys.indexOf(key) : -1; // URL 키가 undefined일 경우 -1 반환

  const handleNext = (): void => {
    setTutorialId((prevId) => {
      if (prevId < 2) {
        return prevId + 1; // 다음 ID로 증가
      }
      return prevId; // 2를 초과하지 않음
    });
  };

  const handleComplete = (): void => {
    navigate('/home'); // 완료 시 /home으로 이동
  };

  const currentTutorialKey = tutorialKeys[tutorialIndex];
  const tutorialData = TutorialData[currentTutorialKey]?.find((item) => {
    return item.id === tutorialId;
  });

  if (!tutorialData) {
    return <p>해당 튜토리얼 데이터를 찾을 수 없습니다.</p>;
  }

  // 아이콘 선택
  const IconComponent = {
    SproutIcon,
    CalendarIcon,
    WindIcon,
    LightBulbIcon,
  }[tutorialData.iconName];

  return (
    <Layout>
      <Container>
        <TitleArea>
          <IconImage src={IconComponent} $width={44} $height={44} />
          <Title>{tutorialData.title}</Title>
        </TitleArea>
        <ContentArea>
          <Description>
            <Subtitle>{tutorialData.subtitle}</Subtitle>
            <Content>{tutorialData.description}</Content>
          </Description>
          <Image src={ExampleImage} />
        </ContentArea>
        <ButtonArea>
          <IconImage
            src={tutorialId === 2 ? SecondPageIcon : FirstPageIcon}
            $width={36}
            $height={15}
          />
          {tutorialId === 2 ? (
            <TutorialButton text="완료" onClick={handleComplete} />
          ) : (
            <TutorialButton text="다음" onClick={handleNext} />
          )}
        </ButtonArea>
      </Container>
    </Layout>
  );
};

export default TutorialDetailPage;
