import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  FileIcon,
  DownArrowIcon,
  RightArrowIcon,
  FolderIcon,
  MoreIcon,
} from '@assets';
import { FolderModal } from '@components';
import { CenterRow, ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface FolderItemProps {
  id: string;
  name: string;
  isOpen?: boolean;
  isSelected: boolean;
  onClickToggle?: () => void;
  onClickNav: () => void;
  isSubFolder?: boolean;
}

const Container = styled(ItemsCenterRow)<{
  $isSelected: boolean;
  $isSubFolder?: boolean;
  $onClickToggle?: () => void;
}>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  gap: 4px;
  padding: 4px 3px 4px
    ${(props): string => {
      if (!props.$onClickToggle) return props.$isSubFolder ? '38px' : '20px'; // 파일에 대한 padding
      return props.$isSubFolder ? '20px' : '3px'; // 폴더에 대한 padding
    }};
  border-radius: 7px;
  cursor: pointer;
  user-select: none;
  color: var(--color-gray-600);
  background-color: ${(props): string => {
    return props.$isSelected ? 'var(--color-gray-50)' : 'transparent';
  }};

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const MoreIconArea = styled(CenterRow)<{ $showModal: boolean }>`
  position: absolute;
  right: 3px;
  top: 58%;
  transform: translateY(-50%);
  cursor: pointer;
  display: ${(props): string => {
    return props.$showModal ? 'block' : 'none';
  }};

  ${Container}:hover & {
    display: block;
  }
`;

const Title = styled(ItemsCenterRow)`
  display: block;
  flex: 1;
  min-width: 0;
  font-weight: var(--font-normal);
  color: var(--color-gray-600);
  font-size: 12.6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  max-width: calc(100% - 40px);

  ${Container}:hover & {
    max-width: calc(100% - 50px);
  }
`;

const SvgImage = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

const MoreIconImage = styled(SvgImage)`
  padding: 1px 2px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

const FolderModalArea = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
`;

const Backdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const FolderItem: React.FC<FolderItemProps> = ({
  id,
  name,
  isOpen = false,
  isSelected,
  onClickToggle,
  onClickNav,
  isSubFolder = false,
}) => {
  const [showModal, setShowModal] = useState(false); // More 모달 관리 상태
  const modalRef = useRef<HTMLDivElement>(null);

  const onClickMoreIcon = (): void => {
    setShowModal((prev) => {
      return !prev;
    });
  };

  const onCloseModal = (): void => {
    setShowModal(false);
  };

  // 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <Container
      $isSelected={isSelected}
      $isSubFolder={isSubFolder}
      $onClickToggle={onClickToggle}
    >
      {onClickToggle && (
        <SvgImage
          src={isOpen ? DownArrowIcon : RightArrowIcon}
          onClick={(e): void => {
            e.stopPropagation();
            onClickToggle();
          }}
        />
      )}
      <SvgImage
        onClick={onClickNav}
        src={!onClickToggle ? FileIcon : FolderIcon}
      />
      <Title onClick={onClickNav} onDoubleClick={onClickToggle}>
        {name}
      </Title>
      <MoreIconArea onClick={onClickMoreIcon} $showModal={showModal}>
        <MoreIconImage src={MoreIcon} alt="More Options" />
      </MoreIconArea>
      {showModal && (
        <>
          <FolderModalArea ref={modalRef}>
            <FolderModal
              onRename={(): void => {
                alert('이름 변경');
              }}
              onDelete={(): void => {
                alert('프로젝트 삭제');
              }}
              onLeave={(): void => {
                alert('프로젝트 나가기');
              }}
            />
          </FolderModalArea>
          <Backdrop onClick={onCloseModal} />
        </>
      )}
    </Container>
  );
};

export default FolderItem;
