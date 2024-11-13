// MeetJoinModal.tsx

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { UrlClipIcon } from '@assets';
import {
    LargeModalTitleTab,
    ProjectInput,
    RadioInput,
    DateInput,
    ModalButton,
} from '@components';
import {
    CenterRow,
    FlexCol,
    ItemsCenterRow,
    ItemsCenterSpaceRow,
    ItemsCenterEndRow,
} from '@styles';
import { SplitDateTime } from '@utils';
import axios from 'axios';
import AudioRecorder, { AudioRecorderHandle } from './AudioRecorder';
import RecordingStopModal from './RecordingStopModal';
import EndedMeetingModal from './EndedMeetingModal';

// Axios Instance 설정
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 인터페이스
interface MeetJoinModalProps {
    meetingId: string;
    onCancel: () => void;
    onRecordingStop: (blob: Blob | null) => void; // Blob 전달
}

interface MeetDetailProps {
    id: number;
    name: string;
    url: string;
    startDate: string;
    isEnded: boolean;
    createdAt: string;
    domain: string;
}

// 스타일 컴포넌트
const Backdrop = styled(CenterRow)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 1000;
`;

const Container = styled(FlexCol)`
    width: 100%;
    max-width: 520px;
    min-height: 300px;
    box-sizing: border-box;
    gap: 20px;
    padding: 20px 20px;
    background-color: var(--background-color);
    border-radius: 10px;
`;

const ContentArea = styled(FlexCol)`
    gap: 10px;
`;

const DateInputArea = styled(ItemsCenterSpaceRow)`
    padding-left: 40px;
    gap: 10px;
`;

const SubContentArea = styled(FlexCol)`
    flex: 1;
    gap: 5px;
`;

const ButtonArea = styled(ItemsCenterEndRow)`
    gap: 10px;
`;

const UrlArea = styled(ItemsCenterRow)`
    gap: 10px;
    padding-left: 5px;
`;

const Alert = styled.div`
    font-size: 12px;
    color: var(--color-red);
    padding-left: 35px;
`;

const SvgImage = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const UrlText = styled.span`
    color: var(--color-blue-100);
    font-size: 14px;
    cursor: pointer;
