import React from 'react';
import styled from 'styled-components';

// -- 인터페이스 --
interface ModalButtonProps {
  text: string;
  color: string;
  onClick: () => void;
}

// -- 스타일 컴포넌트 --
const Container = styled.button<{ $bgColor: string }>`
  font-size: 12px;
  color: var(--background-color);
  background-color: ${({ $bgColor }): string => {
    return $bgColor;
  }};
  border: none;
  border-radius: 5px;
  padding: 3px 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ModalButton: React.FC<ModalButtonProps> = ({ text, color, onClick }) => {
  const bgColor =
    color === 'blue' ? 'var(--color-blue-200)' : 'var(--color-gray-400)';

  return (
    <Container $bgColor={bgColor} onClick={onClick}>
      {text}
    </Container>
  );
};

export default ModalButton;
