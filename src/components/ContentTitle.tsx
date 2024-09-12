import React from 'react';
import styled from 'styled-components';
import { FolderIcon, FileIcon, SettingIcon, ShareIcon } from '../assets';

// -- 인터페이스 --
interface HeaderProps {
  type: 'project' | 'meeting';
  title: string;
}

// -- 스타일 컴포넌트 --
const Container = styled.div`
  display: flex;
  height: 33px;
  margin-top: 44px;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-color);
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 26px;
`;

const ActionArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconImage = styled.img<{ width: number; height: number }>`
  width: ${(props): number => {
    return props.width;
  }}px;
  height: ${(props): number => {
    return props.height;
  }}px;
  cursor: pointer;
`;

const ContentTitle: React.FC<HeaderProps> = ({ type, title }) => {
  const isProject = type === 'project';
  // 모달에서도 사용할 수 있게끔 하기
  return (
    <Container>
      <TitleArea>
        <IconImage
          src={isProject ? FolderIcon : FileIcon}
          alt={isProject ? 'Folder Icon' : 'File Icon'}
          width={isProject ? 34 : 28}
          height={isProject ? 26 : 33}
        />
        {title}
      </TitleArea>
      <ActionArea>
        {!isProject && (
          <IconImage src={ShareIcon} alt="Share Icon" width={20} height={22} />
        )}
        <IconImage
          src={SettingIcon}
          alt="Setting Icon"
          width={24}
          height={24}
        />
      </ActionArea>
    </Container>
  );
};

export default ContentTitle;
