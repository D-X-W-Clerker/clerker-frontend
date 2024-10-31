// src/pages/ProjectDetailPage.tsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { ActiveSettingIcon, MemberIcon, MemberAddIcon, AddIcon } from '@assets';
import {
    MemberTable,
    TitleTab,
    EventTab,
    ActionButton,
    EventFile,
    MemberInviteModal,
    MemberInfoModal,
    MeetCreateModal,
    MeetJoinModal,
} from '@components';
import { FlexCol, FlexRow, ItemsCenterRow, ItemsCenterStartRow } from '@styles';
import Layout from '../Layout'; // 실제 경로에 맞게 조정하세요
import ProjectCalendar from '../components/calendar/ProjectCalendar'; // 실제 경로에 맞게 조정하세요

// -- 인터페이스 --
interface MeetingData {
    meetingId: string;
    meetingName: string;
    startDate: string;
    createdAt: string;
}

interface ScheduleData {
    scheduleId: string;
    scheduleName: string;
    startDate: string;
    endDate: string;
    startTime: {
        hour: string;
        minute: string;
        second: string;
        nano: string;
    };
    endTime: {
        hour: string;
        minute: string;
        second: string;
        nano: string;
    };
    createdAt: string;
    isEnded: boolean;
}

interface MemberData {
    organizationId: string;
    username: string;
    email: string;
    type: string | null;
    role: string;
}

interface ProjectInfo {
    projectName: string;
    members: MemberData[];
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexRow)`
    width: 100%;
    max-width: 1100px;
`;

const ContentArea = styled(FlexCol)`
    width: 50%;
    overflow-y: auto;
    height: calc(100vh - 50px);
    padding: 40px;
    gap: 30px;
    ::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const IconImage = styled.img<{ $width: number; $height: number }>`
    width: ${(props): number => {
        return props.$width;
    }}px;
    height: ${(props): number => {
        return props.$height;
    }}px;
    cursor: pointer;
`;

// 왼쪽 영역
const LeftContentArea = styled(ContentArea)``;

const MemberArea = styled(FlexCol)``;

const MemberTabArea = styled(ItemsCenterRow)`
    gap: 6px;
    padding-left: 3px;
    margin-bottom: 15px;
    font-size: 20px;
    color: var(--color-gray-600);
`;

const MemberAddArea = styled(ItemsCenterStartRow)`
    padding: 5px;
    border-bottom: 0.5px solid var(--color-gray-300);
`;

const MemberAddButton = styled(ItemsCenterRow)`
    background-color: var(--color-gray-50);
    border-radius: 3px;
    padding: 2px;
    gap: 1px;
    font-size: 7px;
    color: var(--color-gray-400);
    cursor: pointer;
`;

const ContentTabArea = styled(FlexCol)``;

const ContentFileArea = styled(FlexCol)`
    gap: 4px;
