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
    z-index: 1; /* 커스텀 화살표 위에 텍스트가 나타나도록 함 */

    /* 기본 화살표를 숨기기 위해 브라우저 기본 스타일 제거 */
    background-image: none;
`;

/* 드롭다운 마크 추가 */
const DropdownArrow = styled.div`
    position: absolute;
    right: 15px; /* 오른쪽 마진 */
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none; /* 클릭되지 않도록 설정 */
    font-size: 12px;
    color: #333;
    z-index: 0; /* 드롭다운 위에 나타나도록 설정 */
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

    const onClickCreateButton = (): void => {
        const meetingData = {
            name,
            domain,
            startDateTime: formatDateTime(),
            isNotify: sendAlert,
        };
        console.log('Sending data:', meetingData);

        alert('회의 생성');
        onCancel();
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
