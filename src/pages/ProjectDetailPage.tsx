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
    When2meet,
} from '@components';
import { FlexCol, FlexRow, ItemsCenterRow, ItemsCenterStartRow } from '@styles';
import Layout from '../Layout';
import ProjectCalendar from '../components/calendar/ProjectCalendar';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const cookies = document.cookie.split('; ').reduce(
            (acc, cookie) => {
                const [key, value] = cookie.split('=');
                acc[key] = value;
                return acc;
            },
            {} as Record<string, string>,
        );

        const token = cookies['token'];

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

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
    width: ${(props) => props.$width}px;
    height: ${(props) => props.$height}px;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    text-align: right;
`;

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

const RightContentArea = styled(ContentArea)``;

const ProjectDetailPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [activeTab, setActiveTab] = useState<'meeting' | 'schedule'>(
        'meeting',
    );
    const [meetingData, setMeetingData] = useState<MeetingData[]>([]);
    const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
    const [modalType, setModalType] = useState<
        'memberAdd' | 'memberInfo' | 'meetCreate' | 'meetJoin' | null
    >(null);
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingData | null>(
        null,
    );
    const [scheduleClicked, setScheduleClicked] = useState(false);

    const members: MemberData[] = [
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
    ];

    useEffect(() => {
        const fetchMeetingData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/schedule/${projectId}`,
                );
                setMeetingData(response.data.meetings);
            } catch (error) {
                console.error('Failed to fetch meeting data:', error);
            }
        };

        const fetchSchedules = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/schedule/${projectId}`,
                );
                setScheduleData(
                    response.data.schedules.sort(
                        (a: ScheduleData, b: ScheduleData) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime(),
                    ),
                );
            } catch (error) {
                console.error('Failed to fetch schedules:', error);
            }
        };

        fetchMeetingData();
        fetchSchedules();
    }, [projectId]);

    const handleOpenModal = (
        type: 'memberAdd' | 'memberInfo' | 'meetCreate' | 'meetJoin',
        meeting?: MeetingData,
    ) => {
        setModalType(type);
        if (meeting) {
            setSelectedMeeting(meeting);
        }
    };

    const handleCloseModal = () => {
        setModalType(null);
        setSelectedMeeting(null);
    };

    const onClickEventFile = (event: MeetingData | ScheduleData) => {
        if (activeTab === 'meeting') {
            handleOpenModal('meetJoin', event as MeetingData);
        } else if (activeTab === 'schedule') {
            setScheduleClicked(true);
        }
    };

    const addSchedule = (newSchedule: ScheduleData) => {
        if (newSchedule && newSchedule.scheduleId && newSchedule.scheduleName) {
            setScheduleData((prev) =>
                [newSchedule, ...prev].sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                ),
            );
        } else {
            console.error('Invalid schedule data:', newSchedule);
        }
    };

    const eventData = activeTab === 'meeting' ? meetingData : scheduleData;

    return (
        <Layout>
            <Container>
                <LeftContentArea>
                    <TitleTab type="project" title={`Project ${projectId}`} />
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
                                onClick={() => handleOpenModal('memberInfo')}
                            />
                        </MemberTabArea>
                        <MemberTable data={members} />
                        <MemberAddArea>
                            <MemberAddButton
                                onClick={() => handleOpenModal('memberAdd')}
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
                                <ButtonContainer>
                                    <ActionButton
                                        icon={AddIcon}
                                        label="회의 생성"
                                        onClick={() =>
                                            handleOpenModal('meetCreate')
                                        }
                                    />
                                </ButtonContainer>
                            )}
                            {eventData.map((event) => {
                                if ('meetingId' in event) {
                                    return (
                                        <EventFile
                                            key={event.meetingId}
                                            meetingName={event.meetingName}
                                            dateTime={event.createdAt}
                                            onClick={() =>
                                                onClickEventFile(event)
                                            }
                                        />
                                    );
                                }
                                if ('scheduleId' in event) {
                                    return (
                                        <EventFile
                                            key={event.scheduleId}
                                            meetingName={event.scheduleName}
                                            dateTime={event.createdAt}
                                            onClick={() =>
                                                onClickEventFile(event)
                                            }
                                        />
                                    );
                                }
                                return null;
                            })}
                        </ContentFileArea>
                    </ContentTabArea>
                </LeftContentArea>
                <RightContentArea>
                    {scheduleClicked ? (
                        <When2meet onCancel={() => setScheduleClicked(false)} />
                    ) : (
                        <ProjectCalendar
                            projectId={projectId || ''}
                            addSchedule={addSchedule}
                        />
                    )}
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
