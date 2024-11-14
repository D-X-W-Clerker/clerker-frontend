import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
    LargeModalTitleTab,
    ProjectInput,
    ModalButton,
    RadioInput,
} from '@components';
import { CenterRow, FlexCol, ItemsCenterSpaceRow } from '@styles';
import DownArrowIcon from '../../../assets/action/arrow/DownArrowIcon.svg';

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

interface ScheduleCreateModalProps {
    projectId: string;
    onCancel: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCreate: (newSchedule: any) => void;
    startDate: Date;
    endDate: Date;
}

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
    position: relative;
`;

const ContentArea = styled(FlexCol)`
    gap: 10px;
`;

const DateInputArea = styled(ItemsCenterSpaceRow)`
    padding-left: 40px;
    gap: 10px;
`;

const ButtonArea = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
`;

const StyledSelectWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const StyledSelect = styled.select`
    border: none;
    background-color: #ececec;
    font-size: inherit;
    padding: 5px 10px 5px 0;
    width: 100%;
    border-radius: 4px;
    text-align: right;
    appearance: none;
    padding-right: 24px;

    &:focus {
        outline: none;
    }
`;

const ArrowIcon = styled.img`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    width: 12px;
    height: 12px;
`;

const hourOptions = Array.from({ length: 24 }, (_, i) => {
    return {
        label: `${i}시`,
        value: i.toString().padStart(2, '0'),
    };
});

const minuteOptions = [
    { label: '00분', value: '00' },
    { label: '30분', value: '30' },
];

const ScheduleCreateModal: React.FC<ScheduleCreateModalProps> = ({
    projectId,
    onCancel,
    onCreate,
    startDate,
    endDate,
}) => {
    const [title, setTitle] = useState<string>('');
    const [startHour, setStartHour] = useState<string>('09');
    const [startMinute, setStartMinute] = useState<string>('00');
    const [endHour, setEndHour] = useState<string>('10');
    const [endMinute, setEndMinute] = useState<string>('00');
    const [sendAlert, setSendAlert] = useState<boolean>(false);

    const onChangeInput = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setTitle(event.target.value);
    };

    const handleStartHourChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ): void => {
        setStartHour(e.target.value);
    };

    const handleStartMinuteChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ): void => {
        setStartMinute(e.target.value);
    };

    const handleEndHourChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ): void => {
        setEndHour(e.target.value);
    };

    const handleEndMinuteChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ): void => {
        setEndMinute(e.target.value);
    };

    const onClickCreateButton = async (): Promise<void> => {
        if (!title) {
            console.error('일정 제목을 입력해주세요.');
            return;
        }

        // 시간 데이터 구성 (시간:분:초 형식)
        const formattedStartTime = `${startHour}:${startMinute}:00`;
        const formattedEndTime = `${endHour}:${endMinute}:00`;

        const newScheduleData = {
            name: title,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            isNotify: sendAlert,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
        };

        console.log('Sending schedule data:', newScheduleData);

        try {
            const response = await axiosInstance.post(
                `/api/schedule/create/${projectId}`,
                newScheduleData,
            );

            // 성공적으로 생성된 경우
            onCreate(response.data);
            onCancel();
        } catch (error) {
            console.error('일정 생성 실패:', error);
        }
    };

    return (
        <Backdrop>
            <Container>
                <LargeModalTitleTab type="project" title="일정 생성" />
                <ContentArea>
                    <ProjectInput
                        type="text"
                        value={title}
                        onChange={onChangeInput}
                        placeholder="일정 제목을 입력하세요."
                    />
                    <DateInputArea>
                        <StyledSelectWrapper>
                            <StyledSelect
                                value={startHour}
                                onChange={handleStartHourChange}
                            >
                                {hourOptions.map((option) => {
                                    return (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    );
                                })}
                            </StyledSelect>
                            <ArrowIcon src={DownArrowIcon} />
                        </StyledSelectWrapper>
                        <StyledSelectWrapper>
                            <StyledSelect
                                value={startMinute}
                                onChange={handleStartMinuteChange}
                            >
                                {minuteOptions.map((option) => {
                                    return (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    );
                                })}
                            </StyledSelect>
                            <ArrowIcon src={DownArrowIcon} />
                        </StyledSelectWrapper>
                        <span>~</span>
                        <StyledSelectWrapper>
                            <StyledSelect
                                value={endHour}
                                onChange={handleEndHourChange}
                            >
                                {hourOptions.map((option) => {
                                    return (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    );
                                })}
                            </StyledSelect>
                            <ArrowIcon src={DownArrowIcon} />
                        </StyledSelectWrapper>
                        <StyledSelectWrapper>
                            <StyledSelect
                                value={endMinute}
                                onChange={handleEndMinuteChange}
                            >
                                {minuteOptions.map((option) => {
                                    return (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    );
                                })}
                            </StyledSelect>
                            <ArrowIcon src={DownArrowIcon} />
                        </StyledSelectWrapper>
                    </DateInputArea>
                    <RadioInput
                        label="멤버들에게 일정 생성 알림을 보낼까요?"
                        name="sendAlert"
                        checked={sendAlert}
                        onChange={() => {
                            return setSendAlert(!sendAlert);
                        }}
                    />
                </ContentArea>
                <ButtonArea>
                    <ModalButton text="취소" color="gray" onClick={onCancel} />
                    <ModalButton
                        text="생성"
                        color="blue"
                        onClick={onClickCreateButton}
                    />
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default ScheduleCreateModal;
