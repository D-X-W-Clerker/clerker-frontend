import React from 'react';
import styled from 'styled-components';
import { ItemsCenterRow } from '@styles';

interface FolderModalButtonProps {
    icon: string;
    label: string;
    onClick: () => void;
    type: string;
}

const Container = styled(ItemsCenterRow)<{ $type: string }>`
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    gap: 5px;
    font-size: 14px;
    border-radius: 7px;
    cursor: pointer;
    color: ${(props): string => {
        return props.$type === 'change'
            ? 'var(--color-gray-700)'
            : 'var(--color-red)';
    }};
    background-color: var(--background-color);
    &:hover {
        background-color: var(--color-gray-50);
    }
`;

const SvgIcon = styled.img`
    width: 14px;
    height: 14px;
`;

const MenuTab: React.FC<FolderModalButtonProps> = ({
    icon,
    label,
    onClick,
    type,
}) => {
    return (
        <Container onClick={onClick} $type={type}>
            <SvgIcon src={icon} />
            {label}
        </Container>
    );
};

export default MenuTab;
