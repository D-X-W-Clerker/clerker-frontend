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
    ProjectCalendar,
} from '@components';
import { projectInfo, dummyMeetingData, dummyScheduleData } from '@data';
import { FlexCol, FlexRow, ItemsCenterRow, ItemsCenterStartRow } from '@styles';
import axios from 'axios';
import { useAuthStore } from '@store';
import Layout from '@layout';
import { getProjectInfo } from '@api';

// Axios Instance 설정
// const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
//     withCredentials: true, // 인증 정보 포함
// });
//
// // Axios 인터셉터 설정
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = document.cookie
//             .split('; ')
//             .find((row) => {
//                 return row.startsWith('token=');
//             })
//             ?.split('=')[1];
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

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

// 레이아웃 스타일
const Container = styled(FlexRow)`
    width: 100%;
    max-width: 1100px;
`;

const ContentArea = styled(FlexCol)`
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

const LeftContentArea = styled(ContentArea)`
    width: 50%;
`;

const RightContentArea = styled(ContentArea)`
    width: 50%;
`;

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

const ContentTabArea = styled(FlexCol)``;

const ContentFileArea = styled(FlexCol)`
    gap: 4px;
`;

// 컴포넌트 스타일
const IconImage = styled.img<{ $width: number; $height: number }>`
    width: ${(props) => {
        return props.$width;
    }}px;
    height: ${(props) => {
        return props.$height;
    }}px;
    cursor: pointer;
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

