import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TitleTab } from '@components';
import { FlexCol, FlexRow } from '@styles';
import ReactPlayer from 'react-player';
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

// 왼쪽 영역
const LeftContentArea = styled(ContentArea)``;

const ReportArea = styled(FlexCol)``;

// 오른쪽 영역
const RightContentArea = styled(ContentArea)``;

const VideoArea = styled(FlexCol)`
  margin-top: 44px;
`;

const DiagramArea = styled(FlexCol)`
  gap: 10px;
`;

const fetchEventData = async (): Promise<{
  reports: { id: string; title: string; summary: string; fileUrl: string }[];
  videos: { id: string; title: string; videoUrl: string }[];
  diagrams: { id: string; title: string; diagramUrl: string }[];
}> => {
  return {
    reports: [
      {
        id: '1',
        title: '회의록 1',
        summary: '프로젝트 킥오프 회의의 요약본입니다.',
        fileUrl: 'https://example.com/report1.pdf',
      },
    ],
    videos: [
      {
        id: '1',
        title: '프론트 디자인 회의 영상',
        videoUrl: 'https://www.youtube.com/watch?v=4Lmcadu8ghM',
      },
    ],
    diagrams: [
      {
        id: '1',
        title: '시스템 아키텍처 다이어그램',
        diagramUrl: 'https://example.com/diagram1.png',
      },
      {
        id: '2',
        title: '기능 명세 다이어그램',
        diagramUrl: 'https://example.com/diagram2.svg',
      },
    ],
  };
};

const MeetSummaryPage: React.FC = () => {
  const [reportData, setReportData] = useState<
    { id: string; title: string; summary: string; fileUrl: string }[]
  >([]);
  const [videoData, setVideoData] = useState<
    { id: string; title: string; videoUrl: string }[]
  >([]);
  const [diagramData, setDiagramData] = useState<
    { id: string; title: string; diagramUrl: string }[]
  >([]);

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const { reports, videos, diagrams } = await fetchEventData();
      setReportData(reports);
      setVideoData(videos);
      setDiagramData(diagrams);
    };
    fetchData();
  }, []);

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const { reports, videos, diagrams } = await fetchEventData();
      setReportData(reports);
      setVideoData(videos);
      setDiagramData(diagrams);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <Container>
        <LeftContentArea>
          <TitleTab type="meetSummary" title="회의록 1" />
          <ReportArea>보고서 넣을거에용</ReportArea>
        </LeftContentArea>
        <RightContentArea>
          <VideoArea>
            {videoData.length > 0 && (
              <ReactPlayer
                url={videoData[0].videoUrl}
                controls
                width="100%"
                height="300px"
              />
            )}
          </VideoArea>
          <DiagramArea>다이어그램</DiagramArea>
        </RightContentArea>
      </Container>
    </Layout>
  );
};

export default MeetSummaryPage;
