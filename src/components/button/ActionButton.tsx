import React from 'react';
import styled from 'styled-components';
import { ItemsCenterRow } from '@styles';

interface ActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

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

const MenuTab: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => {
  return (
    <Container onClick={onClick}>
      <SvgIcon src={icon} />
      {label}
    </Container>
  );
};

export default MenuTab;
