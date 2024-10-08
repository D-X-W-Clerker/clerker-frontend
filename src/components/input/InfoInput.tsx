import React from 'react';
import styled from 'styled-components';
import { FlexCol } from '@styles';

// -- 인터페이스 --
interface InfoInputProps {
  label: string;
  value: string;
  isEditable?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)`
  gap: 5px;
`;

const Label = styled.div`
  font-size: 16px;
  color: var(--color-gray-600);
`;

const NameInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid var(--color-gray-100);
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: var(--color-gray-300);
  }
`;

const InfoInput: React.FC<InfoInputProps> = ({
  label,
  value,
  isEditable = false,
  onChange,
  placeholder,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      {isEditable ? (
        <NameInput
          id={label}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <Label>{value}</Label>
      )}
    </Container>
  );
};

export default InfoInput;
