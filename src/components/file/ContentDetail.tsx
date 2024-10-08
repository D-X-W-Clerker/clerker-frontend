import React from 'react';
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

// -- 인터페이스 --
interface ContentDetailProps {
  tutorialKey: string;
  id: number;
  handleNext: () => void;
}

const ContentDetail: React.FC<ContentDetailProps> = ({
  tutorialKey,
  id,
  handleNext,
}): React.ReactElement => {
  const tutorialData = TutorialData[tutorialKey]?.find((item) => {
    return item.id === id;
  });

  if (!tutorialData) {
    return <p>해당 튜토리얼 데이터를 찾을 수 없습니다.</p>;
  }

  // 아이콘 이름에 따라 적절한 아이콘 컴포넌트를 선택
  const IconComponent = {
    SproutIcon,
    CalendarIcon,
    WindIcon,
    LightBulbIcon,
  }[tutorialData.iconName];

  return (
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
          src={id === 2 ? SecondPageIcon : FirstPageIcon}
          $width={36}
          $height={15}
        />
        <TutorialButton
          text={id === 2 ? '완료' : '다음'}
          onClick={handleNext}
        />
      </ButtonArea>
    </Container>
  );
};

export default ContentDetail;
