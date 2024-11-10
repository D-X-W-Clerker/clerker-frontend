import React from 'react';
import styled from 'styled-components';
import {
    WhiteGrayDownArrowIcon,
    FeatureSectionImage,
    When2meetSectionImage,
    SummarySectionImage,
    ProjectSectionImage,
} from '@assets';
import { Header } from '@components';
import { CenterCol, FlexCol, FlexRow, ItemsCenterCol } from '@styles';

const Container = styled.div`
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
`;

const IntroSection = styled(ItemsCenterCol)`
    height: 100vh;
    scroll-snap-align: start;
    position: relative;
`;

const FeatureSection = styled(CenterCol)`
    height: 100vh;
    scroll-snap-align: start;
    position: relative;
    margin-top: 500px;
`;

const SummarySection = styled(CenterCol)`
    height: 100vh;
    scroll-snap-align: start;
    position: relative;
`;

const When2meetSection = styled(CenterCol)`
    height: 100vh;
    scroll-snap-align: start;
    position: relative;
`;

const ProjectSection = styled(CenterCol)`
    height: 100vh;
    scroll-snap-align: start;
    position: relative;
`;

const Circle = styled.div<{
    $size: number;
    $top: string;
    $left: string;
    $angle: number;
    $color1: string;
    $color2: string;
    $opacity: number;
}>`
    border-radius: 50%;
    position: absolute;
    width: ${(props): number => {
        return props.$size;
    }}px;
    height: ${(props): number => {
        return props.$size;
    }}px;
    top: ${(props): string => {
        return props.$top;
    }};
    left: ${(props): string => {
        return props.$left;
    }};
    background: linear-gradient(
        ${(props): number => {
            return props.$angle;
        }}deg,
        ${(props): string => {
            return props.$color1;
        }},
        ${(props): string => {
            return props.$color2;
        }}
    );
    opacity: ${(props): number => {
        return props.$opacity;
    }};
    border: 1px solid rgba(60, 60, 60, 0.02);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
`;

const CircleWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

const TitleWrapper = styled(FlexRow)`
    z-index: 2;
`;

