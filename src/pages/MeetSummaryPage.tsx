import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { TitleTab } from '@components';
import { FlexCol, ItemsCenterRow } from '@styles';
import axios from 'axios';
import { DomainArrowIcon } from '@assets';
import Layout from '../Layout';

// --- 인터페이스
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

// const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
// });
//
// axiosInstance.interceptors.request.use((config) => {
//     const token = document.cookie
//         .split('; ')
//         .find((row) => {
//             return row.startsWith('token=');
//         })
//         ?.split('=')[1];
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// --- 레이아웃 스타일
const Container = styled(FlexCol)`
    width: 100%;
    max-width: 1300px;
    height: calc(100vh - 50px);
    overflow-y: auto;
    padding: 40px;
    gap: 30px;
    ::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const DomainArea = styled(ItemsCenterRow)`
    gap: 5px;
`;

const ContentsArea = styled(FlexCol)`
    gap: 10px;
`;

const TabsArea = styled(ItemsCenterRow)`
    gap: 10px;
`;

const FileArea = styled.div`
    margin-bottom: 44px;
    padding: 25px 50px;
    border: 1px solid var(--color-gray-100);
    border-radius: 8px;
    background-color: var(--color-white-50);
`;

// --- 컴포넌트 스타일
const IconImage = styled.img`
    width: 16px;
    height: 16px;
`;

const DomainKeyword = styled.span`
    font-size: 14px;
    padding: 5px 10px;
    border: 1px solid var(--color-gray-100);
    border-radius: 8px;
    background-color: var(--color-white-50);
`;

const TabButton = styled.button<{ $active: boolean }>`
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    background-color: ${(props) => {
        return props.$active
            ? 'var(--color-blue-100)'
            : 'var(--color-white-50)';
    }};
    color: ${(props) => {
        return props.$active
            ? 'var(--background-color)'
            : 'var(--color-gray-600)';
    }};
    border: 1px solid
        ${(props) => {
            return props.$active
                ? 'var(--color-blue-100)'
                : 'var(--color-gray-100)';
        }};
    border-radius: 8px;

    &:hover {
        background-color: ${(props) => {
            return props.$active
                ? 'var(--color-blue-200)'
                : 'var(--color-white-100)';
        }};
    }
`;

const MarkdownContent = styled(ReactMarkdown)`
    font-size: 14px;
    color: var(--color-gray-600);
    white-space: pre-wrap;
    word-wrap: break-word;

    img {
        display: block;
        max-width: 80%;
        max-height: 400px;
        height: auto;
        margin: 10px auto;
    }
`;

// const fetchFileContent = async (url: string): Promise<string> => {
//     try {
//         const response = await axios.get(url, { responseType: 'text' });
//         console.log('파일 내용이에요', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('파일 내용을 가져오는데 실패했습니다:', error);
//         return '파일 내용을 불러오는데 실패했습니다.';
//     }
// };

// 더미데이터
const meetingDataExample: MeetingData = {
    meetingId: 3,
    name: '전체 회의 요약 보고서',
    domain: 'IT',
    files: {
        report: {
            fileId: 303,
            url: '/file/report.md',
        },
        stt: {
            fileId: 304,
            url: '/file/stt.txt',
        },
    },
};

const MeetSummaryPage: React.FC = () => {
    const { summaryId } = useParams<{ summaryId: string }>();
    const [meetingData, setMeetingData] = useState<MeetingData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fileContents, setFileContents] = useState<Record<number, string>>(
        {},
    );
    const [activeTab, setActiveTab] = useState<string | null>(null);

    useEffect(() => {
        // const fetchMeetingData = async () => {
        //     if (!summaryId) {
        //         console.error('meetingId가 제공되지 않았습니다.');
        //         return;
        //     }
        //
        //     setIsLoading(true);
        //     try {
        //         const response = await axiosInstance.get<MeetingData>(
        //             `/api/meeting/result/${summaryId}`,
        //         );
        //         console.log('회의 데이터:', response.data);
        //         setMeetingData(response.data);
        //
        //         // 모든 파일 내용 가져오기
        //         const files = Object.values(response.data.files);
        //         const fileContentPromises = files.map((file) => {
        //             return fetchFileContent(file.url).then((content) => {
        //                 return {
        //                     fileId: file.fileId,
        //                     content,
        //                 };
        //             });
        //         });
        //
        //         const fileContentsArray =
        //             await Promise.all(fileContentPromises);
        //         const contentMap: Record<number, string> = {};
        //         fileContentsArray.forEach(({ fileId, content }) => {
        //             contentMap[fileId] = content;
        //         });
        //         setFileContents(contentMap);
        //
        //         // 첫 번째 파일을 기본 활성화 탭으로 설정
        //         if (files.length > 0) {
        //             setActiveTab(Object.keys(response.data.files)[0]);
        //         }
        //     } catch (error) {
        //         console.error('회의 데이터를 가져오는 데 실패했습니다:', error);
        //         alert('회의 데이터를 불러오는데 실패했습니다.');
        //     } finally {
        //         setIsLoading(false);
        //     }
        // };
        //
        // fetchMeetingData();

        // 더미데이터 meetingData 할당
        setMeetingData(meetingDataExample);

        // 더미데이터 fetch 코드
        const fetchFileContents = async () => {
            try {
                // Markdown 파일 내용 가져오기
                const reportResponse = await fetch('/file/report.md');
                const reportContent = await reportResponse.text();

                // STT 파일 내용 가져오기
                const sttResponse = await fetch('/file/stt.txt');
                const sttContent = await sttResponse.text();

                // fileContents 상태 업데이트
                setFileContents({
                    303: reportContent,
                    304: sttContent,
                });

                // 첫 번째 파일을 기본 활성 탭으로 설정
                const firstTab = Object.keys(meetingDataExample.files)[0];
                setActiveTab(firstTab);
            } catch (error) {
                console.error('파일 내용을 가져오는데 실패했습니다:', error);
            }
        };

        fetchFileContents();
    }, [summaryId]);

    // if (isLoading) {
    //     return <div>데이터를 불러오는 중입니다...</div>;
    // }

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
                    <IconImage src={DomainArrowIcon} />
                    {meetingData.domain ? (
                        <DomainKeyword>{meetingData.domain}</DomainKeyword>
                    ) : (
                        <DomainKeyword>도메인 정보 없음</DomainKeyword>
                    )}
                </DomainArea>
                <ContentsArea>
                    <TabsArea>
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
                    </TabsArea>
                    <FileArea>
                        {Object.entries(meetingData.files).map(
                            ([key, file]) => {
                                return activeTab === key ? (
                                    <MarkdownContent key={file.fileId}>
                                        {fileContents[file.fileId] ||
                                            '불러오는 중...'}
                                    </MarkdownContent>
                                ) : null;
                            },
                        )}
                    </FileArea>
                </ContentsArea>
            </Container>
        </Layout>
    );
};

export default MeetSummaryPage;
