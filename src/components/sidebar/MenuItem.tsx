import React from 'react';
import styled from 'styled-components';

interface MenuItemProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 20px;
  color: #707070;
  font-size: 13px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #ececec;
  }
`;

const SvgIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick }) => {
  return (
    <Container onClick={onClick}>
      <SvgIcon src={icon} />
      {label}
    </Container>
  );
};

export default MenuItem;
