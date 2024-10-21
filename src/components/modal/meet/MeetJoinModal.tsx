import React, { useState } from 'react';
import styled from 'styled-components';
import { UrlClipIcon } from '@assets';
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
  ItemsCenterRow,
  ItemsCenterSpaceRow,
  ItemsCenterEndRow,
} from '@styles';
import { SplitDateTime } from '@utils';

// -- 인터페이스 --
interface MeetJoinModalProps {
  meetingId: string;
  onCancel: () => void;
}

interface MeetDetailProps {
  id: string;
  name: string;
  url: string;
  startDate: string;
  isEnded: boolean;
  createdAt: string;
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
  gap: 5px;
`;

const ButtonArea = styled(ItemsCenterEndRow)`
  gap: 10px;
`;

const UrlArea = styled(ItemsCenterRow)`
  gap: 10px;
  padding-left: 5px;
`;

const Alert = styled.div`
  font-size: 12px;
  color: var(--color-red);
  padding-left: 35px;
`;

const SvgImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const UrlText = styled.span`
  color: var(--color-blue-100);
  font-size: 14px;
  cursor: pointer;
`;

// 더미 데이터
const meeting: MeetDetailProps = {
  id: '1',
  name: '9월 12일 회의',
  url: 'https://meet.google.com/hgq-ncmq-arq',
  startDate: '2024-09-12T04:11:48.532Z',
  isEnded: false,
  createdAt: '2024-09-12T04:11:48.532Z',
};

const MeetJoinModal: React.FC<MeetJoinModalProps> = ({
  meetingId,
  onCancel,
}) => {
  const dateFields = SplitDateTime(meeting.startDate);
  const [sendAlert, setSendAlert] = useState<boolean>(false);

  const onClickJoinButton = (): void => {
    alert('회의 참여');
    onCancel();
  };

  const onCopyUrl = (): void => {
    if (meeting.url) {
      navigator.clipboard.writeText(meeting.url);
      alert('URL이 클립보드에 복사되었습니다!');
    }
  };

  return (
    <Backdrop>
      <Container>
        <LargeModalTitleTab type="project" title="회의 참여" />
        <ContentArea>
          <ProjectInput type="text" value={meeting.name} isEditable={false} />
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
          <RadioInput
            label="회의를 녹화 하시겠습니까?"
            name="sendAlert"
            checked={sendAlert}
            onChange={(): void => {
              return setSendAlert(!sendAlert);
            }}
          />
          <Alert>
            녹화 옵션을 선택하지 않을 시, 회의 요약 및 정리 기능을 이용하실 수
            없습니다.
          </Alert>
          <UrlArea onClick={onCopyUrl}>
            <SvgImage src={UrlClipIcon} alt="URL Clip Icon" />
            <UrlText>{meeting.url}</UrlText>
          </UrlArea>
        </SubContentArea>
        <ButtonArea>
          <ModalButton text="취소" color="gray" onClick={onCancel} />
          <ModalButton text="참여" color="blue" onClick={onClickJoinButton} />
        </ButtonArea>
      </Container>
    </Backdrop>
  );
};

export default MeetJoinModal;
