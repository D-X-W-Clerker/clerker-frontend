import React from 'react';
import styled from 'styled-components';
import { ItemsCenterRow, ItemsCenterSpaceRow } from '../styles/FlexModule';
import { LogoutIcon, UserImageIcon } from '../assets';

const Container = styled(ItemsCenterSpaceRow)`
  width: 100%;
`;

const UserInfoArea = styled(ItemsCenterRow)`
  gap: 6px;
`;

const ProfileImage = styled.img`
  width: 23px;
  height: 23px;
  border-radius: 50%;
`;

const ProfileName = styled.span`
  font-size: 14px;
`;

const LogoutButton = styled.img`
  width: 13px;
  height: 12px;
  cursor: pointer;
`;

const Profile: React.FC = () => {
  return (
    <Container>
      <UserInfoArea>
        <ProfileImage src={UserImageIcon} />
        <ProfileName>Clerker</ProfileName>
      </UserInfoArea>
      <LogoutButton src={LogoutIcon} />
    </Container>
  );
};

export default Profile;
