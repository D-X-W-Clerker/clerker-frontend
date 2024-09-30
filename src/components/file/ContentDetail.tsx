import React from 'react';
import styled from 'styled-components';
import { FlexCol, FlexRow, ItemsCenterSpaceRow } from '@styles';
import {
  ExampleImage,
  FirstPageIcon,
  SecondPageIcon,
  NextIcon,
  CompleteIcon,
  SproutIcon,
} from '@assets';

// -- 스타일 컴포넌트 --
const Container = styled(FlexRow)`
  width: 914px;
  height: 507px;
`;

const DetailArea = styled(FlexCol)`
  width: 100%;
  height: 100%;
  padding: 44px 51px;
  border: 0.5px solid #d2d2d2;
  border-radius: 33px;
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
  margin: 75px 0 70px 0;
  gap: 45px;
`;

const Description = styled(FlexCol)`
  flex-grow: 6;
  gap: 17px;
`;

const Subtitle = styled.h2`
  font-size: 26px;
  margin-top: 16px;
  margin-bottom: 0px;
  font-weight: var(--font-bold);
  color: var(--color-blue-100);
`;

const Content = styled.p`
  font-size: 15px;
  line-height: 28px;
  color: #595959;
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

// -- 더미 데이터 --
const TutorialTexts: {
  [key: string]: {
    id: number;
    title: string;
    subtitle: string;
    description: React.ReactNode;
  }[];
} = {
  CreateProject: [
    {
      id: 1,
      title: '새로운 프로젝트를 생성하여 회의를 시작해보세요!',
      subtitle: '새로운 프로젝트 생성',
      description: (
        <>
          좌측 상단 메뉴 바에서 프로젝트 생성 버튼을 클릭하여 새로운 프로젝트를
          생성할 수 있어요.
          <br />
          수신함에서 프로젝트와 관련된 알림을 확인할 수 있어요.
          <br />
          이름 변경, 프로필 사진 수정, 계정 삭제 등의 기능은 계정 설정 탭에서
          이용 가능해요.
          <br />
          로그아웃은 좌측 하단 프로필에서 할 수 있어요.
        </>
      ),
    },
    {
      id: 2,
      title: '새로운 프로젝트를 생성하여 회의를 시작해보세요!',
      subtitle: '프로젝트 관리',
      description: <>프로젝트를 관리하는 방법에 대해 알아보세요.</>,
    },
  ],
  ScheduleMeeting: [
    {
      id: 1,
      title: '새로운 프로젝트를 생성하여 회의를 시작해보세요!',
      subtitle: '회의 일정 조율',
      description: <>프로젝트의 회의 일정을 쉽게 조율할 수 있어요.</>,
    },
    {
      id: 2,
      title: '회의 일정을 편리하게 조율할 수 있어요',
      subtitle: '회의 일정 잡기',
      description: <>빠르고 간편하게 회의 일정을 잡으세요.</>,
    },
  ],
  CreateMeeting: [
    {
      id: 1,
      title: '회의를 빠르고 간편하게! 모든 과정을 한번에 해결해요',
      subtitle: '회의 생성',
      description: <>회의를 생성하는 방법에 대해 알아보세요.</>,
    },
    {
      id: 2,
      title: '회의를 빠르고 간편하게! 모든 과정을 한번에 해결해요',
      subtitle: '하위 폴더',
      description: <>하위 폴더를 설정하여 프로젝트를 정리하세요.</>,
    },
  ],
  AISummarize: [
    {
      id: 1,
      title: '귀찮은 회의 정리, 이젠 모두 Clecker에서!',
      subtitle: 'AI 회의 요약',
      description: <>Clecker에서 AI로 회의 내용을 요약해보세요.</>,
    },
    {
      id: 2,
      title: '귀찮은 회의 정리, 이젠 모두 Clecker에서!',
      subtitle: 'AI 회의 요약',
      description: <>Clecker에서 AI로 회의 내용을 요약해보세요.</>,
    },
  ],
};

const ContentDetail: React.FC<ContentDetailProps> = ({
  tutorialKey,
  id,
  handleNext,
}): React.ReactElement => {
  const tutorialData = TutorialTexts[tutorialKey]?.find((item) => {
    return item.id === id;
  });

  if (!tutorialData) {
    return <p>해당 튜토리얼 데이터를 찾을 수 없습니다.</p>;
  }

  return (
    <Container>
      <DetailArea>
        <TitleArea>
          <IconImage src={SproutIcon} $width={44} $height={44} />
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
          <IconImage
            src={id === 2 ? CompleteIcon : NextIcon}
            $width={80}
            $height={30}
            $isClickable
            onClick={handleNext}
          />
        </ButtonArea>
      </DetailArea>
    </Container>
  );
};

export default ContentDetail;