// 프로젝트 상세 페이지 컴포넌트
const ProjectDetailPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [activeTab, setActiveTab] = useState<'meeting' | 'schedule'>(
        'meeting',
    );
    const [meetingData, setMeetingData] =
        useState<MeetingData[]>(dummyMeetingData); // 리팩토링 위해 더미데이터 초기값으로 설정
    const [scheduleData, setScheduleData] =
        useState<ScheduleData[]>(dummyScheduleData); // 리팩토링 위해 더미데이터 초기값으로 설정
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingData | null>(
        null,
    );
    const [selectedSchedule, setSelectedSchedule] =
        useState<ScheduleData | null>(null);
    const [modalType, setModalType] = useState<ModalType>(null); // 모달 타입 상태
    const [scheduleClicked, setScheduleClicked] = useState(false); // when2meet 열람 유무 상태
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null); // 화면 녹화 관련 상태
    const [domain, setDomain] = useState<string>(''); // 도메인 상태

    // const { data: projectInfo } = useQuery(
    //     ['projectInfo', projectId],
    //     () => {
    //         return getProjectInfo(projectId || '');
    //     },
    //     {
    //         enabled: !!projectId,
    //         onError: (error) => {
    //             console.error(
    //                 '프로젝트 정보를 불러오는 데 실패했습니다:',
    //                 error,
    //             );
    //         },
    //     },
    // );

    const projectName = projectInfo?.projectName || 'Unknown Project'; // 안전한 접근
    const members = projectInfo?.members || []; // 안전한 접근
    const eventData = activeTab === 'meeting' ? meetingData : scheduleData; // 파일 데이터

    // 현재 로그인 중인 사용자 정보
    const { user } = useAuthStore.getState();
    const currentUser = members.find((member) => {
        return member.email === user?.email;
    }) || {
        organizationId: '',
        username: 'Unknown User',
        email: 'unknown@example.com',
        type: null,
        role: '',
    };

    // useEffect(() => {
    //     const fetchMeetingData = async () => {
    //         try {
    //             const response = await axiosInstance.get(
    //                 `/api/schedule/${projectId}`,
    //             );
    //             setMeetingData(
    //                 response.data.meetings.sort(
    //                     (a: MeetingData, b: MeetingData) => {
    //                         return (
    //                             new Date(b.createdAt).getTime() -
    //                             new Date(a.createdAt).getTime()
    //                         );
    //                     },
    //                 ),
    //             );
    //             // 도메인 설정 (예시: 첫 번째 미팅의 도메인)
    //             if (response.data.meetings.length > 0) {
    //                 setDomain(
    //                     response.data.meetings[0].domain || 'defaultDomain',
    //                 );
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch meeting data:', error);
    //         }
    //     };
    //
    //     const fetchSchedules = async () => {
    //         try {
    //             const response = await axiosInstance.get(
    //                 `/api/schedule/${projectId}`,
    //             );
    //             setScheduleData(
    //                 response.data.schedules.sort(
    //                     (a: ScheduleData, b: ScheduleData) => {
    //                         return (
    //                             new Date(b.createdAt).getTime() -
    //                             new Date(a.createdAt).getTime()
    //                         );
    //                     },
    //                 ),
    //             );
    //         } catch (error) {
    //             console.error('Failed to fetch schedules:', error);
    //         }
    //     };
    //
    //     // 초기 데이터 로드
    //     fetchMeetingData();
    //     fetchSchedules();
    //
    //     // 주기적으로 데이터를 다시 가져오기 (5초 간격)
    //     const intervalId = setInterval(() => {
    //         // fetchMeetingData();
    //         // fetchSchedules();
    //     }, 100);
    //
    //     // 컴포넌트 언마운트 시 interval 제거
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [projectId]);

    // 모달 열기 함수
    const onClickOpenModal = (
        type: ModalType,
        event?: MeetingData | ScheduleData,
    ) => {
        setModalType(type);
        if (!event) return;
        if ('meetingId' in event) {
            setSelectedMeeting(event as MeetingData);
        } else if ('scheduleId' in event) {
            setSelectedSchedule(event as ScheduleData);
        }
    };

    // 모달 닫기 함수
    const onClickCloseModal = () => {
        setModalType(null);
        setSelectedMeeting(null);
        setSelectedSchedule(null);
    };

    // 녹음 중지 함수 (녹음이 중지되었을 때 Blob을 저장하고 RecordingStopModal을 표시)
    const onClickRecordingStop = (blob: Blob | null) => {
        if (blob) {
            setRecordedBlob(blob);
            setModalType('recordingStop');
        } else {
            alert('녹음이 실패했습니다.');
        }
    };

    // 이벤트 파일 클릭 함수
    const onClickEventFile = (event: MeetingData | ScheduleData) => {
        if (activeTab === 'meeting') {
            const meeting = event as MeetingData;
            const type = meeting.isEnded ? 'endedMeeting' : 'meetJoin';
            onClickOpenModal(type, meeting);
        } else if (activeTab === 'schedule') {
            const schedule = event as ScheduleData;
            setScheduleClicked(true);
            onClickOpenModal('when2meet', schedule); // 모달 타입 'when2meet' 추가
        }
    };

    // 이벤트 파일 렌더링 함수
    const renderEventFile = (event: MeetingData | ScheduleData) => {
        const isMeeting = 'meetingId' in event;
        return (
            <EventFile
                key={isMeeting ? event.meetingId : event.scheduleId}
                meetingName={isMeeting ? event.name : event.scheduleName}
                dateTime={event.startDate}
                onClick={() => {
                    return onClickEventFile(event);
                }}
            />
        );
    };

    // 회의 일정 파일 생성 함수
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
                                    return onClickOpenModal('memberInfo');
                                }}
                            />
                        </MemberTabArea>
                        <MemberTable data={members} />
                        <MemberAddArea>
                            <MemberAddButton
                                onClick={() => {
                                    return onClickOpenModal('memberAdd');
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
                                    onClick={() => {
                                        return onClickOpenModal('meetCreate');
                                    }}
                                />
                            )}
                            {eventData.map(renderEventFile)}
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
                            userInfo={currentUser}
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
                    projectName={projectName || ''}
                    onCancel={onClickCloseModal}
                />
            )}
            {modalType === 'memberInfo' && (
                <MemberInfoModal
                    projectId={projectId || ''}
                    projectName={projectName || ''}
                    memberData={members}
                    onCancel={onClickCloseModal}
                />
            )}
            {modalType === 'meetCreate' && (
                <MeetCreateModal
                    projectId={projectId || ''}
                    onCancel={onClickCloseModal}
                />
            )}
            {modalType === 'meetJoin' && selectedMeeting && (
                <MeetJoinModal
                    meetingId={selectedMeeting.meetingId}
                    onCancel={onClickCloseModal}
                    onRecordingStop={onClickRecordingStop} // 필수 prop 추가
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
                        onConfirm={onClickCloseModal}
                    />
                )}
        </Layout>
    );
};

export default ProjectDetailPage;
