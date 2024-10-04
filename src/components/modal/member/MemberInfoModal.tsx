import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { MemberIcon } from '@assets';
import {
  ModalButton,
  LargeModalTitleTab,
  MemberTable,
  MemberEditTable,
} from '@components';
import {
  CenterRow,
  FlexCol,
  ItemsCenterRow,
  ItemsCenterStartRow,
  ItemsCenterEndRow,
} from '@styles';

// -- 인터페이스 --
interface MemberInfoModalProps {
  onCancel: () => void;
  data: {
    id: string;
    name: string;
    role: string | null;
    email: string;
    permission: string;
  }[];
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
  max-width: 520px;
  height: 350px;
  box-sizing: border-box;
  gap: 20px;
  padding: 20px 20px;
  background-color: var(--background-color);
  border-radius: 10px;
`;

const ContentArea = styled(FlexCol)`
  flex: 1;
  gap: 10px;
`;

const TextArea = styled(ItemsCenterRow)`
  padding: 0 5px;
  gap: 5px;
`;

const MemberTableArea = styled(FlexCol)`
  overflow-y: auto;
  max-height: 150px;
`;

const ButtonArea = styled(ItemsCenterEndRow)`
  gap: 10px;
`;

const Text = styled(ItemsCenterStartRow)`
  font-size: 14px;
  color: var(--color-gray-600);
`;

const SvgImage = styled.img`
  width: 17px;
  height: 17px;
`;

const MemberInfoModal: React.FC<MemberInfoModalProps> = ({
  onCancel,
  data,
}) => {
  // Role 업데이트 상태 관리
  const [members, setMembers] = useState(data);

  // onRoleChange 함수에 useCallback을 사용하여 무한 렌더링 방지
  const onRoleChange = useCallback((id: string, newRole: string): void => {
    setMembers((prevMembers) => {
      return prevMembers.map((member) => {
        // 기존의 역할과 변경된 역할이 다른 경우에만 상태를 업데이트
        if (member.id === id && member.role !== newRole) {
          return { ...member, role: newRole };
        }
        return member;
      });
    });
  }, []); // 의존성 배열을 빈 배열로 설정하여 불필요한 렌더링 방지

  const onClickConfirm = (): void => {
    alert('멤버 정보 변경 완료');
  };

  return (
    <Backdrop>
      <Container>
        <LargeModalTitleTab type="project" title="D & X : W conference" />
        <ContentArea>
          <TextArea>
            <SvgImage src={MemberIcon} />
            <Text>Member</Text>
          </TextArea>
          <MemberTableArea>
            <MemberTable data={members} />
            {/* <MemberEditTable data={members} onRoleChange={onRoleChange} /> */}
          </MemberTableArea>
        </ContentArea>
        <ButtonArea>
          <ModalButton text="취소" color="gray" onClick={onCancel} />
          <ModalButton text="완료" color="blue" onClick={onClickConfirm} />
        </ButtonArea>
      </Container>
    </Backdrop>
  );
};

export default MemberInfoModal;
