import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexCol, FlexRow, ItemsCenterRow } from '../styles/FlexModule';
import Layout from '../Layout';
import { MemberIcon } from '../assets';
import {
  MemberTable,
  MemberAddButton,
  ContentTitle,
  Tab,
  MeetCreateButton,
  EventFile,
} from '../components';

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

const SvgIcon = styled.img`
  width: 28px;
  height: 20px;
`;

// 왼쪽 영역
const LeftContentArea = styled(ContentArea)`
  border-right: 0.5px solid #b6b6b6; /* 영역 구분 되게끔 일부러 표시해둔 거에용 */
`;

const MemberTableArea = styled(FlexCol)``;

const MemberTab = styled(ItemsCenterRow)`
  gap: 5px;
  padding-left: 3px;
  font-size: 20px;
  color: #3c3c3c;
`;

const ContentTabArea = styled(FlexCol)``;

const ContentFileArea = styled(FlexCol)`
  gap: 4px;
`;

// 오른쪽 영역
const RightContentArea = styled(ContentArea)``;

const MemberDummyData = [
  {
    name: '박건민',
    role: '디자인',
    email: 'pkm021118@kookmin.ac.kr',
    contact: '010-4726-9130',
  },
  {
    name: '신진욱',
    role: 'Front',
    email: 'jinwook2765@kookmin.ac.kr',
    contact: '010-4630-2765',
  },
];

const MeetingDummyData = [
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
];

const ProjectDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('meeting');

  return (
    <Layout>
      <Container>
        <LeftContentArea>
          <ContentTitle type="project" title="새로운 프로젝트" />
          <MemberTableArea>
            <MemberTab>
              <SvgIcon src={MemberIcon} />
              Member
            </MemberTab>
            <MemberTable data={MemberDummyData} />
            <MemberAddButton />
          </MemberTableArea>
          <ContentTabArea>
            <Tab activeTab={activeTab} onClickTab={setActiveTab} />
            <ContentFileArea>
              {activeTab === 'meeting' && (
                <>
                  <MeetCreateButton />
                  {MeetingDummyData.map((meeting) => {
                    return (
                      <EventFile
                        key={meeting.id}
                        meetingName={meeting.meetingName}
                        dateTime={meeting.dateTime}
                      />
                    );
                  })}
                </>
              )}
            </ContentFileArea>
          </ContentTabArea>
        </LeftContentArea>
        <RightContentArea>
          <h3>캘린더 및 when2meet</h3>
        </RightContentArea>
      </Container>
    </Layout>
  );
};

export default ProjectDetailPage;
