import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalButton, ProjectInput, LargeModalTitleTab } from '@components';
import { CenterRow, FlexCol, ItemsCenterEndRow, ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface AddUserModalProps {
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
  width: 100%;
  max-width: 600px;
  height: 350px;
  box-sizing: border-box;
  gap: 20px;
  padding: 20px 20px;
  background-color: var(--background-color);
  border-radius: 10px;
`;

const ContentArea = styled(FlexCol)`
  flex: 1;
  gap: 20px;
`;

const ButtonArea = styled(ItemsCenterEndRow)`
  gap: 10px;
`;

const MemberInviteModal: React.FC<AddUserModalProps> = ({ onCancel }) => {
  const [email, setEmail] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);

  // 이메일 추가 처리
  const onAddUser = (): void => {
    if (email) {
      setUsers((prevUsers) => {
        return [...prevUsers, email];
      });
      setEmail(''); // 이메일 입력 초기화
    }
  };

  const onClickConfirm = (): void => {
    alert('사용자 초대 완료');
  };

  return (
    <Backdrop>
      <Container>
        <LargeModalTitleTab type="project" title="D & X : W conference" />
        <ContentArea>
          <ProjectInput
            type="invite"
            value={email}
            onChange={(e): void => {
              return setEmail(e.target.value);
            }}
            placeholder="이메일 입력"
            onClick={onAddUser}
          />
        </ContentArea>
        <ButtonArea>
          <ModalButton text="취소" color="gray" onClick={onCancel} />
          <ModalButton text="완료" color="blue" onClick={onClickConfirm} />
        </ButtonArea>
      </Container>
    </Backdrop>
  );
};

export default MemberInviteModal;
