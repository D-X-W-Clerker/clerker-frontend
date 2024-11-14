import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LogoutIcon, ClerkerIcon } from '@assets';
import { SmallModal } from '@components';
import { ItemsCenterRow, ItemsCenterSpaceRow } from '@styles';
import { useAuthStore } from '@store';

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
    object-fit: cover;
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
    const { user } = useAuthStore();
    const [userName, setUserName] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // user 상태가 변경될 때마다 userName과 profileImage를 업데이트
    useEffect(() => {
        if (user) {
            setUserName(user.name);
            setProfileImage(user.profileImage); // 프로필 이미지 설정
        }
    }, [user]);

    const onClickLogoutButton = (): void => {
        setIsModalOpen(true);
    };

    const onClickCloseButton = (): void => {
        setIsModalOpen(false);
    };

    const onClickConfirmButton = (): void => {
        useAuthStore.getState().logout(); // 로그아웃 함수 호출
        setUserName(null); // 사용자 이름 초기화
        setProfileImage(null); // 프로필 이미지 초기화
        setIsModalOpen(false);

        // 홈페이지로 리다이렉트
        window.location.href = '/';
    };

    return (
        <Container>
            <UserInfoArea>
                <ProfileImage
                    src={profileImage || ClerkerIcon}
                    alt="프로필 이미지"
                />
                <ProfileName>{userName}</ProfileName>
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
