import React from 'react';
import styled from 'styled-components';

// -- 인터페이스 --
interface ModalButtonProps {
    text: string;
    onClick: () => void;
}

// -- 스타일 컴포넌트 --
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

const ModalButton: React.FC<ModalButtonProps> = ({ text, onClick }) => {
    return <Container onClick={onClick}>{text}</Container>;
};

export default ModalButton;
