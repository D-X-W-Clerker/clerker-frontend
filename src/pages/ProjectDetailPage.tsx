import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
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
    RecordingStopModal,
    When2meet,
} from '@components';
import {
    FlexCol,
    FlexRow,
    ItemsCenterRow,
    ItemsCenterStartRow,
    ItemsCenterEndRow,
} from '@styles';
import axios from 'axios';
import EndedMeetingModal from '@components/modal/meet/EndedMeetingModal';
import Layout from '../Layout';
import ProjectCalendar from '../components/calendar/ProjectCalendar';
import { getProjectInfo } from '../apis';

// Axios Instance 설정
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true, // 인증 정보 포함
});

// Axios 인터셉터 설정
axiosInstance.interceptors.request.use(
    (config) => {
        const token = document.cookie
            .split('; ')
            .find((row) => {
                return row.startsWith('token=');
            })
            ?.split('=')[1];
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// TypeScript 인터페이스 정의
interface MeetingData {
    meetingId: string;
    name: string;
    startDate: string;
    createdAt: string;
    isEnded: boolean;
    url?: string;
    domain: string; // 도메인 추가
}

interface ScheduleData {
    scheduleId: string;
    scheduleName: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    isEnded: boolean;
}

interface Member {
    organizationId: string;
    username: string;
    email: string;
    type: string | null;
    role: string;
}

interface ProjectInfo {
    projectName: string;
    members: Member[];
}

// ModalType에 'when2meet' 추가
type ModalType =
    | 'memberAdd'
    | 'memberInfo'
    | 'meetCreate'
    | 'meetJoin'
    | 'recordingStop'
    | 'endedMeeting'
    | 'when2meet' // 추가된 타입
    | null;

// 스타일 컴포넌트
const Container = styled(FlexRow)`
    width: 100%;
    max-width: 1100px;
`;

const ContentArea = styled(FlexCol)`
    width: 50%;
    overflow-x: auto;
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
    width: ${(props) => {
        return props.$width;
    }}px;
    height: ${(props) => {
        return props.$height;
    }}px;
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

// ProjectDetailPage 컴포넌트
const ProjectDetailPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [activeTab, setActiveTab] = useState<'meeting' | 'schedule'>(
        'meeting',
    );
    const [meetingData, setMeetingData] = useState<MeetingData[]>([]);
    const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingData | null>(
        null,
    );
    const [selectedSchedule, setSelectedSchedule] =
        useState<ScheduleData | null>(null); // 추가된 상태
    const [scheduleClicked, setScheduleClicked] = useState(false);

    // Recording 관련 상태 추가
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
    const [domain, setDomain] = useState<string>(''); // 도메인 상태

    const { data: projectInfo } = useQuery(
        ['projectInfo', projectId],
        () => {
            return getProjectInfo(projectId || '');
        },
        {
            enabled: !!projectId,
            onError: (error) => {
                console.error(
                    '프로젝트 정보를 불러오는 데 실패했습니다:',
                    error,
                );
            },
        },
    );

    const projectName = projectInfo?.projectName || 'Unknown Project'; // 안전한 접근
    const members = projectInfo?.members || []; // 안전한 접근

    useEffect(() => {
        const fetchMeetingData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/schedule/${projectId}`,
                );
                setMeetingData(
                    response.data.meetings.sort(
                        (a: MeetingData, b: MeetingData) => {
                            return (
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                            );
                        },
                    ),
                );
                // 도메인 설정 (예시: 첫 번째 미팅의 도메인)
                if (response.data.meetings.length > 0) {
                    setDomain(
                        response.data.meetings[0].domain || 'defaultDomain',
                    );
                }
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
                        (a: ScheduleData, b: ScheduleData) => {
                            return (
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                            );
                        },
                    ),
                );
            } catch (error) {
                console.error('Failed to fetch schedules:', error);
            }
        };

        // 초기 데이터 로드
        fetchMeetingData();
        fetchSchedules();

        // 주기적으로 데이터를 다시 가져오기 (5초 간격)
        const intervalId = setInterval(() => {
            // fetchMeetingData();
            // fetchSchedules();
        }, 5000);

        // 컴포넌트 언마운트 시 interval 제거
        return () => {
            clearInterval(intervalId);
        };
    }, [projectId]);

    const handleOpenModal = (
        type: ModalType,
        meeting?: MeetingData,
        schedule?: ScheduleData,
    ) => {
        setModalType(type);
        if (meeting) {
            setSelectedMeeting(meeting);
        }
        if (schedule) {
            setSelectedSchedule(schedule);
        }
    };

    const handleCloseModal = () => {
        setModalType(null);
        setSelectedMeeting(null);
        setSelectedSchedule(null); // 추가
    };

    // 녹음이 중지되었을 때 Blob을 저장하고 RecordingStopModal을 표시
    const handleRecordingStop = (blob: Blob | null) => {
        if (blob) {
            setRecordedBlob(blob);
            setModalType('recordingStop');
        } else {
            alert('녹음이 실패했습니다.');
        }
    };

    const onClickEventFile = (event: MeetingData | ScheduleData) => {
        if (activeTab === 'meeting') {
            const meeting = event as MeetingData;
            if (meeting.isEnded) {
                handleOpenModal('endedMeeting', meeting);
            } else {
                handleOpenModal('meetJoin', meeting);
            }
        } else if (activeTab === 'schedule') {
            const schedule = event as ScheduleData;
            setScheduleClicked(true);
            handleOpenModal('when2meet', undefined, schedule); // 모달 타입 'when2meet' 추가
        }
    };

    const addSchedule = (newSchedule: ScheduleData) => {
        if (newSchedule && newSchedule.scheduleId && newSchedule.scheduleName) {
            setScheduleData((prev) => {
                return [newSchedule, ...prev].sort((a, b) => {
                    return (
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    );
                });
            });
        } else {
            console.error('Invalid schedule data:', newSchedule);
        }
    };

    const eventData = activeTab === 'meeting' ? meetingData : scheduleData;

    return (
        <Layout>
            <Container>
                {/* 왼쪽 컨텐츠 영역 */}
                <LeftContentArea>
                    <TitleTab type="project" title={`${projectName}`} />
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
                                onClick={() => {
                                    return handleOpenModal('memberInfo');
                                }}
                            />
                        </MemberTabArea>
                        <MemberTable data={members} />
                        <MemberAddArea>
                            <MemberAddButton
                                onClick={() => {
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
                                <ButtonContainer>
                                    <ActionButton
                                        icon={AddIcon}
                                        label="회의 생성"
                                        onClick={() => {
                                            return handleOpenModal(
                                                'meetCreate',
                                            );
                                        }}
                                    />
                                </ButtonContainer>
                            )}
                            {eventData.map((event) => {
                                if ('meetingId' in event) {
                                    return (
                                        <EventFile
                                            key={event.meetingId}
                                            meetingName={event.name}
                                            dateTime={event.startDate}
                                            onClick={() => {
                                                return onClickEventFile(event);
                                            }}
                                        />
                                    );
                                }
                                if ('scheduleId' in event) {
                                    return (
                                        <EventFile
                                            key={event.scheduleId}
                                            meetingName={event.scheduleName}
                                            dateTime={event.startDate}
                                            onClick={() => {
                                                return onClickEventFile(event);
                                            }}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </ContentFileArea>
                    </ContentTabArea>
                </LeftContentArea>
                {/* 오른쪽 컨텐츠 영역 */}
                <RightContentArea>
                    {scheduleClicked &&
                    modalType === 'when2meet' &&
                    selectedSchedule ? (
                        <When2meet
                            projectID={projectId || ''}
                            scheduleID={selectedSchedule.scheduleId}
                            startDate={selectedSchedule.startDate}
                            endDate={selectedSchedule.endDate}
                            startTime={selectedSchedule.startTime}
                            endTime={selectedSchedule.endTime}
                            onCancel={(): void => {
                                return setScheduleClicked(false);
                            }}
                        />
                    ) : (
                        <ProjectCalendar
                            projectId={projectId || ''}
                            addSchedule={addSchedule}
                        />
                    )}
                </RightContentArea>
            </Container>
            {/* 모달 렌더링 */}
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
                    onRecordingStop={handleRecordingStop} // 필수 prop 추가
                />
            )}
            {modalType === 'recordingStop' &&
                selectedMeeting &&
                recordedBlob && (
                    <RecordingStopModal
                        meeting={{
                            id: selectedMeeting.meetingId,
                            meetingName: selectedMeeting.name,
                            dateTime: selectedMeeting.startDate,
                            url: selectedMeeting.url,
                        }}
                        domain={domain} // 도메인 전달
                        recordingBlob={recordedBlob} // Blob 전달
                        onConfirm={handleCloseModal}
                    />
                )}
            {modalType === 'endedMeeting' && selectedMeeting && (
                <EndedMeetingModal
                    meeting={{
                        id: selectedMeeting.meetingId,
                        meetingName: selectedMeeting.name,
                        dateTime: selectedMeeting.startDate,
                        url: selectedMeeting.url,
                    }}
                    onConfirm={handleCloseModal}
                />
            )}
        </Layout>
    );
};

export default ProjectDetailPage;
