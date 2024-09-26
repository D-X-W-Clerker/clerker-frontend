import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AlarmIcon, SettingIcon, AddIcon, ActiveAlarmIcon } from '@assets';
import { ActionButton, RootFolder, Profile } from '@components';
import { CenterRow, FlexCol, ItemsCenterRow } from '@styles';

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

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)`
  width: 175px;
  max-height: 100vh;
  border-right: 0.5px solid var(--color-gray-300);
  background-color: var(--background-color);
`;

const ContentArea = styled(FlexCol)`
  flex: 1;
  height: calc(100vh - 50px);
`;

const SvgImage = styled.img`
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
  border-top: 0.5px solid var(--color-gray-300);
  background-color: var(--background-color);
`;

// 수신함 목록
const InboxArea = styled(FlexCol)`
  flex: 1;
  padding: 0 18px;
`;

const InboxTitle = styled(ItemsCenterRow)`
  font-size: 16px;
  color: var(--color-gray-700);
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

const SideBar: React.FC = () => {
  const [showInbox, setShowInbox] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    const initialProjects = [
      {
        id: crypto.randomUUID(),
        name: 'Clerkerㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ',
        summaryFiles: [{ id: crypto.randomUUID(), name: '기획 회의' }],
        subFolders: [
          {
            id: crypto.randomUUID(),
            name: 'FEㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ',
            summaryFiles: [],
          },
          {
            id: crypto.randomUUID(),
            name: 'BE',
            summaryFiles: [],
          },
          {
            id: crypto.randomUUID(),
            name: 'AI',
            summaryFiles: [{ id: crypto.randomUUID(), name: '9월 12일 회의' }],
          },
        ],
      },
    ];
    setProjects(initialProjects);
  }, []);

  const onClickCreateProject = (): void => {
    setProjects((prevProjects) => {
      return [
        ...prevProjects,
        {
          id: crypto.randomUUID(),
          name: '새 프로젝트',
          summaryFiles: [],
          subFolders: [],
        },
      ];
    });
  };

  const onClickCreateSubFolder = (projectId: string): void => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        return project.id === projectId
          ? {
              ...project,
              subFolders: [
                ...project.subFolders,
                {
                  id: crypto.randomUUID(),
                  name: `새로운 폴더`,
                  summaryFiles: [{ id: crypto.randomUUID(), name: '회의록' }],
                },
              ],
            }
          : project;
      });
    });
  };

  const onClickProjectFolder = (projectId: string): void => {
    // 선택된 프로젝트가 이미 선택되어 있으면 선택 해제, 아니면 선택
    setSelectedProjectId((prevSelectedId) => {
      return prevSelectedId === projectId ? null : projectId;
    });
    navigate(`/project/${projectId}`);
  };

  const onClickMenuItem = (itemId: number): void => {
    if (itemId === 1) {
      alert('수신함 확인');
    } else if (itemId === 2) {
      alert('계정 설정');
    } else {
      onClickCreateProject();
    }
  };

  return (
    <Container>
      <ContentArea>
        {showInbox ? (
          <InboxArea>
            <InboxTitle>
              <SvgImage src={ActiveAlarmIcon} />
              수신함
            </InboxTitle>
            <InboxContentArea>Inbox content</InboxContentArea>
          </InboxArea>
        ) : (
          <>
            <MenuArea>
              {menuItems.map((item) => {
                return (
                  <ActionButton
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
                  <RootFolder
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