`;

// 오른쪽 영역
const RightContentArea = styled(ContentArea)``;

// 스케줄 및 미팅 목록 get 함수
const fetchEventData = async (): Promise<{
    schedules: ScheduleData[];
    meetings: MeetingData[];
}> => {
    return {
        schedules: [
            {
                scheduleId: '3',
                scheduleName: '프론트 디자인 회의 일정',
                startDate: '2024-10-21',
                endDate: '2024-10-21',
                startTime: {
                    hour: '10',
                    minute: '20',
                    second: '30',
                    nano: '40',
                },
                endTime: {
                    hour: '10',
                    minute: '20',
                    second: '30',
                    nano: '40',
                },
                createdAt: '2024-09-20T10:30:00',
                isEnded: false,
            },
        ],
        meetings: [
            {
                meetingId: '1',
                meetingName: '프로젝트 킥오프',
                startDate: '2024-07-02T10:30:00',
                createdAt: '2024-07-02T10:30:00',
            },
            {
                meetingId: '2',
                meetingName: '기획 회의',
                startDate: '2024-07-08T14:00:00',
                createdAt: '2024-07-08T14:00:00',
            },
        ],
    };
};

// 프로젝트 정보 조회 함수
const fetchProjectInfo = async (): Promise<ProjectInfo> => {
    return {
        projectName: 'Clerker',
        members: [
            {
                organizationId: '1',
                username: '이정욱',
                email: 'dlwjddnr5438@kookmin.ac.kr',
                type: 'BE',
                role: 'owner',
            },
            {
                organizationId: '2',
                username: '신진욱',
                email: 'jinwook2765@kookmin.ac.kr',
                type: 'FE',
                role: 'member',
            },
            {
                organizationId: '3',
                username: '임형빈',
                email: 'gudqls3157@gmail.com',
                type: 'AI',
                role: 'member',
            },
            {
                organizationId: '4',
                username: '박건민',
                email: 'pkm021118@kookmin.ac.kr',
                type: 'DE',
                role: 'member',
            },
        ],
    };
};

const ProjectDetailPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [activeTab, setActiveTab] = useState<string>('meeting');
    const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
    const [meetingData, setMeetingData] = useState<MeetingData[]>([]);
    const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingData | null>(
        null,
    );
    const [modalType, setModalType] = useState<
        'memberAdd' | 'memberInfo' | 'meetCreate' | 'meetJoin' | null
    >(null);

    const handleOpenModal = (
        type: 'memberAdd' | 'memberInfo' | 'meetCreate' | 'meetJoin',
        meeting?: MeetingData,
    ): void => {
        setModalType(type);
        if (meeting) {
            setSelectedMeeting(meeting);
        }
    };

    const handleCloseModal = (): void => {
        setModalType(null);
        setSelectedMeeting(null);
    };

    const onClickEventFile = (event: MeetingData | ScheduleData): void => {
        if (activeTab === 'meeting') {
            handleOpenModal('meetJoin', event as MeetingData);
        } else if (activeTab === 'schedule') {
            console.log('스케줄을 클릭했습니다:', event);
        }
    };

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            const { meetings, schedules } = await fetchEventData();
            const projectInfoData = await fetchProjectInfo();
            setMeetingData(meetings);
            setScheduleData(schedules);
            setProjectInfo(projectInfoData);
        };
        fetchData();
    }, []);

    const eventData = activeTab === 'meeting' ? meetingData : scheduleData;

    return (
        <Layout>
            <Container>
                <LeftContentArea>
                    <TitleTab
                        type="project"
                        title={projectInfo?.projectName || ''}
                    />
                    <MemberArea>
                        <MemberTabArea>
                            <IconImage
                                src={MemberIcon}
                                $width={28}
                                $height={20}
                            />
                            Member
                            <IconImage
                                src={ActiveSettingIcon}
                                $width={16}
                                $height={16}
                                onClick={(): void => {
                                    return handleOpenModal('memberInfo');
                                }}
                            />
                        </MemberTabArea>
                        <MemberTable data={projectInfo?.members || []} />
                        <MemberAddArea>
                            <MemberAddButton
                                onClick={(): void => {
                                    return handleOpenModal('memberAdd');
                                }}
                            >
                                <IconImage
                                    src={MemberAddIcon}
                                    $width={7}
                                    $height={7}
                                />
                                추가하기
                            </MemberAddButton>
                        </MemberAddArea>
                    </MemberArea>
                    <ContentTabArea>
                        <EventTab
                            activeTab={activeTab}
                            onClickTab={setActiveTab}
                        />
                        <ContentFileArea>
                            {activeTab === 'meeting' && (
                                <ActionButton
                                    icon={AddIcon}
                                    label="회의 생성"
                                    onClick={(): void => {
                                        return handleOpenModal('meetCreate');
                                    }}
                                />
                            )}
                            {eventData.map((event) => {
                                const isMeeting = 'meetingId' in event;
                                const key = isMeeting
                                    ? event.meetingId
                                    : event.scheduleId;
                                const eventName = isMeeting
                                    ? event.meetingName
                                    : event.scheduleName;
                                return (
                                    <EventFile
                                        key={key}
                                        meetingName={eventName}
                                        dateTime={event.createdAt}
                                        onClick={(): void => {
                                            return onClickEventFile(event);
                                        }}
                                    />
                                );
                            })}
                        </ContentFileArea>
                    </ContentTabArea>
                </LeftContentArea>
                <RightContentArea>
                    <ProjectCalendar /> {/* 오른쪽 영역에 캘린더 추가 */}
                </RightContentArea>
            </Container>
            {modalType === 'memberAdd' && (
                <MemberInviteModal
                    projectId={projectId || ''}
                    onCancel={handleCloseModal}
                />
            )}
            {modalType === 'memberInfo' && (
                <MemberInfoModal
                    projectId={projectId || ''}
                    onCancel={handleCloseModal}
                />
            )}
            {modalType === 'meetCreate' && (
                <MeetCreateModal
                    projectId={projectId || ''}
                    onCancel={handleCloseModal}
                />
            )}
            {modalType === 'meetJoin' && selectedMeeting && (
                <MeetJoinModal
                    meetingId={selectedMeeting.meetingId}
                    onCancel={handleCloseModal}
                />
            )}
        </Layout>
    );
};

export default ProjectDetailPage;
