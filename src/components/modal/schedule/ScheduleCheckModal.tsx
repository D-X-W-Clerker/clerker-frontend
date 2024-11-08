import React from 'react';
import styled from 'styled-components';
import { LargeModalTitleTab, ModalButton, EventFile } from '@components';
import { CenterRow, FlexCol, ItemsCenterEndRow } from '@styles';

interface ScheduleCheckModalProps {
    scheduleName: string;
    dateTime: string;
    onConfirm: () => void;
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
    position: relative;
`;

const HeaderArea = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ContentArea = styled(FlexCol)`
    gap: 10px;
    align-items: center;
`;

const ButtonArea = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

// -- 더미 데이터 --
const dummyData = {
    scheduleName: '프론트엔드 디자인 회의',
    dateTime: '2024-10-21T10:30:00', // ISO 형식 날짜
};

const ScheduleCheckModal: React.FC<ScheduleCheckModalProps> = ({
    scheduleName = dummyData.scheduleName,
    dateTime = dummyData.dateTime,
    onConfirm,
}) => {
    return (
        <Backdrop>
            <Container>
                <HeaderArea>
                    <LargeModalTitleTab
                        type="scheduleCheck"
                        title="일정 확인"
                    />
                </HeaderArea>
                <ContentArea>
                    <EventFile meetingName={scheduleName} dateTime={dateTime} />
                </ContentArea>
                <ButtonArea>
                    <ModalButton text="확인" color="blue" onClick={onConfirm} />
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default ScheduleCheckModal;