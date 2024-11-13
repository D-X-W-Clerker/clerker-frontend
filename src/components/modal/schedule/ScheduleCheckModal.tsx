import React from 'react';
import styled from 'styled-components';
import { LargeModalTitleTab, ModalButton, EventFile } from '@components';
import { CenterRow, FlexCol, ItemsCenterEndRow } from '@styles';

interface ScheduleData {
    meetingId?: string; // 회의 ID
    scheduleId?: string; // 스케줄 ID
    name?: string; // 회의 이름
    scheduleName?: string; // 스케줄 이름
    startDate: string; // 시작 날짜
}

interface ScheduleCheckModalProps {
    scheduleData: ScheduleData; // 모든 스케줄 데이터를 포함
    onConfirm: () => void;
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

const ScheduleCheckModal: React.FC<ScheduleCheckModalProps> = ({
    scheduleData,
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
                    {/* 동적으로 EventFile 렌더링 */}
                    {'meetingId' in scheduleData ? (
                        <EventFile
                            meetingName={scheduleData.name || ''}
                            dateTime={scheduleData.startDate}
                        />
                    ) : 'scheduleId' in scheduleData ? (
                        <EventFile
                            meetingName={scheduleData.scheduleName || ''}
                            dateTime={scheduleData.startDate}
                        />
                    ) : null}
                </ContentArea>
                <ButtonArea>
                    <ModalButton text="확인" color="blue" onClick={onConfirm} />
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default ScheduleCheckModal;
