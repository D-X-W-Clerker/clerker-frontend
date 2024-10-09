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

const SubContentArea = styled(FlexCol)`
  flex: 1;
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

const MeetCreateModal: React.FC<MeetCreateModalProps> = ({ onCancel }) => {
  const [name, setName] = useState<string>('');
  const [dateTime, setDateTime] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
  });
  const [sendAlert, setSendAlert] = useState<boolean>(false);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
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

  const onClickCreateButton = (): void => {
    alert('회의 생성');
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
            {dateFields.map((field) => {
              return (
                <DateInput
                  key={field.value}
                  type="meet"
                  label={field.label}
                  value={dateTime[field.value as keyof typeof dateTime]} // 해당 필드 값
                  onChange={onChangeDate(field.value)} // 해당 필드 변경 처리
                  placeholder={field.placeholder}
                />
              );
            })}
          </DateInputArea>
        </ContentArea>
        <SubContentArea>
          <RadioInput
            label="멤버들에게 회의 생성 알림을 보낼까요?"
            name="sendAlert"
            checked={sendAlert}
            onChange={(): void => {
              return setSendAlert(!sendAlert);
            }}
          />
        </SubContentArea>
        <ButtonArea>
          <ModalButton text="취소" color="gray" onClick={onCancel} />
          <ModalButton text="생성" color="blue" onClick={onClickCreateButton} />
        </ButtonArea>
      </Container>
    </Backdrop>
  );
};

export default MeetCreateModal;