`;

// 컴포넌트
const MeetJoinModal: React.FC<MeetJoinModalProps> = ({
    meetingId,
    onCancel,
    onRecordingStop,
}) => {
    const [meeting, setMeeting] = useState<MeetDetailProps | null>(null);
    const [sendAlert, setSendAlert] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isMeetingStarted, setIsMeetingStarted] = useState<boolean>(false);
    const [showRecordingStopModal, setShowRecordingStopModal] =
        useState<boolean>(false);

    // 추가된 상태: 녹음된 Blob과 도메인
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
    const [domain, setDomain] = useState<string>(''); // 도메인 초기화

    // ref 타입 수정: AudioRecorderHandle
    const audioRecorderRef = useRef<AudioRecorderHandle>(null);

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/meeting/detail/${meetingId}`,
                );
                console.log('Fetched Meeting Data:', response.data); // 데이터 출력
                setMeeting(response.data);
                setDomain(response.data.domain || 'defaultDomain'); // 실제 도메인 필드로 변경
            } catch (error) {
                console.error('회의 정보를 가져오는데 실패했습니다:', error);
                alert(
                    '회의 정보를 가져오는데 실패했습니다. 다시 시도해주세요.',
                );
            }
        };

        fetchMeeting();
    }, [meetingId]);

    const onClickJoinButton = async (): Promise<void> => {
        if (meeting && meeting.url) {
            if (sendAlert && audioRecorderRef.current) {
                audioRecorderRef.current.startRecording();
                setIsRecording(true);
            }
            window.open(meeting.url, '_blank');
            setIsMeetingStarted(true); // 회의 시작 상태로 변경
        } else {
            alert('회의 URL을 가져올 수 없습니다.');
        }
    };

    const onClickEndMeetingButton = (): void => {
        setIsMeetingStarted(false); // 회의 종료 상태로 변경
        if (isRecording && audioRecorderRef.current) {
            audioRecorderRef.current.stopRecording();
            setIsRecording(false);
        }
        // 녹음이 중지되면 handleRecordingStopped가 호출되어 onRecordingStop이 호출됩니다.
    };

    const onCopyUrl = (): void => {
        if (meeting && meeting.url) {
            navigator.clipboard.writeText(meeting.url);
            alert('URL이 클립보드에 복사되었습니다!');
        }
    };

    // 녹음이 중지되었을 때 Blob을 저장하고 RecordingStopModal을 표시
    const handleRecordingStopped = (blob: Blob | null) => {
        if (blob) {
            setRecordedBlob(blob);
            onRecordingStop(blob); // 부모 컴포넌트로 Blob 전달
        } else {
            alert('녹음이 실패했습니다.');
        }
    };

    if (!meeting) {
        return null; // 로딩 중일 때는 아무것도 표시하지 않음
    }

    if (meeting.isEnded) {
        return (
            <EndedMeetingModal
                meeting={{
                    id: meeting.id.toString(),
                    meetingName: meeting.name,
                    dateTime: meeting.startDate,
                    url: meeting.url,
                }}
                onConfirm={onCancel}
            />
        );
    }

    const dateFields = SplitDateTime(meeting.startDate);

    return (
        <>
            <AudioRecorder
                ref={audioRecorderRef}
                onRecordingStopped={handleRecordingStopped}
            />
            <Backdrop>
                <Container>
                    <LargeModalTitleTab type="project" title="회의 참여" />
                    <ContentArea>
                        <ProjectInput
                            type="text"
                            value={meeting.name}
                            isEditable={false}
                        />
                        <DateInputArea>
                            {dateFields.map((field) => (
                                <DateInput
                                    key={field.label}
                                    type="meet"
                                    label={field.label}
                                    value={field.value}
                                    isEditable={false}
                                />
                            ))}
                        </DateInputArea>
                    </ContentArea>
                    <SubContentArea>
                        {!isRecording && !isMeetingStarted && (
                            <>
                                <RadioInput
                                    label="회의를 녹화 하시겠습니까?"
                                    name="sendAlert"
                                    checked={sendAlert}
                                    onChange={() => setSendAlert(!sendAlert)}
                                />
                                <Alert>
                                    녹화 옵션을 선택하지 않을 시, 회의 요약 및
                                    정리 기능을 이용하실 수 없습니다.
                                </Alert>
                            </>
                        )}
                        <UrlArea onClick={onCopyUrl}>
                            <SvgImage src={UrlClipIcon} alt="URL Clip Icon" />
                            <UrlText>{meeting.url}</UrlText>
                        </UrlArea>
                    </SubContentArea>
                    <ButtonArea>
                        {!isMeetingStarted ? (
                            <>
                                <ModalButton
                                    text="취소"
                                    color="gray"
                                    onClick={onCancel}
                                />
                                <ModalButton
                                    text="참여"
                                    color="blue"
                                    onClick={onClickJoinButton}
                                />
                            </>
                        ) : (
                            <ModalButton
                                text="회의 종료"
                                color="red"
                                onClick={onClickEndMeetingButton}
                            />
                        )}
                    </ButtonArea>
                </Container>
            </Backdrop>
            {showRecordingStopModal && meeting && recordedBlob && (
                <RecordingStopModal
                    meeting={{
                        id: meeting.id.toString(),
                        meetingName: meeting.name,
                        dateTime: meeting.startDate,
                        url: meeting.url,
                    }}
                    domain={domain} // 도메인 전달
                    recordingBlob={recordedBlob} // Blob 전달
                    onConfirm={() => setShowRecordingStopModal(false)}
                />
            )}
        </>
    );
};

export default MeetJoinModal;
