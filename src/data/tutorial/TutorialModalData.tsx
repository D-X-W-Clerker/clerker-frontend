import React from 'react';

interface TutorialModalProps {
    type: string;
    text: React.ReactNode;
}

export const TutorialModalData: TutorialModalProps[] = [
    {
        type: 'CreateProject',
        text: (
            <>
                새로운 프로젝트를 생성하여
                <br />
                회의를 시작해보세요!
            </>
        ),
    },
    {
        type: 'ScheduleMeeting',
        text: (
            <>
                회의 일정을 편리하게
                <br />
                조율할 수 있어요
            </>
        ),
    },
    {
        type: 'CreateMeeting',
        text: (
            <>
                회의를 빠르고 간편하게!
                <br />
                모든 과정을 한번에 해결해요
            </>
        ),
    },
    {
        type: 'AISummarize',
        text: (
            <>
                귀찮은 회의 정리,
                <br />
                이젠 모두 Clerker에서!
            </>
        ),
    },
];

export default TutorialModalData;
