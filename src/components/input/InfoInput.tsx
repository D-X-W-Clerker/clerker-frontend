import React from 'react';
import styled from 'styled-components';
import { FlexCol } from '@styles';
import { LabelInputProps } from '@types';

// 스타일 컴포넌트
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

// 메인 함수 컴포넌트
const InfoInput: React.FC<LabelInputProps> = ({
    label,
    value = '',
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
                    value={value || ''}
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
