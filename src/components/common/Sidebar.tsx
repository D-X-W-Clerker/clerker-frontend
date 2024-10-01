import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  AlarmIcon,
  SettingIcon,
  AddIcon,
  ActiveAlarmIcon,
  BackArrowIcon,
} from '@assets';
import {
  ActionButton,
  RootFolder,
  Profile,
  InboxContentItem,
  AccountSettingModal,
} from '@components';
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

interface InboxItem {
  id: string;
  content: string;
  isUnread: boolean;
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)`
  position: relative;
  width: 175px;
  flex-shrink: 0;
  max-height: 100vh;
  border-right: 0.5px solid var(--color-gray-300);
  background-color: var(--background-color);
`;

const ContentArea = styled(FlexCol)`
  flex: 1;
  height: calc(100vh - 50px);
`;

const SvgImage = styled.img<{ $width: number; $height: number }>`
  width: ${(props): number => {
    return props.$width;
  }}px;
  height: ${(props): number => {
    return props.$height;
  }}px;
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
  ::-webkit-scrollbar {
    width: 2px;
  }
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
`;

const CloseButton = styled.div`
  position: absolute;
  top: 67px;
  right: -6px;
  cursor: pointer;
`;

const InboxTitle = styled(ItemsCenterRow)`
  font-size: 16px;
  color: var(--color-gray-700);
  gap: 8px;
  padding: 0 18px;
  margin: 70px 0 8px;
  flex-shrink: 0;
  user-select: none;
`;

const InboxContentArea = styled(FlexCol)`
  flex: 1;
  overflow-y: auto;
`;

const menuItems = [
  { id: '1', icon: AlarmIcon, label: '수신함' },
  { id: '2', icon: SettingIcon, label: '계정 설정' },
  { id: '3', icon: AddIcon, label: '프로젝트 생성' },
];

const SideBar: React.FC = () => {
  const [showInbox, setShowInbox] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [inboxItems, setInboxItems] = useState<InboxItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const testInboxItems = [
      {
        id: '1',
        content:
          '안녕하세요 Clerker님! 프로젝트를 생성하여 서비스를 이용해보세요!',
        isUnread: true,
      },
      {
        id: '2',
        content: 'Clerker 프로젝트에 초대 되었습니다.',
        isUnread: true,
      },
    ];

    const testProjects = [
      {
        id: '1',
        name: 'Clerker',
        summaryFiles: [{ id: '6', name: '기획 회의' }],
        subFolders: [
          {
            id: '2',
            name: 'FE',
            summaryFiles: [],
          },
          {
            id: '3',
            name: 'BE',
            summaryFiles: [],
          },
          {
            id: '4',
            name: 'AI',
            summaryFiles: [{ id: '5', name: '9월 12일 회의' }],
          },
        ],
      },
    ];

    setInboxItems(testInboxItems);
    setProjects(testProjects);
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

  const onClickMenuItem = (itemId: string): void => {
    if (itemId === '1') {
      setShowInbox(true);
    } else if (itemId === '2') {
      setShowSettingModal(true);
    } else {
      onClickCreateProject();
    }
  };

  const onClickInboxItem = (itemId: string): void => {
    setInboxItems((prevItems) => {
      return prevItems.map((item) => {
        return item.id === itemId ? { ...item, isUnread: false } : item;
      });
    });
  };

  const onClickInboxDelete = (itemId: string): void => {
    alert('알림 삭제');
  };

  return (
    <Container>
      <ContentArea>
        {showInbox ? (
          <InboxArea>
            <InboxTitle>
              <SvgImage src={ActiveAlarmIcon} $width={16} $height={16} />
              수신함
            </InboxTitle>
            <InboxContentArea>
              {inboxItems.map((item) => {
                return (
                  <InboxContentItem
                    key={item.id}
                    content={item.content}
                    isUnread={item.isUnread}
                    onClick={(): void => {
                      return onClickInboxItem(item.id);
                    }}
                    onDelete={(): void => {
                      return onClickInboxDelete(item.id);
                    }}
                  />
                );
              })}
            </InboxContentArea>
            <CloseButton
              onClick={(): void => {
                return setShowInbox(false);
              }}
            >
              <SvgImage src={BackArrowIcon} $width={12} $height={26} />
            </CloseButton>
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
      {showSettingModal && (
        <AccountSettingModal
          onCancel={(): void => {
            return setShowSettingModal(false);
          }}
        />
      )}
    </Container>
  );
};

export default SideBar;
