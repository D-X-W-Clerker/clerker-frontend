import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
    ItemsCenterEndRow,
} from '@styles';

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

const DomainArea = styled.div`
    display: flex;
    justify-content: flex-start;
    width: fit-content;
    margin-top: 10px;
    position: relative;
`;

const DomainSelect = styled.select`
    padding: 8px;
    border: none;
    background-color: #ececec;
    border-radius: 4px;
    width: 200px;
    color: #333;
    outline: none;
    appearance: none;
    text-align: left;
    position: relative;
    z-index: 1;
`;

const DropdownArrow = styled.div`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 12px;
    color: #333;
    z-index: 0;
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

const domains = ['도메인 A', '도메인 B', '도메인 C', '도메인 D'];

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

    const formatDateTime = (): string => {
        const { year, month, day, hour, minute } = dateTime;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    };

    const onClickCreateButton = async (): Promise<void> => {
        const meetingData = {
            name,
            startDateTime: formatDateTime(),
            isNotify: sendAlert,
            domain, // 도메인 추가
        };

        try {
            const response = await axios.post(
                `/api/meeting/create/${projectId}`,
                meetingData,
            );
            console.log('Meeting created successfully:', response.data);
            alert('회의가 생성되었습니다.');
            onCancel();
        } catch (error) {
            console.error('Failed to create meeting:', error);
            alert('회의 생성에 실패했습니다.');
        }
    };

    return (
        <Backdrop>
            <Container>
                <LargeModalTitleTab type="project" title="회의 생성" />
                <ContentArea>
                    <ProjectInput
                        type="text"
                        value={name}
                        onChange={onChangeInput}
                        placeholder="회의 이름을 입력하세요."
                    />
                    <DateInputArea>
                        {dateFields.map((field) => (
                            <DateInput
                                key={field.value}
                                type="meet"
                                label={field.label}
                                value={
                                    dateTime[
                                        field.value as keyof typeof dateTime
                                    ]
                                }
                                onChange={onChangeDate(field.value)}
                                placeholder={field.placeholder}
                            />
                        ))}
                    </DateInputArea>
                </ContentArea>
                <RadioInput
                    label="멤버들에게 회의 생성 알림을 보낼까요?"
                    name="sendAlert"
                    checked={sendAlert}
                    onChange={() => setSendAlert(!sendAlert)}
                />
                <DomainArea>
                    <DomainSelect
                        value={domain}
                        onChange={(event) => setDomain(event.target.value)}
                    >
                        <option value="">도메인 입력</option>
                        {domains.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </DomainSelect>
                    <DropdownArrow>▼</DropdownArrow>
                </DomainArea>
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

export default MeetCreateModal;
