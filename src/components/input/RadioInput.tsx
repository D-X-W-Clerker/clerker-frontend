import React from 'react';
import styled from 'styled-components';
import { ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface RadioProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterRow)`
    cursor: pointer;
`;

const Radio = styled.input`
    margin-right: 10px;
`;

const Label = styled.span`
    font-size: 14px;
    color: var(--color-gray-600);
`;

const RadioInput: React.FC<RadioProps> = ({
    label,
    name,
    checked,
    onChange,
}) => {
    return (
        <Container>
            <Radio
                type="radio"
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <Label>{label}</Label>
        </Container>
    );
};

export default RadioInput;
