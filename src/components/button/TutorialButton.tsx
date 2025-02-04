import React from 'react';
import styled from 'styled-components';
import { TextButtonProps } from '@types';

// 스타일 컴포넌트
const Container = styled.button`
    font-size: 17px;
    color: var(--background-color);
    background-color: var(--color-blue-200);
    border: none;
    border-radius: 12px;
    padding: 5px 25px;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

// 메인 함수 컴포넌트
const TutorialButton: React.FC<TextButtonProps> = ({ text, onClick }) => {
    return <Container onClick={onClick}>{text}</Container>;
};

export default TutorialButton;
