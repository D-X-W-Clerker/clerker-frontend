import React, { useState } from 'react';
import styled from 'styled-components';
import { CenterRow, FlexCol, ItemsCenterRow } from '../../styles/FlexModule';
import { AlarmIcon, SettingIcon, AddIcon, ActiveAlarmIcon } from '../../assets';
import { MenuItem, ProjectFolder, Profile } from '../index';

// -- 인터페이스 --
interface SummaryFile {
  id: string;
  name: string;
}

interface SubFolder {
  id: string;
  name: string;
  summaryFiles: SummaryFile[];
}

interface Project {
  id: string;
  name: string;
  summaryFiles: SummaryFile[];
  subFolders: SubFolder[];
}

interface SideBarProps {
  projects: Project[];
  onClickCreateProject: () => void;
  onClickCreateSubFolder: (projectId: string) => void;
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)`
  width: 175px;
  max-height: 100vh;
  border-right: 0.5px solid #b6b6b6;
  background-color: var(--background-color);
`;

const ContentArea = styled(FlexCol)`
  flex: 1;
  height: calc(100vh - 50px);
`;

const SvgIcon = styled.img`
  width: 16px;
  height: 16px;
`;

// 메뉴 탭
const MenuArea = styled(FlexCol)`
  gap: 4px;
  padding: 14px 8px;
  margin-top: 50px;
  flex-shrink: 0;
`;

// 프로젝트 폴더
const ProjectListArea = styled.div`
  flex: 1;
  padding: 0 8px;
  overflow-y: auto;
`;

// 유저 프로필
const UserInfoArea = styled(CenterRow)`
  flex-shrink: 0;
  height: 57px;
  padding: 0 16px;
  border-top: 0.5px solid #b6b6b6;
  background-color: var(--background-color);
`;

// 수신함 목록
const InboxArea = styled(FlexCol)`
  flex: 1;
  padding: 0 18px;
`;

const InboxTitle = styled(ItemsCenterRow)`
  font-size: 16px;
  color: #262626;
  gap: 8px;
  margin: 70px 0 18px;
  flex-shrink: 0;
`;

const InboxContentArea = styled(FlexCol)`
  flex: 1;
  gap: 5px;
  overflow-y: auto;
`;

const menuItems = [
  { id: 1, icon: AlarmIcon, label: '수신함' },
  { id: 2, icon: SettingIcon, label: '계정 설정' },
  { id: 3, icon: AddIcon, label: '프로젝트 생성' },
];

const SideBar: React.FC<SideBarProps> = ({
  projects,
  onClickCreateProject,
  onClickCreateSubFolder,
}) => {
  const [showInbox, setShowInbox] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const onClickMenuItem = (itemId: number): void => {
    if (itemId === 1) {
      setShowInbox(true);
    } else if (itemId === 3) {
      onClickCreateProject();
      setShowInbox(false);
    }
  };

  const onClickProjectFolder = (projectId: string): void => {
    // 선택된 프로젝트가 이미 선택되어 있으면 선택 해제, 아니면 선택
    setSelectedProjectId((prevSelectedId) => {
      return prevSelectedId === projectId ? null : projectId;
    });
  };

  return (
    <Container>
      <ContentArea>
        {showInbox ? (
          <InboxArea>
            <InboxTitle>
              <SvgIcon src={ActiveAlarmIcon} />
              수신함
            </InboxTitle>
            <InboxContentArea>Inbox content</InboxContentArea>
          </InboxArea>
        ) : (
          <>
            <MenuArea>
              {menuItems.map((item) => {
                return (
                  <MenuItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    onClick={(): void => {
                      return onClickMenuItem(item.id);
                    }}
                  />
                );
              })}
            </MenuArea>
            <ProjectListArea>
              {projects.map((project) => {
                return (
                  <ProjectFolder
                    key={project.id}
                    project={project}
                    onClickCreateSubFolder={onClickCreateSubFolder}
                    isSelected={selectedProjectId === project.id}
                    onClickProjectFolder={(): void => {
                      return onClickProjectFolder(project.id);
                    }}
                  />
                );
              })}
            </ProjectListArea>
            <UserInfoArea>
              <Profile />
            </UserInfoArea>
          </>
        )}
      </ContentArea>
    </Container>
  );
};

export default SideBar;
