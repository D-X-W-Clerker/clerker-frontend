import React from 'react';
import styled from 'styled-components';
import {
    WhiteGrayDownArrowIcon,
    FeatureSectionImage,
    When2meetSectionImage,
    SummarySectionImage,
    ProjectSectionImage,
    IntroSectionBg,
} from '@assets';
import { Header } from '@components';
import { CenterRow, FlexCol, ItemsCenterCol } from '@styles';

// --- 레이아웃 스타일
const Container = styled(FlexCol)`
    min-height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
`;

const ColumnWrapper = styled(FlexCol)`
    gap: 45px;
`;

const IntroWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    margin: 200px 0 100px;
    right: 50%;
    transform: translateX(43%);
`;

const CenterRowSection = styled(CenterRow)`
    height: 100vh;
    scroll-snap-align: start;
`;

const IntroSection = styled(ItemsCenterCol)`
    height: calc(100vh - 50px);
    margin-top: 50px;
    scroll-snap-align: start;
    background-image: url(${IntroSectionBg});
    background-size: cover;
`;

const FeatureSection = styled(CenterRowSection)`
    gap: 20px;
`;

const SummarySection = styled(CenterRowSection)`
    flex-direction: column;
    gap: 45px;
`;

const When2meetSection = styled(CenterRowSection)`
    gap: 80px;
`;

const ProjectSection = styled(CenterRowSection)`
    gap: 100px;
`;

// --- 이미지 스타일
const Image = styled.img<{
    $width: number;
    $height: number;
}>`
    width: ${(props): number => {
        return props.$width;
    }}px;
    height: ${(props): number => {
        return props.$height;
    }}px;
`;

// --- 텍스트 스타일
const BaseText = styled.div<{
    $textAlign?: string;
}>`
    line-height: 1.3;
    ${(props) => {
        return (
            props.$textAlign &&
            `
        text-align: ${props.$textAlign};
    `
        );
    }}
`;

const FeatureText = styled(BaseText)`
    font-size: 24px;
    font-weight: var(--font-bold);
    color: var(--color-blue-100);
`;

const MainText = styled(BaseText)`
    font-size: 50px;
    font-weight: var(--font-extrabold);
`;

const DetailText = styled(BaseText)`
    font-size: 24px;
    font-weight: var(--font-normal);
`;

const IntroText = styled(BaseText)<{
    $top: string;
    $left: string;
}>`
    position: absolute;
    top: ${(props): string => {
        return props.$top;
    }};
    left: ${(props): string => {
        return props.$left;
    }};
    font-size: 64px;
    font-weight: var(--font-bold);
`;

// --- 버튼 스타일
const StartButton = styled.div`
    margin-top: 20px;
    color: var(--color-blue-400);
    font-size: 20px;
    text-align: center;
    cursor: pointer;
`;

// --- 더미데이터
const introTexts = [
    {
        id: 'introText1',
        text: '회의의 모든 것,',
        top: '20px',
        left: 'calc(50% - 300px)',
    },
    {
        id: 'introText2',
        text: '클러커에서',
        top: '100px',
        left: 'calc(50% - 140px)',
    },
];

const OnboardingPage: React.FC = () => {
    return (
        <Container>
            <Header showGoogleIcon />
            <IntroSection>
                <IntroWrapper>
                    {introTexts.map((introText) => {
                        return (
                            <IntroText
                                key={introText.id}
                                $top={introText.top}
                                $left={introText.left}
                            >
                                {introText.text}
                            </IntroText>
                        );
                    })}
                </IntroWrapper>
                <ColumnWrapper>
                    <Image
                        src={WhiteGrayDownArrowIcon}
                        $width={89}
                        $height={32}
                    />
                    <StartButton>시작하기</StartButton>
                </ColumnWrapper>
            </IntroSection>
            <FeatureSection>
                <Image src={FeatureSectionImage} $width={774} $height={517} />
                <MainText>
                    회의는 간편하게 <br /> 요약은 정확하게
                </MainText>
            </FeatureSection>
            <SummarySection>
                <FeatureText>AI 회의 내용 요약 및 시각화 서비스</FeatureText>
                <MainText $textAlign="center">
                    회의 내용 정리는 <br /> 클러커에게
                </MainText>
                <DetailText $textAlign="center">
                    AI를 활용하여 회의 녹화 내용을 자동으로
                    <strong> 요약 텍스트, 시각적 다이어그램, 요약 영상</strong>
                    으로 제공하여 <br /> 중요한 정보를 효율적으로 파악하고
                    공유할 수 있도록 지원합니다.
                </DetailText>
                <Image src={SummarySectionImage} $width={785} $height={250} />
            </SummarySection>
            <When2meetSection>
                <ColumnWrapper>
                    <FeatureText>스마트한 일정 조율</FeatureText>
                    <MainText $textAlign="left">
                        모두가 가능한 시간 <br /> 손쉽게 찾기
                    </MainText>
                    <DetailText $textAlign="left">
                        팀원이 가능한 시간대를 입력하면, <br />
                        <strong>최적의 회의 시간</strong>을 조율할 수 있습니다.
                    </DetailText>
                </ColumnWrapper>
                <Image src={When2meetSectionImage} $width={520} $height={624} />
            </When2meetSection>
            <ProjectSection>
                <Image src={ProjectSectionImage} $width={377} $height={456} />
                <ColumnWrapper>
                    <FeatureText $textAlign="right">
                        프로젝트 단위 관리
                    </FeatureText>
                    <MainText $textAlign="right">
                        프로젝트 관리 <br /> 이제 더 편리하게
                    </MainText>
                    <DetailText $textAlign="right">
                        <strong>프로젝트 단위</strong>로 모든 회의와 일정을
                        손쉽게 관리하며, <br /> 복잡한 업무 속에서도 효율적인
                        협업이 가능합니다.
                    </DetailText>
                </ColumnWrapper>
            </ProjectSection>
        </Container>
    );
};

export default OnboardingPage;
