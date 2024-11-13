import React, { useState, useEffect } from 'react';
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
import AudioRecorder from "@components/modal/meet/AudioRecorder";
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
    onRecordingStop: () => void; // 추가: 녹음 종료 시 호출될 콜백
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

// -- 컴포넌트 --
const MeetJoinModal: React.FC<MeetJoinModalProps> = ({
                                                         meetingId,
                                                         onCancel,
                                                         onRecordingStop, // 추가
                                                     }) => {
    const [meeting, setMeeting] = useState<MeetDetailProps | null>(null);
    const [sendAlert, setSendAlert] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false); // 추가: 녹음 상태

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const response = await axiosInstance.get(`/api/meeting/detail/${meetingId}`);
                setMeeting(response.data);
            } catch (error) {
                console.error('회의 정보를 가져오는데 실패했습니다:', error);
            }
        };

        fetchMeeting();
    }, [meetingId]);

    const onClickJoinButton = (): void => {
        if (meeting && meeting.url) {
            window.open(meeting.url, '_blank');

            if (sendAlert) {
                // 녹음 시작
                setIsRecording(true);
            } else {
                // 녹음하지 않을 경우 모달 닫기
                onCancel();
            }
        } else {
            alert('회의 URL을 가져올 수 없습니다.');
        }
    };

    const onClickStopButton = (): void => {
        // 녹음 종료
        setIsRecording(false);
        // 모달 닫기
        onCancel();
        // RecordingStopModal 표시를 위해 콜백 호출
        onRecordingStop();
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
                            <ModalButton text="닫기" color="gray" onClick={onCancel} />
                        </ButtonArea>
                    </>
                ) : (
                    <>
                        <SubContentArea>
                            <RadioInput
                                label="회의를 녹화 하시겠습니까?"
                                name="sendAlert"
                                checked={sendAlert}
                                onChange={() => setSendAlert(!sendAlert)}
                            />
                            <Alert>
                                녹화 옵션을 선택하지 않을 시, 회의 요약 및 정리 기능을 이용하실 수 없습니다.
                            </Alert>
                            <UrlArea onClick={onCopyUrl}>
                                <SvgImage src={UrlClipIcon} alt="URL Clip Icon" />
                                <UrlText>{meeting.url}</UrlText>
                            </UrlArea>
                        </SubContentArea>
                        <ButtonArea>
                            <ModalButton text="취소" color="gray" onClick={onCancel} />
                            {!isRecording ? (
                                <ModalButton
                                    text="참여"
                                    color="blue"
                                    onClick={onClickJoinButton}
                                />
                            ) : (
                                <ModalButton
                                    text="종료"
                                    color="red"
                                    onClick={onClickStopButton}
                                />
                            )}
                        </ButtonArea>
                    </>
                )}
                {isRecording && <AudioRecorder isRecording={isRecording} />} {/* 녹음 컴포넌트 */}
            </Container>
        </Backdrop>
    );
};

export default MeetJoinModal;
