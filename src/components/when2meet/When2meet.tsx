import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { TimeGrid, MemberTable, ModalButton } from '@components';
import { FlexCol, JustifyCenterRow, ItemsCenterEndRow } from '@styles';
import { ProjectMember, TimeMember } from '@types';
import { useAuthStore } from '@store';
import { getTimeTable, postTimeTable } from '@api';

// 인터페이스
interface When2meetProps {
    projectID: string;
    scheduleID: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    userInfo: ProjectMember;
    onCancel: () => void;
}

const TimeGridContainer = styled(JustifyCenterRow)`
    gap: 25px;
    overflow-x: auto;
    width: 100%;
`;

const MemberContainer = styled(FlexCol)`
    gap: 6px;
`;

const ButtonContainer = styled(ItemsCenterEndRow)`
    gap: 7px;
    margin-bottom: 30px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: var(--font-medium);
`;

const When2meet: React.FC<When2meetProps> = ({
    projectID,
    scheduleID,
    startDate,
    endDate,
    startTime,
    endTime,
    userInfo,
    onCancel,
}) => {
    const [personalAvailable, setPersonalAvailable] = useState<string[]>([]);
    const [memberData, setMemberData] = useState<TimeMember[]>([]);
    const { user } = useAuthStore();

    const myInfo: TimeMember = {
        username: user?.name || 'Unknown User',
        email: user?.email || 'unknown@example.com',
        role: userInfo?.role || '',
        type: userInfo?.type || '',
        timeTables: [],
    };

    // const { data: timeTableData } = useQuery(
    //     ['timeTable', scheduleID],
    //     () => {
    //         return getTimeTable(projectID || '', scheduleID);
    //     },
    //     {
    //         enabled: !!scheduleID, // scheduleId가 있을 때만 실행
    //         onSuccess: (data) => {
    //             console.log('timeTable 불러오기 성공:', data);

    //             // 데이터 매핑
    //             const members = data.map((member) => {
    //                 return {
    //                     username: member.username,
    //                     email: member.email,
    //                     type: member.type,
    //                     role: member.role,
    //                     timeTables: member.timeTables,
    //                 };
    //             });
    //             setMemberData(members);
    //         },
    //         onError: (error) => {
    //             console.error('timeTable 불러오기 실패:', error);
    //         },
    //     },
    // );

    const updateMyInfo = (times: string[]): TimeMember => {
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

            // await postTimeTable(scheduleID, { timeTable });
            alert('일정이 성공적으로 저장되었습니다!');
        } catch (error) {
            alert('일정 저장에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    const timeGridData = [
        {
            title: '개인 가능 시간',
            timeCounts: {},
            selectedTimes: personalAvailable,
            toggleTime: handleToggleTime,
            isPersonal: true,
            isDisabled: false,
            key: 'personal',
        },
        {
            title: '회의 가능 시간',
            timeCounts,
            selectedTimes: [],
            toggleTime: (): void => {},
            isPersonal: false,
            isDisabled: true,
            key: 'meeting',
        },
    ];

    const buttons = [
        {
            text: '취소',
            color: 'blue',
            onClick: onCancel,
            disabled: false,
            key: 'cancel-button',
        },
        {
            text: '일정 조율 저장',
            color: 'blue',
            onClick: async (): Promise<void> => {
                try {
                    await handleSaveSchedule();
                    onCancel();
                } catch (error) {
                    console.error('스케줄 저장에 실패했습니다.', error);
                }
            },
            disabled: personalAvailable.length === 0,
            key: 'save-button',
        },
    ];

    return (
        <>
            <TimeGridContainer>
                {timeGridData.map((grid) => {
                    return (
                        <TimeGrid
                            key={grid.key}
                            title={grid.title}
                            startDate={startDate}
                            endDate={endDate}
                            startTime={startTime}
                            endTime={endTime}
                            timeCounts={grid.timeCounts}
                            selectedTimes={grid.selectedTimes}
                            toggleTime={grid.toggleTime}
                            isPersonal={grid.isPersonal}
                            isDisabled={grid.isDisabled}
                        />
                    );
                })}
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
                {buttons.map((button) => {
                    return (
                        <ModalButton
                            key={button.key}
                            text={button.text}
                            color={button.color}
                            onClick={button.onClick}
                            disabled={button.disabled}
                        />
                    );
                })}
            </ButtonContainer>
        </>
    );
};

export default When2meet;