const TitleText = styled.h1<{
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
    color: var(--color-gray-700);
`;

const StartButton = styled.div`
    color: var(--color-blue-400);
    font-size: 20px;
    position: absolute;
    top: 80%;
    text-align: center;
    cursor: pointer;
`;

const Image = styled.img<{
    $top?: string;
    $transform?: string;
    $width: number;
    $height: number;
}>`
    top: ${(props): string => {
        return props.$top || 'auto';
    }};
    transform: ${(props): string => {
        return props.$transform || 'none';
    }};
    width: ${(props): number => {
        return props.$width;
    }}px;
    height: ${(props): number => {
        return props.$height;
    }}px;
    position: absolute;
`;

const ContentWrapper = styled(FlexCol)`
    gap: 45px;
`;

const Content = styled.div<{
    $top: string;
    $transform?: string;
    $fontSize: string;
    $fontWeight?: string;
    $fontColor?: string;
    $textAlign?: string;
}>`
    position: absolute;
    line-height: 1.5;
    top: ${(props): string => {
        return props.$top;
    }};
    transform: ${(props): string => {
        return props.$transform || 'none';
    }};
    font-size: ${(props): string => {
        return props.$fontSize;
    }};
    font-weight: ${(props): string => {
        return props.$fontWeight || 'var(--font-bold)';
    }};
    color: ${(props): string => {
        return props.$fontColor || 'var(--color-gray-700)';
    }};
    text-align: ${(props): string => {
        return props.$textAlign || 'left';
    }};
`;

const OnboardingPage: React.FC = () => {
    return (
        <Container>
            <Header showGoogleIcon />
            <IntroSection>
                <TitleWrapper>
                    <TitleText $top="20%" $left="20%">
                        회의의 모든 것,
                    </TitleText>
                    <TitleText $top="30%" $left="30%">
                        클러커에서
                    </TitleText>
                </TitleWrapper>
                <CircleWrapper>
                    <Circle
                        $size={300}
                        $top="-3%"
                        $left="-3%"
                        $angle={-57.61}
                        $color1="rgba(152, 173, 255, 70%) 33%"
                        $color2="rgba(255, 255, 255, 70%) 100%"
                        $opacity={0.7}
                    />
                    <Circle
                        $size={350}
                        $top="7%"
                        $left="7%"
                        $angle={-126.719}
                        $color1="rgba(71, 156, 247, 60%) 0%"
                        $color2="rgba(152, 173, 255, 60%) 100%"
                        $opacity={0.6}
                    />
                    <Circle
                        $size={400}
                        $top="75%"
                        $left="20%"
                        $angle={-164.171}
                        $color1="rgba(152, 173, 255, 70%) 2%"
                        $color2="rgba(255, 255, 255, 70%) 100%"
                        $opacity={0.7}
                    />
                    <Circle
                        $size={800}
                        $top="45%"
                        $left="65%"
                        $angle={-126.719}
                        $color1="rgba(71, 156, 247, 60%) 0%"
                        $color2="rgba(152, 173, 255, 60%) 100%"
                        $opacity={0.6}
                    />
                    <Circle
                        $size={350}
                        $top="15%"
                        $left="82%"
                        $angle={39.802}
                        $color1="rgba(152, 173, 255, 70%) 18%"
                        $color2="rgba(255, 255, 255, 70%) 100%"
                        $opacity={0.7}
                    />
                </CircleWrapper>
                <Image
                    src={WhiteGrayDownArrowIcon}
                    $top="67%"
                    $width={89}
                    $height={32}
                />
                <StartButton>시작하기</StartButton>
            </IntroSection>
            <FeatureSection>
                <Image
                    src={FeatureSectionImage}
                    $top="25%"
                    $transform="translateX(-30%)"
                    $width={774}
                    $height={517}
                />
                <Content
                    $top="45%"
                    $transform="translateX(120%)"
                    $fontSize="48px"
                >
                    회의는 간편하게 <br />
                    요약은 정확하게
                </Content>
            </FeatureSection>
            <SummarySection>
                <Content
                    $top="15%"
                    $fontSize="24px"
                    $fontColor="var(--color-blue-400)"
                    $textAlign="center"
                >
                    AI 회의 내용 요약 및 시각화 서비스
                </Content>
                <Content $top="25%" $fontSize="52px" $textAlign="center">
                    회의 내용 정리는
                    <br />
                    클러커에게
                </Content>
                <Content
                    $top="50%"
                    $fontSize="24px"
                    $textAlign="center"
                    $fontWeight="var(--font-normal)"
                >
                    AI를 활용하여 회의 녹화 내용을 자동으로
                    <strong> 요약 텍스트, 시각적 다이어그램, 요약 영상</strong>
                    으로 제공하여
                    <br />
                    중요한 정보를 효율적으로 파악하고 공유할 수 있도록
                    지원합니다.
                </Content>
                <Image
                    src={SummarySectionImage}
                    $top="65%"
                    $width={785}
                    $height={250}
                />
            </SummarySection>
            <When2meetSection>
                <ContentWrapper>
                    <Content
                        $top="35%"
                        $transform="translateX(-300%)"
                        $fontSize="24px"
                        $fontColor="var(--color-blue-400)"
                    >
                        스마트한 일정 조율
                    </Content>
                    <Content
                        $top="45%"
                        $transform="translateX(-140%)"
                        $fontSize="52px"
                    >
                        모두가 가능한 시간 <br />
                        손쉽게 찾기
                    </Content>
                    <Content
                        $top="65%"
                        $transform="translateX(-145%)"
                        $fontSize="24px"
                        $fontWeight="var(--font-normal)"
                    >
                        팀원이 가능한 시간대를 입력하면, <br />
                        <strong>최적의 회의 시간</strong>을 조율할 수 있습니다.
                    </Content>
                </ContentWrapper>
                <Image
                    src={When2meetSectionImage}
                    $top="20%"
                    $transform="translateX(40%)"
                    $width={774}
                    $height={517}
                />
            </When2meetSection>
            <ProjectSection>
                <Image
                    src={ProjectSectionImage}
                    $top="25%"
                    $transform="translateX(-120%)"
                    $width={377}
                    $height={456}
                />
                <ContentWrapper>
                    <Content
                        $top="25%"
                        $transform="translateX(175%)"
                        $fontSize="24px"
                        $fontColor="var(--color-blue-400)"
                    >
                        프로젝트 단위 관리
                    </Content>
                    <Content
                        $top="35%"
                        $transform="translateX(45%)"
                        $fontSize="52px"
                        $textAlign="right"
                    >
                        프로젝트 관리
                        <br />
                        이제 더 편리하게
                    </Content>
                    <Content
                        $top="55%"
                        $transform="translateX(-30%)"
                        $fontSize="24px"
                        $fontWeight="var(--font-normal)"
                        $textAlign="right"
                    >
                        클러커는 <strong>프로젝트 단위</strong>로 회의를 처리할
                        수 있는 강력한 도구입니다.
                        <br />
                        <br />
                        <br />
                        프로젝트별로 모든 회의와 일정을 한곳에서 손쉽게
                        관리하며,
                        <br />
                        팀의 목표와 계획을 명확하게 유지할 수 있도록 도와줍니다.
                        <br />
                        복잡한 업무 속에서도 효율적인 협업을 가능하게 하는
                        클러커와 함께하세요.
                    </Content>
                </ContentWrapper>
            </ProjectSection>
        </Container>
    );
};

export default OnboardingPage;
