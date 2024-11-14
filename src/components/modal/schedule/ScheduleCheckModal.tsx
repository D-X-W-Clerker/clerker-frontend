import React from 'react';
import styled from 'styled-components';
import { LargeModalTitleTab, ModalButton, EventFile } from '@components';
import { CenterRow, FlexCol } from '@styles';

interface ScheduleData {
    meetingId?: string; // 회의 ID
    scheduleId?: string; // 스케줄 ID
    name?: string; // 회의 이름
    scheduleName?: string; // 스케줄 이름
    startDate: string; // 시작 날짜
}

interface ScheduleCheckModalProps {
    scheduleData: ScheduleData[]; // 스케줄 데이터 배열
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
    width: 520px; /* 고정 너비 */
    height: 300px; /* 고정 높이 */
    box-sizing: border-box;
    padding: 20px 20px;
    background-color: var(--background-color);
    border-radius: 10px;
    position: relative;
`;

const HeaderArea = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
`;

const ContentArea = styled(FlexCol)`
    flex: 1; /* 공간을 채우도록 설정 */
    gap: 10px;
    align-items: center;
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
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
                    {scheduleData.map((schedule) => {
                        return (
                            <EventFile
                                key={schedule.scheduleId || schedule.meetingId}
                                meetingName={
                                    schedule.name || schedule.scheduleName || ''
                                }
                                dateTime={schedule.startDate}
                            />
                        );
                    })}
                </ContentArea>
                <ButtonArea>
                    <ModalButton text="확인" color="blue" onClick={onConfirm} />
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default ScheduleCheckModal;
