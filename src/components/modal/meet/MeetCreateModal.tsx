import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
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
    ItemsCenterSpaceRow,
    ItemsCenterStartRow,
    ItemsCenterEndRow,
    SpaceBetweenCol,
} from '@styles';
import { FormatModalDateTime } from '@utils';

// -- Axios Instance 설정 --
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
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
});

// -- 인터페이스 --
interface MeetCreateModalProps {
    projectId: string;
    onCancel: () => void;
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

const Container = styled(SpaceBetweenCol)`
    width: 100%;
    max-width: 520px;
    height: 300px;
    box-sizing: border-box;
    padding: 20px;
    background-color: var(--background-color);
    border-radius: 10px;
`;

const ContentArea = styled(FlexCol)`
    gap: 20px;
`;

const ProjectInfoArea = styled(FlexCol)`
    gap: 10px;
`;

const DateInputArea = styled(ItemsCenterSpaceRow)`
    padding-left: 40px;
    gap: 10px;
`;

const DomainArea = styled(ItemsCenterStartRow)`
    position: relative;
    width: fit-content;
`;

const DomainSelect = styled.select`
    position: relative;
    width: 150px;
    padding: 8px;
    background-color: var(--color-gray-50);
    color: var(--color-gray-600);
    border-radius: 4px;
    border: none;
    outline: none;
    appearance: none;
    text-align: left;
    cursor: pointer;
`;

const DropdownArrow = styled.div`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 12px;
    color: var(--color-gray-600);
    z-index: 1;
`;

const ButtonArea = styled(ItemsCenterEndRow)`
    gap: 10px;
`;

const dateFields = [
    { label: '년', placeholder: 'yyyy', value: 'year' },
    { label: '월', placeholder: 'mm', value: 'month' },
    { label: '일', placeholder: 'dd', value: 'day' },
    { label: '시', placeholder: 'hh', value: 'hour' },
    { label: '분', placeholder: 'mm', value: 'minute' },
];

const domains = ['IT', '경제', '금융', '의료', '기획'];

const MeetCreateModal: React.FC<MeetCreateModalProps> = ({
    projectId,
    onCancel,
}) => {
    const [name, setName] = useState<string>('');
    const [domain, setDomain] = useState<string>('');
    const [dateTime, setDateTime] = useState({
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
    });
    const [sendAlert, setSendAlert] = useState<boolean>(false);

    const onChangeInput = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setName(event.target.value);
    };

    const onChangeDate = (field: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setDateTime({
                ...dateTime,
                [field]: event.target.value,
            });
        };
    };

    const onClickCreateButton = async (): Promise<void> => {
        const meetingData = {
            name,
            startDateTime: FormatModalDateTime(dateTime),
            domain,
            isNotify: sendAlert,
        };

        console.log('보낼 데이터:', meetingData);

        // startDateTime 형식 검증
        if (
            !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(
                meetingData.startDateTime,
            )
        ) {
            alert(
                '날짜 및 시간 형식이 올바르지 않습니다. (예: YYYY-MM-DDTHH:mm:ss)',
            );
            return;
        }

        try {
            const response = await axiosInstance.post(
                `/api/meeting/create/${projectId}`,
                meetingData,
            );

            console.log('Meeting created successfully:', response.data);

            if (response.status === 200 || response.status === 201) {
                alert('회의가 성공적으로 생성되었습니다.');
                onCancel();
            } else {
                console.error(
                    '서버 응답에서 문제가 발생했습니다.',
                    response.data,
                );
                alert('회의 생성 중 오류가 발생했습니다.');
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('회의 생성 요청 실패:', error);

            if (error.response) {
                console.error('서버 오류 메시지:', error.response.data);
                alert(
                    `회의 생성에 실패했습니다: ${error.response.data.message || '서버 오류'}`,
                );
            } else {
                alert('회의 생성에 실패했습니다.');
            }
        }
    };

    const buttons = [
        {
            text: '취소',
            color: 'gray',
            onClick: onCancel,
            key: 'cancel-button',
        },
        {
            text: '생성',
            color: 'blue',
            onClick: onClickCreateButton,
            key: 'create-button',
        },
    ];

    return (
        <Backdrop>
            <Container>
                <ContentArea>
                    <LargeModalTitleTab type="project" title="회의 생성" />
                    <ProjectInfoArea>
                        <ProjectInput
                            type="text"
                            value={name}
                            onChange={onChangeInput}
                            placeholder="회의 이름을 입력하세요."
                        />
                        <DateInputArea>
                            {dateFields.map((field) => {
                                return (
                                    <DateInput
                                        key={field.value}
                                        label={field.label}
                                        value={
                                            dateTime[
                                                field.value as keyof typeof dateTime
                                            ]
                                        }
                                        onChange={onChangeDate(field.value)}
                                        placeholder={field.placeholder}
                                    />
                                );
                            })}
                        </DateInputArea>
                    </ProjectInfoArea>
                    <RadioInput
                        label="멤버들에게 회의 생성 알림을 보낼까요?"
                        name="sendAlert"
                        checked={sendAlert}
                        onChange={() => {
                            return setSendAlert(!sendAlert);
                        }}
                    />
                    <DomainArea>
                        <DomainSelect
                            value={domain}
                            onChange={(event) => {
                                return setDomain(event.target.value);
                            }}
                        >
                            <option value="">도메인 선택</option>
                            {domains.map((option) => {
                                return (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                );
                            })}
                        </DomainSelect>
                        <DropdownArrow>▼</DropdownArrow>
                    </DomainArea>
                </ContentArea>
                <ButtonArea>
                    {buttons.map((button) => {
                        return (
                            <ModalButton
                                key={button.key}
                                text={button.text}
                                color={button.color}
                                onClick={button.onClick}
                            />
                        );
                    })}
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default MeetCreateModal;
