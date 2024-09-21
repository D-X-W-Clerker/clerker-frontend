import React, { useState } from 'react';
import styled from 'styled-components';
import { LogoutIcon, UserImageIcon } from '@assets';
import { SmallModal } from '@components';
import { ItemsCenterRow, ItemsCenterSpaceRow } from '@styles';

// -- 스타일 컴포넌트 --
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickLogoutButton = (): void => {
    setIsModalOpen(true);
  };

  const onClickCloseButton = (): void => {
    setIsModalOpen(false);
  };

  const onClickConfirmButton = (): void => {
    // 로그아웃 함수 로직
    setIsModalOpen(false);
  };

  return (
    <Container>
      <UserInfoArea>
        <ProfileImage src={UserImageIcon} />
        <ProfileName>Clerker</ProfileName>
      </UserInfoArea>
      <LogoutButton src={LogoutIcon} onClick={onClickLogoutButton} />
      {isModalOpen && (
        <SmallModal
          type="logout"
          title="로그아웃"
          message="로그아웃 하시겠습니까?"
          onConfirm={onClickConfirmButton}
          onCancel={onClickCloseButton}
          isDelete={false}
        />
      )}
    </Container>
  );
};

export default Profile;
