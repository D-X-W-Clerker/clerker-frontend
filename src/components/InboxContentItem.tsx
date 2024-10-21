import React from 'react';
import styled from 'styled-components';
import { InviteDeleteIcon } from '@assets';

// -- 인터페이스 --
interface InboxContentItemProps {
  content: string;
  onClick: () => void;
  onDelete: () => void;
}

// -- 스타일 컴포넌트 --
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0 18px;
  border-bottom: 1px solid var(--color-gray-50);
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-50);
  }
  &:hover img {
    display: block;
  }
`;

// 읽음 처리 기능 추가하면 사용하세여
// const ContentArea = styled.div<{ $isUnread: boolean }>`
//   position: relative;
//   padding: 10px 10px;
//   cursor: pointer;
//
//   &::before {
//     content: '';
//     width: 5px;
//     height: 5px;
//     background-color: ${({ $isUnread }): string => {
//       return $isUnread ? 'var(--color-red)' : 'transparent';
//     }};
//     border-radius: 50%;
//     position: absolute;
//     left: 3px;
//     top: 14px;
//     transform: translateY(-50%);
//   }
// `;

const ContentArea = styled.div`
  padding: 10px 10px;
  cursor: pointer;
`;

const Content = styled.div`
  font-size: 12px;
  font-weight: var(--font-normal);
  color: var(--color-gray-600);
`;

const SvgImage = styled.img`
  position: absolute;
  display: none;
  top: 10px;
  right: 5px;
  width: 9px;
  height: 9px;
  padding: 3px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-200);
  }
`;

const InboxContentItem: React.FC<InboxContentItemProps> = ({
  content,
  onClick,
  onDelete,
}) => {
  return (
    <Container>
      <ContentArea onClick={onClick}>
        <Content>{content}</Content>
      </ContentArea>
      <SvgImage
        src={InviteDeleteIcon}
        onClick={(e): void => {
          e.stopPropagation();
          onDelete();
        }}
      />
    </Container>
  );
};

export default InboxContentItem;
