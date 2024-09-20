import React from 'react';
import styled from 'styled-components';
import { SmallModalTitleTab, ModalButton } from '@components';
import { FlexCol, CenterRow, ItemsCenterSpaceRow } from '@styles';

// -- 인터페이스 --
interface SmallModalProps {
  type: 'project' | 'logout';
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDelete: boolean;
}

// -- 스타일 컴포넌트 --
const Backdrop = styled(CenterRow)<{ $isDelete: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ $isDelete }): string => {
    return $isDelete ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.7)';
  }};
  z-index: 1000;
`;

const Container = styled(FlexCol)`
  width: 100%;
  max-width: 360px;
  padding: 20px 15px;
  gap: 55px;
  background-color: var(--background-color);
  border-radius: 7px;
`;

const MessageArea = styled(CenterRow)`
  font-size: 19px;
  color: var(--color-red);
`;

const ButtonArea = styled(ItemsCenterSpaceRow)``;

const SmallModal: React.FC<SmallModalProps> = ({
  type,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isDelete,
}) => {
  return (
    <Backdrop $isDelete={isDelete}>
      <Container>
        <SmallModalTitleTab type={type} title={title} />
        <MessageArea>{message}</MessageArea>
        <ButtonArea>
          <ModalButton text={cancelText} color="gray" onClick={onCancel} />
          <ModalButton text={confirmText} color="blue" onClick={onConfirm} />
        </ButtonArea>
      </Container>
    </Backdrop>
  );
};

export default SmallModal;
