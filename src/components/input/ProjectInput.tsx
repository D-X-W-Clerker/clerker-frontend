import React from 'react';
import styled from 'styled-components';
import { ModalButton } from '@components';
import { ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface ProjectInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onClick?: () => void;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterRow)`
  width: 100%;
  box-sizing: border-box;
  gap: 10px;
  padding: 5px 15px;
  background-color: var(--color-gray-50);
  border-radius: 5px;
`;

const EmailInput = styled.input`
  flex: 1;
  border: none;
  background-color: var(--color-gray-50);
  font-size: 14px;
  box-sizing: border-box;

  ::placeholder {
    color: var(--color-gray-400);
    font-weight: var(--font-medium);
  }

  &:focus {
    outline: none;
  }
`;

const ProjectInput: React.FC<ProjectInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  onClick,
}) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // 이메일 유효성 체크

  return (
    <Container>
      <EmailInput value={value} onChange={onChange} placeholder={placeholder} />
      {type === 'invite' && (
        <ModalButton
          text="초대"
          color={isEmailValid ? 'blue' : 'gray'}
          onClick={isEmailValid ? onClick : undefined} // 이메일이 유효하지 않으면 비활성화
          disabled={!isEmailValid}
        />
      )}
    </Container>
  );
};

export default ProjectInput;
