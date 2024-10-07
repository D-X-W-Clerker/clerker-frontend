import React from 'react';
import styled from 'styled-components';
import { ItemsCenterEndRow } from '@styles';

// -- 인터페이스 --
interface ProjectInputProps {
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onClick?: () => void;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterEndRow)`
  width: 100%;
  box-sizing: border-box;
  gap: 5px;
  padding: 6px;
  background-color: var(--color-gray-50);
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  font-size: 14px;
  text-align: right;
  box-sizing: border-box;

  ::placeholder {
    color: var(--color-gray-400);
    font-weight: var(--font-medium);
  }

  &:focus {
    outline: none;
  }
`;

const Label = styled.span`
  color: var(--color-gray-600);
  font-size: 14px;
`;

const DateInput: React.FC<ProjectInputProps> = ({
  type,
  label,
  value,
  onChange,
  placeholder,
  onClick,
}) => {
  return (
    <Container>
      <Input value={value} onChange={onChange} placeholder={placeholder} />
      <Label>{label}</Label>
    </Container>
  );
};

export default DateInput;
