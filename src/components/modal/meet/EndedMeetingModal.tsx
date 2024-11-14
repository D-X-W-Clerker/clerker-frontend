// EndedMeetingModal.tsx

import React from 'react';
import styled from 'styled-components';
import {
    LargeModalTitleTab,
    ProjectInput,
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

// -- 인터페이스 --
interface EndedMeetingModalProps {
    meeting: {
        id: string;
        meetingName: string;
        dateTime: string;
        url?: string;
    };
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
    height: 250px;
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

const SubText = styled(ItemsCenterRow)`
    font-size: 14px;
    color: var(--color-gray-600);
`;

const EndedMeetingModal: React.FC<EndedMeetingModalProps> = ({
    meeting,
    onConfirm,
}) => {
    const dateFields = SplitDateTime(meeting.dateTime);

    return (
        <Backdrop>
            <Container>
                <LargeModalTitleTab type="project" title="종료된 회의" />
                <ContentArea>
                    <ProjectInput
                        type="text"
                        value={meeting.meetingName}
                        isEditable={false}
                    />
                    <DateInputArea>
                        {dateFields.map((field) => {
                            return (
                                <DateInput
                                    key={field.value}
                                    type="meet"
                                    label={field.label}
                                    value={field.value}
                                    isEditable={false}
                                />
                            );
                        })}
                    </DateInputArea>
                </ContentArea>
                <SubContentArea>
                    <SubText>이 회의는 이미 종료되었습니다.</SubText>
                </SubContentArea>
                <ButtonArea>
                    <ModalButton text="확인" color="blue" onClick={onConfirm} />
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default EndedMeetingModal;
