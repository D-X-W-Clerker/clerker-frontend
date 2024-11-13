// RecordingStopModal.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
    LargeModalTitleTab,
    ProjectInput,
    DateInput,
    ModalButton,
} from '@components';
import {
    CenterRow,
    FlexCol,
    ItemsCenterSpaceRow,
    ItemsCenterEndRow,
} from '@styles';
import { SplitDateTime } from '@utils';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// Axios 인터셉터 설정
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

interface RecordingStopModalProps {
    meeting: {
        id: string;
        meetingName: string;
        dateTime: string;
        url?: string;
    };
    domain: string; // 도메인 prop
    recordingBlob: Blob; // Blob prop
    onConfirm: () => void;
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
    padding-left: 10px;
    gap: 5px;
`;

const ButtonArea = styled(ItemsCenterEndRow)`
    gap: 10px;
`;

const SubText = styled.div`
    font-size: 14px;
    color: var(--color-gray-600);
`;

const List = styled.ul`
    margin: 0;
    padding-left: 15px;
    list-style-type: disc;
`;

const ListItem = styled.li`
    font-size: 12px;
    color: var(--color-gray-600);
    margin-bottom: 2px;
`;

// 메시지 목록
const infoMessages = [
    { id: 1, text: '프로젝트 하위 문서에서 요약본을 확인하실 수 있습니다.' },
    { id: 2, text: '요약 및 정리에는 3분 정도의 시간이 소요됩니다.' },
    { id: 3, text: '완료되면 알람을 보내드리고 있습니다.' },
];

// 컴포넌트
const RecordingStopModal: React.FC<RecordingStopModalProps> = ({
    meeting,
    domain,
    recordingBlob,
    onConfirm,
}) => {
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const dateFields = SplitDateTime(meeting.dateTime);

    useEffect(() => {
        const uploadAndDownloadRecording = async () => {
            if (!recordingBlob || recordingBlob.size === 0) {
                alert('유효한 녹음 데이터가 없습니다.');
                return;
            }

            // WebM 파일 자동 다운로드
            const downloadBlob = () => {
                const url = URL.createObjectURL(recordingBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'recording.webm';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            };

            // 다운로드 트리거
            downloadBlob();

            setIsUploading(true);
            try {
                const formData = new FormData();
                formData.append('domain', domain);
                formData.append('webmFile', recordingBlob, 'recording.webm'); // 필드 이름 'webmFile'로 유지

                // 디버깅을 위해 FormData 내용 확인
                formData.forEach((value, key) => {
                    if (key === 'webmFile' && value instanceof Blob) {
                        console.log(
                            `${key}: Blob, size=${value.size}, type=${value.type}`,
                        );
                    } else {
                        console.log(`${key}:`, value);
                    }
                });

                // 서버로 전송 (Content-Type 헤더 제거)
                const response = await axiosInstance.post(
                    `/api/model/send?meetingId=${meeting.id}`,
                    formData,
                );

                console.log('파일 전송 성공:', response.data);
                alert('파일이 성공적으로 전송되었습니다.');
            } catch (error) {
                console.error('파일 전송 실패:', error);
                if (axios.isAxiosError(error) && error.response) {
                    console.error('서버 응답:', error.response.data);
                    alert(
                        `파일 전송에 실패했습니다: ${error.response.data.message || '알 수 없는 오류'}`,
                    );
                } else {
                    alert('파일 전송에 실패했습니다. 다시 시도해주세요.');
                }
            } finally {
                setIsUploading(false);
                onConfirm(); // 모달 닫기
            }
        };

        uploadAndDownloadRecording();
    }, [domain, recordingBlob, onConfirm, meeting.id]);

    return (
        <Backdrop>
            <Container>
                <LargeModalTitleTab type="project" title="회의 녹화 종료" />
                <ContentArea>
                    <ProjectInput
                        type="text"
                        value={meeting.meetingName}
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
                    <SubText>회의가 종료 되었습니다.</SubText>
                    <List>
                        {infoMessages.map((message) => (
                            <ListItem key={message.id}>{message.text}</ListItem>
                        ))}
                    </List>
                </SubContentArea>
                <ButtonArea>
                    <ModalButton
                        text={isUploading ? '업로드 중...' : '확인'}
                        color="blue"
                        onClick={onConfirm}
                        disabled={isUploading}
                    />
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default RecordingStopModal;
