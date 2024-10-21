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
interface RecordingStopModalProps {
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

const infoMessages = [
  { id: 1, text: '프로젝트 하위 문서에서 요약본을 확인하실 수 있습니다.' },
  { id: 2, text: '요약 및 정리에는 3분 정도의 시간이 소요됩니다.' },
  { id: 3, text: '완료되면 알람을 보내드리고 있습니다.' },
];

const RecordingStopModal: React.FC<RecordingStopModalProps> = ({
  meeting,
  onConfirm,
}) => {
  const dateFields = SplitDateTime(meeting.dateTime);

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
          <SubText>회의가 종료 되었습니다.</SubText>
          <List>
            {infoMessages.map((message) => {
              return <ListItem key={message.id}>{message.text}</ListItem>;
            })}
          </List>
        </SubContentArea>
        <ButtonArea>
          <ModalButton text="종료" color="blue" onClick={onConfirm} />
        </ButtonArea>
      </Container>
    </Backdrop>
  );
};

export default RecordingStopModal;
