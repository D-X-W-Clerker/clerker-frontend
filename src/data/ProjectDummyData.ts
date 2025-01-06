// 인터페이스 정의
export interface MeetingData {
    meetingId: string;
    name: string;
    startDate: string;
    createdAt: string;
    isEnded: boolean;
    url?: string;
    domain: string; // 도메인 추가
}

export interface ScheduleData {
    scheduleId: string;
    scheduleName: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    isEnded: boolean;
}

export interface Member {
    organizationId: string;
    username: string;
    email: string;
    type: string | null;
    role: string;
}

export interface ProjectInfo {
    projectName: string;
    members: Member[];
}

// 프로젝트 정보 더미 데이터
export const projectInfo: ProjectInfo = {
    projectName: 'Example Project',
    members: [
        {
            organizationId: '1',
            username: 'Example User',
            email: 'user@example.com',
            type: 'FE',
            role: 'Member',
        },
    ],
};

// 미팅 데이터 더미 데이터
export const dummyMeetingData: MeetingData[] = [
    {
        meetingId: 'm1',
        name: '프로젝트 킥오프 미팅',
        startDate: '2025-01-01T10:00:00',
        createdAt: '2025-01-01T09:00:00',
        isEnded: false,
        url: 'https://example.com/meeting/m1',
        domain: 'example.com',
    },
    {
        meetingId: 'm2',
        name: '기술 리뷰 미팅',
        startDate: '2025-01-02T14:00:00',
        createdAt: '2025-01-01T15:00:00',
        isEnded: true,
        url: 'https://example.com/meeting/m2',
        domain: 'example.com',
    },
];

// 스케줄 데이터 더미 데이터
export const dummyScheduleData: ScheduleData[] = [
    {
        scheduleId: 's1',
        scheduleName: '팀 전체 회의 1',
        startDate: '2025-01-03T09:00:00',
        endDate: '2025-01-03T11:00:00',
        startTime: '09:00',
        endTime: '11:00',
        createdAt: '2025-01-02T12:00:00',
        isEnded: false,
    },
    {
        scheduleId: 's2',
        scheduleName: '팀 전체 회의 2',
        startDate: '2025-01-04T15:00:00',
        endDate: '2025-01-04T16:00:00',
        startTime: '15:00',
        endTime: '16:00',
        createdAt: '2025-01-03T10:00:00',
        isEnded: true,
    },
];
