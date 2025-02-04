import React from 'react';
import styled from 'styled-components';
import { TextButtonProps } from '@types';

interface ModalButtonProps extends TextButtonProps {
    color: string;
    disabled?: boolean; // disabled 속성 추가
}

// 스타일 컴포넌트
const Container = styled.button<{ $bgColor: string; $disabled: boolean }>`
    font-size: 15px;
    color: var(--background-color);
    background-color: ${({ $bgColor }): string => {
        return $bgColor;
    }};
    border: none;
    border-radius: 5px;
    padding: 3px 14px;
    cursor: ${({ $disabled }): string => {
        return $disabled ? 'not-allowed' : 'pointer';
    }}; // disabled일 때 커서 변경
    opacity: ${({ $disabled }): number => {
        return $disabled ? 0.6 : 1;
    }}; // disabled일 때 투명도 적용

    &:hover {
        opacity: ${({ $disabled }): number => {
            return $disabled ? 0.6 : 0.9;
        }}; // disabled일 때 hover 효과 제거
    }
`;

// 메인 함수 컴포넌트
const ModalButton: React.FC<ModalButtonProps> = ({
    text,
    color,
    onClick,
    disabled = false,
}) => {
    const bgColor =
        color === 'blue'
            ? 'var(--color-blue-200)'
            : color === 'red'
              ? 'var(--color-red)'
              : 'var(--color-gray-400)';

    return (
        <Container
            $bgColor={bgColor}
            $disabled={disabled}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </Container>
    );
};

export default ModalButton;
