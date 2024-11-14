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
import { useQuery, useMutation } from 'react-query';
import {
    getNotification,
    deleteNotification,
    getProject,
    createProject,
    createChildProject,
} from '../../apis';
import { Project, Meeting, ChildProject } from '../../types';

// -- 인터페이스 --
interface InboxItem {
    notificationId: string;
    content: string;
    createdAt: string;
    // isUnread: boolean; 여유가 되면 백엔드에게 기능 추가 부탁
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

    const { data: projects = [], refetch: refetchProjects } = useQuery<
        Project[]
    >('projects', getProject, {
        staleTime: 5 * 60 * 1000,
        onError: (error) => {
            console.error('프로젝트 데이터를 불러오는 데 실패했습니다:', error);
        },
    });

    const { data: fetchedInboxItems = [], refetch } = useQuery<InboxItem[]>(
        'notifications',
        getNotification,
        {
            enabled: false,
            staleTime: 5 * 60 * 1000,
            onError: (error) => {
                console.error('알림 데이터를 불러오는 데 실패했습니다:', error);
            },
        },
    );

    // 알림 삭제
    const deleteMutation = useMutation(deleteNotification, {
        onSuccess: () => {
            refetch(); // 삭제 후 알림 목록 다시 가져오기
        },
        onError: (error) => {
            console.error('알림 삭제 실패:', error);
        },
    });

    const exampleInboxItems: InboxItem[] = [
        {
            notificationId: '1',
            content:
                '안녕하세요 Clerker님! 프로젝트를 생성하여 서비스를 이용해보세요!',
            createdAt: '2024-10-21T02:33:01.603Z',
        },
        {
            notificationId: '2',
            content: 'Clerker 프로젝트에 초대되었습니다.',
            createdAt: '2024-10-21T02:33:01.603Z',
        },
    ];

    // 결합된 데이터 (API 데이터 우선, 없으면 예시 데이터 사용, 없앨때 api 연동 부분에 fetchedInboxItems -> inboxItems으로 수정)
    const inboxItems =
        fetchedInboxItems.length > 0 ? fetchedInboxItems : exampleInboxItems;

    const onClickInboxDelete = (notificationId: string): void => {
        deleteMutation.mutate(notificationId); // 알림 삭제 호출
    };

    // 프로젝트 생성
    const onClickCreateProject = (): void => {
        try {
            createProject();
            refetchProjects(); // 데이터 새로고침
        } catch (error) {
            console.error('프로젝트 생성 실패:', error);
        }
    };

    // 하위 프로젝트 생성
    const onClickCreateChildProject = (projectId: string): void => {
        try {
            createChildProject(projectId);
            refetchProjects(); // 데이터 새로고침
        } catch (error) {
            console.error(
                `하위 프로젝트 생성 실패 (프로젝트 ID: ${projectId}):`,
                error,
            );
        }
    };

    const onClickMenuItem = (itemId: string): void => {
        if (itemId === '1') {
            setShowInbox(true);
            refetch();
        } else if (itemId === '2') {
            setShowSettingModal(true);
        } else {
            onClickCreateProject();
        }
    };

    // 클릭시, 읽음 처리 함수 -> 추후 백엔드와 얘기
    const onClickInboxItem = (itemId: string): void => {
        // setInboxItems((prevItems) => {
        //     return prevItems.map((item) => {
        //         return item.notificationId === itemId
        //             ? { ...item, isUnread: false }
        //             : item;
        //     });
        // });
    };

    return (
        <Container>
            <ContentArea>
                {showInbox ? (
                    <InboxArea>
                        <InboxTitle>
                            <SvgImage
                                src={ActiveAlarmIcon}
                                $width={16}
                                $height={16}
                            />
                            수신함
                        </InboxTitle>
                        <InboxContentArea>
                            {inboxItems.map((item) => {
                                return (
                                    <InboxContentItem
                                        key={item.notificationId}
                                        content={item.content}
                                        onClick={(): void => {
                                            return onClickInboxItem(
                                                item.notificationId,
                                            );
                                        }}
                                        onDelete={(): void => {
                                            return onClickInboxDelete(
                                                item.notificationId,
                                            );
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
                            <SvgImage
                                src={BackArrowIcon}
                                $width={12}
                                $height={26}
                            />
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
                                        key={project.projectId}
                                        project={project}
                                        onClickCreateSubFolder={
                                            onClickCreateChildProject
                                        }
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
