import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { TitleTab } from '@components';
import { FlexCol, FlexRow } from '@styles';
import axios from 'axios';
import Layout from '../Layout';
import DomainArrow from '../assets/action/arrow/DomainArrow.svg';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = document.cookie
        .split('; ')
        .find((row) => {
            return row.startsWith('token=');
        })
        ?.split('=')[1];
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const Container = styled(FlexCol)`
    width: 100%;
    max-width: 1300px;
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

const TabsContainer = styled(FlexRow)`
    margin-bottom: -20px;
    gap: 10px;
`;

const TabButton = styled.button<{ $active: boolean }>`
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    background-color: ${(props) => {
        return props.$active ? '#40A3FF' : '#f9f9f9';
    }};
    color: ${(props) => {
        return props.$active ? '#fff' : '#333';
    }};
    border: 1px solid
        ${(props) => {
            return props.$active ? '#40A3FF' : '#ddd';
        }};
    border-radius: 5px;

    &:hover {
        background-color: ${(props) => {
            return props.$active ? '#007ACC' : '#f0f0f0';
        }}; /* 선택 시 Hover 효과 */
    }
`;

const FileContainer = styled.div`
    margin-bottom: 20px;
    padding: 50px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fafafa;
`;

const MarkdownContent = styled(ReactMarkdown)`
    font-size: 14px;
    color: #333;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: 10px;
    margin-top: -25px;

    img {
        max-width: 80%;
        max-height: 400px;
        height: auto;
        display: block;
        margin: 10px auto;
    }
`;

const TextContent = styled.pre`
    font-size: 14px;
    color: #333;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: 10px;
`;

interface FileItem {
    fileId: number;
    url: string;
}

interface MeetingData {
    meetingId: number;
    name: string;
    domain: string | null;
    files: Record<string, FileItem>;
}

const fetchFileContent = async (url: string): Promise<string> => {
    try {
        const response = await axios.get(url, { responseType: 'text' });
        return response.data;
    } catch (error) {
        console.error('파일 내용을 가져오는데 실패했습니다:', error);
        return '파일 내용을 불러오는데 실패했습니다.';
    }
};

const MeetSummaryPage: React.FC = () => {
    const meetingId = 9; // meetingId를 9로 고정
    const [meetingData, setMeetingData] = useState<MeetingData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fileContents, setFileContents] = useState<Record<number, string>>(
        {},
    );
    const [activeTab, setActiveTab] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeetingData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get<MeetingData>(
                    `/api/meeting/result/${meetingId}`,
                );
                console.log('회의 데이터:', response.data);
                setMeetingData(response.data);

                // 모든 파일 내용 가져오기
                const files = Object.values(response.data.files);
                const fileContentPromises = files.map((file) => {
                    return fetchFileContent(file.url).then((content) => {
                        return {
                            fileId: file.fileId,
                            content,
                        };
                    });
                });

                const fileContentsArray =
                    await Promise.all(fileContentPromises);
                const contentMap: Record<number, string> = {};
                fileContentsArray.forEach(({ fileId, content }) => {
                    contentMap[fileId] = content;
                });
                setFileContents(contentMap);

                // 첫 번째 파일을 기본 활성화 탭으로 설정
                if (files.length > 0) {
                    setActiveTab(Object.keys(response.data.files)[0]);
                }
            } catch (error) {
                console.error('회의 데이터를 가져오는 데 실패했습니다:', error);
                alert('회의 데이터를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMeetingData();
    }, [meetingId]);

    if (isLoading) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    if (!meetingData) {
        return <div>회의 데이터를 찾을 수 없습니다.</div>;
    }

    return (
        <Layout>
            <Container>
                <TitleTab
                    type="meetSummary"
                    title={meetingData.name || '회의 제목'}
                />
                <DomainArea>
                    <DomainArrowIcon src={DomainArrow} />
                    {meetingData.domain ? (
                        <DomainKeyword>{meetingData.domain}</DomainKeyword>
                    ) : (
                        <DomainKeyword>도메인 정보 없음</DomainKeyword>
                    )}
                </DomainArea>
                <TabsContainer>
                    {Object.keys(meetingData.files).map((key) => {
                        return (
                            <TabButton
                                key={key}
                                $active={activeTab === key}
                                onClick={() => {
                                    return setActiveTab(key);
                                }}
                            >
                                {key}
                            </TabButton>
                        );
                    })}
                </TabsContainer>
                <FileContainer>
                    {Object.entries(meetingData.files).map(([key, file]) => {
                        return activeTab === key ? (
                            <MarkdownContent key={file.fileId}>
                                {fileContents[file.fileId] || '불러오는 중...'}
                            </MarkdownContent>
                        ) : null;
                    })}
                </FileContainer>
            </Container>
        </Layout>
    );
};

export default MeetSummaryPage;
