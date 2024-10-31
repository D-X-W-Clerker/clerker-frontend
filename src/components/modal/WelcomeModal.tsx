import React from 'react';
import styled from 'styled-components';
import { GoogleIcon } from '@assets';
import { CenterCol, CenterRow, ItemsCenterCol } from '@styles';

// -- 스타일 컴포넌트 --
const Backdrop = styled(CenterRow)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 1000;
`;

const Container = styled(CenterCol)`
    width: 100%;
    max-width: 370px;
    gap: 25px;
    padding: 43px 0;
    border-radius: 10px;
    background-color: var(--background-color);
`;

const Wrapper = styled(ItemsCenterCol)`
    gap: 15px;
`;

const LargeText = styled.div`
    font-size: 28px;
`;

const Text = styled.div`
    text-align: center;
    font-size: 16px;
    color: var(--color-gray-600);
`;

const StayButton = styled.div`
    font-size: 14px;
    color: var(--color-gray-600);
    border-bottom: 1px solid var(--color-gray-600);
    cursor: pointer;
`;

const SvgImage = styled.img`
    width: 200px;
    height: 45px;
    cursor: pointer;
`;

const WelcomeModal: React.FC = () => {
    return (
        <Backdrop>
            <Container>
                <Wrapper>
                    <LargeText>다시 오신 것을 환영해요!</LargeText>
                    <Text>
                        로그인하여 더 스마트한 요약,
                        <br />
                        효율적인 프로젝트 관리 등을 이용하세요.
                    </Text>
                </Wrapper>
                <Wrapper>
                    <SvgImage src={GoogleIcon} />
                    <StayButton>로그아웃 유지</StayButton>
                </Wrapper>
            </Container>
        </Backdrop>
    );
};

export default WelcomeModal;
