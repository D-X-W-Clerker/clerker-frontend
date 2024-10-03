import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ActiveSettingIcon, MemberIcon, MemberAddIcon, AddIcon } from '@assets';
import {
  MemberTable,
  TitleTab,
  EventTab,
  ActionButton,
  EventFile,
  MemberInviteModal,
} from '@components';
import { FlexCol, FlexRow, ItemsCenterRow, ItemsCenterStartRow } from '@styles';
import Layout from '../Layout';

// -- 스타일 컴포넌트 --
const Container = styled(FlexRow)`
  width: 100%;
  max-width: 1100px;
`;

const ContentArea = styled(FlexCol)`
  width: 50%;
  overflow-y: auto;
  height: calc(100vh - 50px);
  padding: 40px;
  gap: 30px;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const IconImage = styled.img<{ $width: number; $height: number }>`
  width: ${(props): number => {
    return props.$width;
  }}px;
  height: ${(props): number => {
    return props.$height;
  }}px;
  cursor: pointer;
`;

// 왼쪽 영역
const LeftContentArea = styled(ContentArea)``;

const MemberArea = styled(FlexCol)``;

const MemberTabArea = styled(ItemsCenterRow)`
  gap: 6px;
  padding-left: 3px;
  font-size: 20px;
  color: var(--color-gray-600);
`;

const MemberAddArea = styled(ItemsCenterStartRow)`
  padding: 5px;
  border-bottom: 0.5px solid var(--color-gray-300);
`;

const MemberAddButton = styled(ItemsCenterRow)`
  background-color: var(--color-gray-50);
  border-radius: 3px;
  padding: 2px;
  gap: 1px;
  font-size: 7px;
  color: var(--color-gray-400);
  cursor: pointer;
`;

const ContentTabArea = styled(FlexCol)``;

const ContentFileArea = styled(FlexCol)`
  gap: 4px;
`;

// 오른쪽 영역
const RightContentArea = styled(ContentArea)``;

const fetchEventData = async (): Promise<{
  meetings: { id: string; meetingName: string; dateTime: string }[];
  schedules: { id: string; meetingName: string; dateTime: string }[];
  members: {
    id: string;
    name: string;
    role: string | null;
    email: string;
    permission: string;
  }[];
}> => {
  return {
    meetings: [
      {
        id: '1',
        meetingName: '프로젝트 킥오프',
        dateTime: '2024-07-02T10:30:00',
      },
      {
        id: '2',
        meetingName: '기획 회의',
        dateTime: '2024-07-08T14:00:00',
      },
    ],
    schedules: [
      {
        id: '3',
        meetingName: '프론트 디자인 회의 일정',
        dateTime: '2024-09-20T10:30:00',
      },
      {
        id: '4',
        meetingName: '프론트 기능 명세 일정',
        dateTime: '2024-09-15T14:00:00',
      },
    ],
    members: [
      {
        id: '1',
        name: '이정욱',
        role: 'BE',
        email: 'dlwjddnr5438@kookmin.ac.kr',
        permission: 'owner',
      },
      {
        id: '2',
        name: '신진욱',
        role: 'FE',
        email: 'jinwook2765@kookmin.ac.kr',
        permission: 'member',
      },
      {
        id: '3',
        name: '임형빈',
        role: 'AI',
        email: 'gudqls3157@gmail.com',
        permission: 'owner',
      },
      {
        id: '4',
        name: '박건민',
        role: 'DE',
        email: 'pkm021118@kookmin.ac.kr',
        permission: 'member',
      },
    ],
  };
};

const ProjectDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('meeting');
  const [meetingData, setMeetingData] = useState<
    { id: string; meetingName: string; dateTime: string }[]
  >([]);
  const [scheduleData, setScheduleData] = useState<
    { id: string; meetingName: string; dateTime: string }[]
  >([]);
  const [memberData, setMemberData] = useState<
    {
      id: string;
      name: string;
      role: string | null;
      email: string;
      permission: string;
    }[]
  >([]);
  const [showMemberAddModal, setShowMemberAddModal] = useState<boolean>(false);

  const onClickMeetCreateButton = (): void => {
    alert('회의 생성');
  };

  const onClickMemberSettingButton = (): void => {
    alert('멤버 설정');
  };

  const onClickMemberInviteButton = (): void => {
    setShowMemberAddModal(true);
  };

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const { meetings, schedules, members } = await fetchEventData();
      setMeetingData(meetings);
      setScheduleData(schedules);
      setMemberData(members);
    };
    fetchData();
  }, []);

  const eventData = activeTab === 'meeting' ? meetingData : scheduleData;

  return (
    <Layout>
      <Container>
        <LeftContentArea>
          <TitleTab type="project" title="Clerker" />
          <MemberArea>
            <MemberTabArea>
              <IconImage src={MemberIcon} $width={28} $height={20} />
              Member
              <IconImage
                src={ActiveSettingIcon}
                $width={16}
                $height={16}
                onClick={onClickMemberSettingButton}
              />
            </MemberTabArea>
            <MemberTable data={memberData} />
            <MemberAddArea>
              <MemberAddButton onClick={onClickMemberInviteButton}>
                <IconImage src={MemberAddIcon} $width={7} $height={7} />
                추가하기
              </MemberAddButton>
            </MemberAddArea>
          </MemberArea>
          <ContentTabArea>
            <EventTab activeTab={activeTab} onClickTab={setActiveTab} />
            <ContentFileArea>
              {activeTab === 'meeting' && (
                <ActionButton
                  icon={AddIcon}
                  label="회의 생성"
                  onClick={onClickMeetCreateButton}
                />
              )}
              {eventData.map((event) => {
                return (
                  <EventFile
                    key={event.id}
                    meetingName={event.meetingName}
                    dateTime={event.dateTime}
                  />
                );
              })}
            </ContentFileArea>
          </ContentTabArea>
        </LeftContentArea>
        <RightContentArea />
      </Container>
      {showMemberAddModal && (
        <MemberInviteModal
          onCancel={(): void => {
            return setShowMemberAddModal(false);
          }}
        />
      )}
    </Layout>
  );
};

export default ProjectDetailPage;
