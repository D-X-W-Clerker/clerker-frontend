import React, { useState } from 'react';
import styled from 'styled-components';
import {
    LargeModalTitleTab,
    ProjectInput,
    ModalButton,
    RadioInput,
} from '@components';
import {
    CenterRow,
    FlexCol,
    ItemsCenterSpaceRow,
    ItemsCenterEndRow,
} from '@styles';
import DownArrowIcon from '../../../assets/action/arrow/DownArrowIcon.svg';

interface ScheduleCreateModalProps {
    projectId: string;
    onCancel: () => void;
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

const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    label: `${i}시`,
    value: i.toString().padStart(2, '0'),
}));

const minuteOptions = [
    { label: '00분', value: '00' },
    { label: '30분', value: '30' },
];

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

const LabelText = styled.span`
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: inherit;
    color: #666;
`;

const ScheduleCreateModal: React.FC<ScheduleCreateModalProps> = ({
    projectId,
    onCancel,
}) => {
    const [title, setTitle] = useState<string>('');
    const [startHour, setStartHour] = useState<string>('');
    const [startMinute, setStartMinute] = useState<string>('00');
    const [endHour, setEndHour] = useState<string>('');
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

    const formatDateTime = (): string => {
        return `${startHour}:${startMinute} ~ ${endHour}:${endMinute}`;
    };

    const onClickCreateButton = (): void => {
        const scheduleData = {
            title,
            dateTime: formatDateTime(),
            isNotify: sendAlert,
        };
        console.log('Schedule data:', scheduleData);
        alert('일정이 생성되었습니다!');
        onCancel();
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
                                <option value="" disabled>
                                    시
                                </option>
                                {hourOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </StyledSelect>
                            <ArrowIcon src={DownArrowIcon} />
                        </StyledSelectWrapper>
                        <StyledSelectWrapper>
                            <StyledSelect
                                value={startMinute}
                                onChange={handleStartMinuteChange}
                            >
                                <option value="" disabled>
                                    분
                                </option>
                                {minuteOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </StyledSelect>
                            <ArrowIcon src={DownArrowIcon} />
                        </StyledSelectWrapper>
                        <span>~</span>
                        <StyledSelectWrapper>
                            <StyledSelect
                                value={endHour}
                                onChange={handleEndHourChange}
                            >
                                <option value="" disabled>
                                    시
                                </option>
                                {hourOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </StyledSelect>
                            <ArrowIcon src={DownArrowIcon} />
                        </StyledSelectWrapper>
                        <StyledSelectWrapper>
                            <StyledSelect
                                value={endMinute}
                                onChange={handleEndMinuteChange}
                            >
                                <option value="" disabled>
                                    분
                                </option>
                                {minuteOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </StyledSelect>
                            <ArrowIcon src={DownArrowIcon} />
                        </StyledSelectWrapper>
                    </DateInputArea>
                    <RadioInput
                        label="멤버들에게 일정 생성 알림을 보낼까요?"
                        name="sendAlert"
                        checked={sendAlert}
                        onChange={() => setSendAlert(!sendAlert)}
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
