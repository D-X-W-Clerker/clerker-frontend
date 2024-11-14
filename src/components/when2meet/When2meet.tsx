import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { TimeGrid, MemberTable, ModalButton } from '@components';
import { FlexCol, JustifyCenterRow, ItemsCenterEndRow } from '@styles';
import { useAuthStore } from '@store';
import { getTimeTable, postTimeTable } from '../../apis';

// 타입 정의
interface TimeTable {
    time: string;
}

interface Member {
    username: string;
    email: string;
    type: string | null;
    role: string;
    timeTables: TimeTable[];
}

interface EventData {
    times: string[];
    dates: string[];
    members: Member[];
}

interface When2meetProps {
    projectID: string;
    scheduleID: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    onCancel: () => void;
}

const TimeGridContainer = styled(JustifyCenterRow)`
    gap: 25px;
    overflow-x: auto;
    width: 100%;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: var(--font-medium);
    padding-bottom: 6px;
    margin-top: 10px;
`;

const MemberContainer = styled(FlexCol)``;

const ButtonContainer = styled(ItemsCenterEndRow)`
    gap: 7px;
    margin-bottom: 30px;
`;

const When2meet: React.FC<When2meetProps> = ({
    projectID,
    scheduleID,
    startDate,
    endDate,
    startTime,
    endTime,
    onCancel,
}) => {
    const [personalAvailable, setPersonalAvailable] = useState<string[]>([]);
    const [memberData, setMemberData] = useState<Member[]>([]);
    const { user } = useAuthStore();

    const myInfo: Member = {
        username: user?.name || 'Unknown User',
        email: user?.email || 'unknown@example.com',
        role: 'member',
        type: 'FE',
        timeTables: [],
    };

    const { data: timeTableData } = useQuery(
        ['timeTable', scheduleID],
        () => {
            return getTimeTable(projectID || '', scheduleID);
        },
        {
            enabled: !!scheduleID, // scheduleId가 있을 때만 실행
            onSuccess: (data) => {
                console.log('timeTable 불러오기 성공:', data);

                // 데이터 매핑
                const members = data.map((member) => {
                    return {
                        username: member.username,
                        email: member.email,
                        type: member.type,
                        role: member.role,
                        timeTables: member.timeTables,
                    };
                });
                setMemberData(members);
            },
            onError: (error) => {
                console.error('timeTable 불러오기 실패:', error);
            },
        },
    );

    const updateMyInfo = (times: string[]): Member => {
        return {
            ...myInfo,
            timeTables: times.map((time) => {
                return { time };
            }),
        };
    };

    const formatMeetingTimesWithCounts = (): Record<string, number> => {
        const timeCounts: Record<string, number> = {};

        personalAvailable.forEach((time) => {
            timeCounts[time] = (timeCounts[time] || 0) + 1;
        });

        memberData.forEach((member) => {
            member.timeTables.forEach((table) => {
                if (!table.time) return;

                const [date, time] = table.time.split(' ');

                if (date && time) {
                    const formattedTime = `${date.slice(5, 7)}${date.slice(8, 10)}-${time.slice(0, 2)}${time.slice(3, 5)}`;

                    timeCounts[formattedTime] =
                        (timeCounts[formattedTime] || 0) + 1;
                }
            });
        });

        return timeCounts;
    };

    useEffect(() => {
        if (personalAvailable.length === 0) {
            setMemberData((prev) => {
                return prev.filter((member) => {
                    return member.username !== myInfo.username;
                });
            });
        } else {
            const myUpdatedInfo = updateMyInfo(personalAvailable);
            const filteredMembers = memberData.filter((member) => {
                return member.username !== myInfo.username;
            });
            setMemberData([...filteredMembers, myUpdatedInfo]);
        }
    }, [personalAvailable]);

    const timeCounts = formatMeetingTimesWithCounts();

    const handleToggleTime = (date: string, time: string): void => {
        const key = `${date}-${time}`;
        setPersonalAvailable((prev) => {
            return prev.includes(key)
                ? prev.filter((t) => {
                      return t !== key;
                  })
                : [...prev, key];
        });
    };

    const handleSaveSchedule = async (): Promise<void> => {
        try {
            const year = new Date(startDate).getFullYear(); // startDate에서 연도 가져오기

            // 날짜와 시간을 올바른 포맷으로 변환
            const timeTable = personalAvailable.map((time) => {
                const [date, timePart] = time.split('-');
                const month = date.slice(0, 2); // MM
                const day = date.slice(2); // DD
                const hour = timePart.slice(0, 2); // HH
                const minute = timePart.slice(2); // mm
                return `${year}-${month}-${day} ${hour}:${minute}:00`;
            });

            await postTimeTable(scheduleID, { timeTable });
            alert('일정이 성공적으로 저장되었습니다!');
        } catch (error) {
            alert('일정 저장에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <>
            <TimeGridContainer>
                <TimeGrid
                    title="개인 가능 시간"
                    startDate={startDate}
                    endDate={endDate}
                    startTime={startTime}
                    endTime={endTime}
                    timeCounts={{}}
                    selectedTimes={personalAvailable}
                    toggleTime={handleToggleTime}
                    isPersonal
                />
                <TimeGrid
                    title="회의 가능 시간"
                    startDate={startDate}
                    endDate={endDate}
                    startTime={startTime}
                    endTime={endTime}
                    timeCounts={timeCounts}
                    selectedTimes={[]}
                    toggleTime={(): void => {}}
                    isDisabled
                />
            </TimeGridContainer>

            <MemberContainer>
                <Title>참여 인원</Title>
                <MemberTable
                    data={memberData.map((member) => {
                        return {
                            organizationId: member.username,
                            username: member.username,
                            email: member.email,
                            type: member.type,
                            role: member.role,
                        };
                    })}
                />
            </MemberContainer>

            <ButtonContainer>
                <ModalButton text="취소" color="blue" onClick={onCancel} />
                <ModalButton
                    text="일정 조율 저장"
                    color="blue"
                    disabled={personalAvailable.length === 0}
                    onClick={async (): Promise<void> => {
                        try {
                            await handleSaveSchedule();
                            onCancel();
                        } catch (error) {
                            console.error('스케줄 저장에 실패했습니다.', error);
                        }
                    }}
                />
            </ButtonContainer>
        </>
    );
};

export default When2meet;
