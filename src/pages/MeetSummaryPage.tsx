import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TitleTab } from '@components';
import { FlexCol, FlexRow } from '@styles';
import Layout from '../Layout';
import DomainArrow from '../assets/action/arrow/DomainArrow.svg';

const Container = styled(FlexCol)`
    width: 100%;
    max-width: 1100px;
    padding: 40px;
    gap: 30px;
    overflow-y: auto;
    height: calc(100vh - 50px);
    ::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const DomainArea = styled(FlexRow)`
    align-items: center;
    gap: 5px;
    font-size: 14px;
`;

const DomainArrowIcon = styled.img`
    width: 16px;
    height: 16px;
`;

const DomainKeyword = styled.span`
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

const Text = styled.div`
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 20px; /* 이미지와 텍스트 간의 간격 추가 */
`;

const DiagramContainer = styled.div`
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    margin: 20px 0;
`;

const DiagramImage = styled.img`
    width: 100%;
    max-width: 600px; /* 최대 너비 제한 */
    height: auto;
`;

const fetchEventData = async (): Promise<{
    reports: { id: string; title: string; summary: string; fileUrl: string }[];
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
        ],
    };
};

const MeetSummaryPage: React.FC = () => {
    const [reportData, setReportData] = useState<
        { id: string; title: string; summary: string; fileUrl: string }[]
    >([]);
    const [diagramData, setDiagramData] = useState<
        { id: string; title: string; diagramUrl: string }[]
    >([]);
    const domainKeywords = ['AI', 'Machine Learning', 'NLP', 'Summarization'];

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            const { reports, diagrams } = await fetchEventData();
            setReportData(reports);
            setDiagramData(diagrams);
        };
        fetchData();
    }, []);

    return (
        <Layout>
            <Container>
                <TitleTab type="meetSummary" title="9월 12일 AI 회의" />
                <DomainArea>
                    <DomainArrowIcon src={DomainArrow} />
                    {domainKeywords.map((keyword) => {
                        return (
                            <DomainKeyword key={keyword}>
                                {keyword}
                            </DomainKeyword>
                        );
                    })}
                </DomainArea>
                <Text>
                    9월 12일 회의 내용입니다. 인퍼런스용 강의 영상은 논문
                    발표처럼 무겁지 않게, 컨퍼런스 형식의 영상으로 진행하면
                    좋습니다. SK에서 진행한 강의 영상처럼 일반 대중을 대상으로
                    하되, 전문 용어를 적절히 사용하여 이해하기 쉬운 방식으로
                    진행합니다.
                </Text>
                {diagramData[0] && (
                    <DiagramContainer>
                        <DiagramImage
                            src={diagramData[0].diagramUrl}
                            alt={diagramData[0].title}
                        />
                    </DiagramContainer>
                )}
                <Text>
                    STT에서는 청킹을 넘어갈 때 불용어 처리가 진행됩니다. MP3
                    파일을 입력하면 NTT 결과와 청킹 결과, 서머리 결과 등이
                    저장되도록 설정되어 있으며, STT 결과물이 청킹과 서머리
                    과정에 자동으로 반영됩니다.
                </Text>
                {diagramData[1] && (
                    <DiagramContainer>
                        <DiagramImage
                            src={diagramData[1].diagramUrl}
                            alt={diagramData[1].title}
                        />
                    </DiagramContainer>
                )}
                <Text>
                    현재 코드가 각 청크별로 블로썸을 거쳐 HTML로 연결되는데, 이
                    과정에서 HTML이 깨지고 시간이 오래 걸립니다.
                </Text>
            </Container>
        </Layout>
    );
};

export default MeetSummaryPage;
