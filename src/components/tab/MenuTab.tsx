import React from 'react';
import styled from 'styled-components';
import { ItemsCenterRow } from '@styles';

interface MenuItemProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const Container = styled(ItemsCenterRow)`
  gap: 5px;
  padding: 4px 20px;
  color: var(--color-gray-500);
  font-size: 13px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const SvgIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const MenuTab: React.FC<MenuItemProps> = ({ icon, label, onClick }) => {
  return (
    <Container onClick={onClick}>
      <SvgIcon src={icon} />
      {label}
    </Container>
  );
};

export default MenuTab;
