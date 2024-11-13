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

// -- Axios Instance 설정 --
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

// -- 인터페이스 --
interface MeetJoinModalProps {
    meetingId: string;
    onCancel: () => void;
    onRecordingStop: () => void;
}

interface MeetDetailProps {
    id: string;
    name: string;
    url: string;
    startDate: string;
    isEnded: boolean;
    createdAt: string;
}

// -- 스타일 컴포넌트 --
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
    height: 300px;
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

const EndedMessage = styled.div`
    font-size: 16px;
    color: var(--color-gray-600);
    text-align: center;
    margin-top: 20px;
`;

const StopRecordingButton = styled(ModalButton)`
    background-color: #ff4d4f !important; // 빨간색으로 직접 지정
    color: #fff !important; // 글자색을 흰색으로 지정
    &:hover {
        background-color: #ff7875 !important; // 호버 시 색상 변경
    }
`;

// -- 컴포넌트 --
const MeetJoinModal: React.FC<MeetJoinModalProps> = ({
                                                         meetingId,
                                                         onCancel,
                                                         onRecordingStop,
                                                     }) => {
    const [meeting, setMeeting] = useState<MeetDetailProps | null>(null);
    const [sendAlert, setSendAlert] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/meeting/detail/${meetingId}`,
                );
                setMeeting(response.data);
            } catch (error) {
                console.error('회의 정보를 가져오는데 실패했습니다:', error);
            }
        };

        fetchMeeting();
    }, [meetingId]);

    const startRecording = async () => {
        try {
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });

            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            const combinedStream = mergeAudioStreams(displayStream, audioStream);

            const mediaRecorder = new MediaRecorder(combinedStream, {
                mimeType: 'audio/webm;codecs=opus',
            });

            mediaRecorder.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                // 녹음된 오디오를 처리합니다.
                chunksRef.current = [];
                console.log('Recording stopped');

                // 녹음 종료 시 호출
                onRecordingStop();
            };

            mediaRecorder.start();
            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
            console.log('Recording started');
        } catch (error) {
            console.error('Error starting recording:', error);
            // 녹음 시작 실패 시 alert 제거
        }
    };

    const stopRecording = () => {
        const mediaRecorder = mediaRecorderRef.current;
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            const tracks = mediaRecorder.stream.getTracks();
            tracks.forEach((track: MediaStreamTrack) => track.stop());
            mediaRecorderRef.current = null;
            setIsRecording(false);
        }
    };

    const mergeAudioStreams = (
        systemStream: MediaStream,
        micStream: MediaStream,
    ): MediaStream => {
        const context = new AudioContext();
        const destination = context.createMediaStreamDestination();

        const systemSource = context.createMediaStreamSource(systemStream);
        const micSource = context.createMediaStreamSource(micStream);

        systemSource.connect(destination);
        micSource.connect(destination);

        return destination.stream;
    };

    const onClickJoinButton = async (): Promise<void> => {
        if (meeting && meeting.url) {
            if (sendAlert) {
                // 녹음 시작
                await startRecording();
            }
            window.open(meeting.url, '_blank');
        } else {
            alert('회의 URL을 가져올 수 없습니다.');
        }
    };

    const onClickStopButton = (): void => {
        // 녹음 종료 트리거
        stopRecording();
    };

    const onCopyUrl = (): void => {
        if (meeting && meeting.url) {
            navigator.clipboard.writeText(meeting.url);
            alert('URL이 클립보드에 복사되었습니다!');
        }
    };

    if (!meeting) {
        return null; // 로딩 중일 때는 아무것도 표시하지 않음
    }

    const dateFields = SplitDateTime(meeting.startDate);

    return (
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
                {meeting.isEnded ? (
                    <>
                        <EndedMessage>회의가 종료되었습니다.</EndedMessage>
                        <ButtonArea>
                            <ModalButton
                                text="닫기"
                                color="gray"
                                onClick={onCancel}
                            />
                        </ButtonArea>
                    </>
                ) : (
                    <>
                        <SubContentArea>
                            {!isRecording && (
                                <>
                                    <RadioInput
                                        label="회의를 녹화 하시겠습니까?"
                                        name="sendAlert"
                                        checked={sendAlert}
                                        onChange={() =>
                                            setSendAlert(!sendAlert)
                                        }
                                    />
                                    <Alert>
                                        녹화 옵션을 선택하지 않을 시, 회의 요약 및
                                        정리 기능을 이용하실 수 없습니다.
                                    </Alert>
                                </>
                            )}
                            <UrlArea onClick={onCopyUrl}>
                                <SvgImage
                                    src={UrlClipIcon}
                                    alt="URL Clip Icon"
                                />
                                <UrlText>{meeting.url}</UrlText>
                            </UrlArea>
                        </SubContentArea>
                        <ButtonArea>
                            {!isRecording ? (
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
                                <StopRecordingButton
                                    text="녹음 종료"
                                    color="red"
                                    onClick={onClickStopButton}
                                />
                            )}
                        </ButtonArea>
                    </>
                )}
            </Container>
        </Backdrop>
    );
};

export default MeetJoinModal;
