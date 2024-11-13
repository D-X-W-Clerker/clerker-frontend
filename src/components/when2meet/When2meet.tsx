import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TimeGrid, MemberTable, ModalButton } from '@components';
import { FlexCol, JustifyCenterRow, ItemsCenterEndRow } from '@styles';
import { postTimeTable } from '../../apis';

// 타입 정의
interface TimeTable {
    time: string;
}

interface Member {
    username: string;
    email: string;
    type: string;
    role: string;
    timeTables: TimeTable[];
}

interface EventData {
    times: string[];
    dates: string[];
    members: Member[];
}

interface When2meetProps {
    scheduleID: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    onCancel: () => void;
}

const TimeGridContainer = styled(JustifyCenterRow)`
    gap: 25px;
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
`;

const myInfo: Member = {
    username: '황현진',
    email: 'jjini6530@kookmin.ac.kr',
    role: 'member',
    type: 'FE',
    timeTables: [],
};

const fetchEventData = async (): Promise<EventData> => {
    return {
        times: [
            '0800',
            '0830',
            '0900',
            '0930',
            '1000',
            '1030',
            '1100',
            '1130',
            '1200',
            '1230',
            '1300',
            '1330',
            '1400',
            '1430',
            '1500',
            '1530',
            '1600',
            '1630',
            '1700',
            '1730',
            '1800',
            '1830',
            '1900',
            '1930',
            '2000',
            '2030',
            '2100',
            '2130',
        ],
        dates: ['1006', '1007', '1008', '1009', '1010'],
        members: [
            {
                username: '류건',
                email: 'sksnsfbjrjs@kookmin.ac.kr',
                role: 'owner',
                type: 'BE',
                timeTables: [
                    { time: '2024-10-06 16:00:00' },
                    { time: '2024-10-06 16:30:00' },
                    { time: '2024-10-06 17:00:00' },
                    { time: '2024-10-07 16:00:00' },
                    { time: '2024-10-07 16:30:00' },
                    { time: '2024-10-07 17:00:00' },
                ],
            },
            {
                username: '신진욱',
                email: 'jinwook2765@kookmin.ac.kr',
                role: 'member',
                type: 'FE',
                timeTables: [
                    { time: '2024-10-07 16:00:00' },
                    { time: '2024-10-07 16:30:00' },
                    { time: '2024-10-07 17:00:00' },
                ],
            },
        ],
    };
};

const When2meet: React.FC<When2meetProps> = ({
    scheduleID,
    startDate,
    endDate,
    startTime,
    endTime,
    onCancel,
}) => {
    const [personalAvailable, setPersonalAvailable] = useState<string[]>([]);
    const [memberData, setMemberData] = useState<Member[]>([]);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [availableDates, setAvailableDates] = useState<string[]>([]);

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
        const loadEventData = async (): Promise<void> => {
            const { times, dates, members } = await fetchEventData();
            setAvailableTimes(times);
            setAvailableDates(dates);
            setMemberData(members);
        };
        loadEventData();
    }, []);

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
            const scheduleID = 123; // 예제 스케줄 ID (실제 ID로 교체 필요)
            await postTimeTable(scheduleID, { timeTable: personalAvailable });
            alert('일정이 성공적으로 저장되었습니다!');
        } catch (error) {
            console.log(personalAvailable);
            alert('일정 저장에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <>
            <TimeGridContainer>
                <TimeGrid
                    title="개인 가능 시간"
                    times={availableTimes}
                    dates={availableDates}
                    timeCounts={{}}
                    selectedTimes={personalAvailable}
                    toggleTime={handleToggleTime}
                    isPersonal
                />
                <TimeGrid
                    title="회의 가능 시간"
                    times={availableTimes}
                    dates={availableDates}
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
                    onClick={handleSaveSchedule}
                />
            </ButtonContainer>
        </>
    );
};

export default When2meet;
