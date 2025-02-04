import React from 'react';
import styled from 'styled-components';
import { ItemsCenterRow } from '@styles';
import { LabelButtonProps } from '@types';

// 스타일 컴포넌트
const Container = styled(ItemsCenterRow)`
    width: 100%;
    box-sizing: border-box;
    gap: 5px;
    padding: 4px 20px;
    font-size: 12.6px;
    border-radius: 7px;
    cursor: pointer;
    color: var(--color-gray-500);
    background-color: var(--background-color);
    &:hover {
        background-color: var(--color-gray-50);
    }
`;

const SvgIcon = styled.img`
    width: 14px;
    height: 14px;
`;

// 메인 함수 컴포넌트
const ActionButton: React.FC<LabelButtonProps> = ({ icon, label, onClick }) => {
    return (
        <Container onClick={onClick}>
            <SvgIcon src={icon} />
            {label}
        </Container>
    );
};

export default ActionButton;
