import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  MemberTable,
  MemberAddButton,
  TitleTab,
  MemberTab,
  EventTab,
  MeetCreateButton,
  EventFile,
} from '@components';
import { FlexCol, FlexRow } from '@styles';
import Layout from '../Layout';

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

// 왼쪽 영역
const LeftContentArea = styled(ContentArea)`
  border-right: 0.5px solid var(--color-gray-300); /* 영역 구분되게 일부러 표시 */
`;

const MemberTableArea = styled(FlexCol)``;

const ContentTabArea = styled(FlexCol)``;

const ContentFileArea = styled(FlexCol)`
  gap: 4px;
`;

// 오른쪽 영역
const RightContentArea = styled(ContentArea)``;

const MemberDummyData = [
  {
    id: '1',
    name: '박건민',
    role: '디자인',
    email: 'pkm021118@kookmin.ac.kr',
    contact: '010-4726-9130',
  },
  {
    id: '2',
    name: '신진욱',
    role: 'Front',
    email: 'jinwook2765@kookmin.ac.kr',
    contact: '010-4630-2765',
  },
];

// fetchData 중에서 일부 데이터들
const fetchEventData = async (): Promise<{
  schedules: { id: string; meetingName: string; dateTime: string }[];
  meetings: { id: string; meetingName: string; dateTime: string }[];
}> => {
  return {
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
    meetings: [
      {
        id: '1',
        meetingName: '프로젝트 킥오프',
        dateTime: '2024-09-14T10:30:00',
      },
      {
        id: '2',
        meetingName: '디자인 리뷰',
        dateTime: '2024-09-15T14:00:00',
      },
    ],
  };
};

const ProjectDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('meeting');
  const [meetingData, setMeetingData] = useState<
    { id: string; meetingName: string; dateTime: string }[]
  >([]);
  const [scheduleData, setScheduleData] = useState<
    { id: string; meetingName: string; dateTime: string }[]
  >([]);

  useEffect((): void => {
    // 백엔드에서 데이터를 받아옴 (schedules, meetings 함께)
    const fetchData = async (): Promise<void> => {
      const { meetings, schedules } = await fetchEventData();
      setMeetingData(meetings);
      setScheduleData(schedules);
    };

    fetchData();
  }, []);

  const eventData = activeTab === 'meeting' ? meetingData : scheduleData;

  return (
    <Layout>
      <Container>
        <LeftContentArea>
          <TitleTab type="project" title="새로운 프로젝트" />
          <MemberTableArea>
            <MemberTab />
            <MemberTable data={MemberDummyData} />
            <MemberAddButton />
          </MemberTableArea>
          <ContentTabArea>
            <EventTab activeTab={activeTab} onClickTab={setActiveTab} />
            <ContentFileArea>
              {activeTab === 'meeting' && <MeetCreateButton />}
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
    </Layout>
  );
};

export default ProjectDetailPage;
