import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ClerkerIcon, DeleteIcon, ProfileAddIcon } from '@assets';
import {
  LargeModalTitleTab,
  ModalButton,
  InfoInput,
  SmallModal,
} from '@components';
import {
  CenterRow,
  FlexCol,
  ItemsCenterRow,
  ItemsCenterSpaceRow,
} from '@styles';

// -- 인터페이스 --
interface AccountSettingModalProps {
  onCancel: () => void;
}

// -- 스타일 컴포넌트 --
const Backdrop = styled(CenterRow)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 1000;
`;

const Container = styled(FlexCol)`
  position: relative;
  width: 100%;
  max-width: 520px;
  box-sizing: border-box;
  gap: 40px;
  padding: 20px 20px;
  background-color: var(--background-color);
  border-radius: 10px;
`;

const ContentArea = styled(ItemsCenterRow)`
  padding: 0 30px;
  gap: 20px;
`;

const ProfileInfoArea = styled(FlexCol)`
  flex: 1;
  gap: 10px;
`;

const ProfileImageArea = styled.div`
  position: relative;
  display: block;
  width: 90px;
  height: 90px;
`;

const SvgImage = styled.img<{ $width: number; $height: number }>`
  width: ${(props): number => {
    return props.$width;
  }}px;
  height: ${(props): number => {
    return props.$height;
  }}px;
  cursor: pointer;
`;

const ProfileImage = styled(SvgImage)`
  display: block;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileAddIconImage = styled(SvgImage)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const HiddenInput = styled.input`
  display: none;
`;

const DeleteButton = styled(ItemsCenterRow)`
  gap: 5px;
  cursor: pointer;
  font-size: 15px;
  color: var(--color-red);
`;

const ButtonArea = styled(ItemsCenterRow)`
  gap: 10px;
`;

const FooterArea = styled(ItemsCenterSpaceRow)``;

const AccountSettingModal: React.FC<AccountSettingModalProps> = ({
  onCancel,
}) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // 프로필 이미지 변경 처리
  const onClickProfile = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일이 선택되었을 때 상태 업데이트
  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]); // 선택한 파일을 상태로 저장
    }
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const onClickConfirmButton = (): void => {
    alert('계정 설정');
  };

  const onClickAccountDelete = (): void => {
    setShowModal(true);
  };

  const onClickCancelDelete = (): void => {
    setShowModal(false);
  };

  const onClickConfirmDelete = (): void => {
    alert('계정이 삭제되었습니다.');
    navigate('/');
    setShowModal(false);
  };

  return (
    <>
      <Backdrop>
        <Container>
          <LargeModalTitleTab type="accountSetting" title="계정 설정" />
          <ContentArea>
            <ProfileImageArea>
              <ProfileImage
                src={
                  profileImage ? URL.createObjectURL(profileImage) : ClerkerIcon
                }
                $width={90}
                $height={90}
                onClick={onClickProfile}
              />
              <ProfileAddIconImage
                src={ProfileAddIcon}
                $width={24}
                $height={24}
                onClick={onClickProfile}
              />
              <HiddenInput
                type="file"
                ref={fileInputRef}
                onChange={onChangeFile}
                accept="image/*"
              />
            </ProfileImageArea>
            <ProfileInfoArea>
              <InfoInput
                label="이름"
                value={name}
                isEditable
                onChange={onChangeName}
                placeholder="Clerker"
              />
              <InfoInput label="이메일" value="jinwook2765@kookmin.ac.kr" />
            </ProfileInfoArea>
          </ContentArea>
          <FooterArea>
            <DeleteButton onClick={onClickAccountDelete}>
              <SvgImage src={DeleteIcon} $width={18} $height={18} />
              계정 삭제
            </DeleteButton>
            <ButtonArea>
              <ModalButton text="취소" color="gray" onClick={onCancel} />
              <ModalButton
                text="확인"
                color="blue"
                onClick={onClickConfirmButton}
              />
            </ButtonArea>
          </FooterArea>
        </Container>
      </Backdrop>
      {showModal && (
        <SmallModal
          type="account"
          title="계정 삭제"
          message="계정을 삭제 하시겠습니까?"
          onConfirm={onClickConfirmDelete}
          onCancel={onClickCancelDelete}
          isDelete
        />
      )}
    </>
  );
};

export default AccountSettingModal;
