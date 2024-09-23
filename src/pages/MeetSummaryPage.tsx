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

const Text = styled.div`
  font-size: 18px;
`;

// 오른쪽 영역
const RightContentArea = styled(ContentArea)``;

const VideoArea = styled(FlexCol)`
  margin-top: 44px;
`;

const DiagramArea = styled(FlexCol)`
  gap: 10px;
`;

const DiagramImage = styled.img`
  width: 100%;
  height: auto;
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
        title: '데모 회의 요약 영상',
        videoUrl: '/videos/DemoSummaryVideo.mp4',
      },
    ],
    diagrams: [
      {
        id: '1',
        title: '청크1',
        diagramUrl: '/diagrams/chunk1.png',
      },
      {
        id: '2',
        title: '청크2',
        diagramUrl: '/diagrams/chunk2.png',
      },
      {
        id: '3',
        title: '청크3',
        diagramUrl: '/diagrams/chunk5.png',
      },
      {
        id: '4',
        title: '청크4',
        diagramUrl: '/diagrams/chunk4.png',
      },
      {
        id: '5',
        title: '청크5',
        diagramUrl: '/diagrams/chunk9.png',
      },
      {
        id: '6',
        title: '청크6',
        diagramUrl: '/diagrams/chunk6.png',
      },
      {
        id: '7',
        title: '청크7',
        diagramUrl: '/diagrams/chunk7.png',
      },
      {
        id: '8',
        title: '청크8',
        diagramUrl: '/diagrams/chunk10.png',
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

  return (
    <Layout>
      <Container>
        <LeftContentArea>
          <TitleTab type="meetSummary" title="9월 12일 AI 회의" />
          <ReportArea>
            <Text>
              9월 12일 회의 내용입니다. 인퍼런스용 강의 영상은 논문 발표처럼
              무겁지 않게, 컨퍼런스 형식의 영상으로 진행하면 좋습니다. SK에서
              진행한 강의 영상처럼 일반 대중을 대상으로 하되, 전문 용어를 적절히
              사용하여 이해하기 쉬운 방식으로 진행합니다. STTt에서는 청킹을
              넘어갈 때 불용어 처리가 진행됩니다. MP3 파일을 입력하면 NTT 결과와
              청킹 결과, 서머리 결과 등이 저장되도록 설정되어 있으며, STT
              결과물이 청킹과 서머리 과정에 자동으로 반영됩니다. 일상 대화도
              학습만 돌리면 가능하니 제가 시도해보겠습니다. 현재 코드가 각
              청크별로 블로썸을 거쳐 HTML로 연결되는데, 이 과정에서 HTML이
              깨지고 시간이 오래 걸립니다. 응답 검증이나 퀄리티보다도 인퍼런스
              시간을 줄여야 할 것 같은데, 최적화 방법이 필요할 듯 합니다. TS에서
              했던 것처럼 각 청크별로 다음 청크와의 언어적 유사도를 비교할 수
              있을 것 같습니다. 청킹을 통해 서머리할 때 반복되는 문장을 줄이는
              방법은 일정 토큰 수를 유지하면서 짧은 청크가 생성되지 않도록 하는
              것이 중요한 것 같습니다. 시간이 부족해도, 영상은 9월 말입니다.
              이번 달 말까지는 실현 가능성을 봐야 될 것 같습니다.
            </Text>
          </ReportArea>
        </LeftContentArea>
        <RightContentArea>
          <VideoArea>
            {videoData.length > 0 && (
              <ReactPlayer
                url={videoData[0].videoUrl}
                controls
                width="100%"
                height="100%"
              />
            )}
          </VideoArea>
          <DiagramArea>
            {diagramData.map((diagram) => {
              return (
                <DiagramImage
                  key={diagram.id}
                  src={diagram.diagramUrl}
                  alt={diagram.title}
                />
              );
            })}
          </DiagramArea>
        </RightContentArea>
      </Container>
    </Layout>
  );
};

export default MeetSummaryPage;
