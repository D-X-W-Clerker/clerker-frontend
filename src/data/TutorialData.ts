import React from 'react';

// -- 더미 데이터 --
export const TutorialData: {
  [key: string]: {
    id: number;
    title: string;
    subtitle: string;
    description: React.ReactNode;
    iconName: string; // 아이콘의 이름을 문자열로 저장
  }[];
} = {
  CreateProject: [
    {
      id: 1,
      title: '새로운 프로젝트를 생성하여 회의를 시작해보세요!',
      subtitle: '새로운 프로젝트 생성',
      description:
        '좌측 상단 메뉴 바에서 프로젝트 생성 버튼을 클릭하여 새로운 프로젝트를 생성할 수 있어요.\n' +
        '수신함에서 프로젝트와 관련된 알림을 확인할 수 있어요.\n' +
        '이름 변경, 프로필 사진 수정, 계정 삭제 등의 기능은 계정 설정 탭에서 이용 가능해요.\n' +
        '로그아웃은 좌측 하단 프로필에서 할 수 있어요.',
      iconName: 'SproutIcon',
    },
    {
      id: 2,
      title: '새로운 프로젝트를 생성하여 회의를 시작해보세요!',
      subtitle: '프로젝트 관리',
      description: '프로젝트를 관리하는 방법에 대해 알아보세요.',
      iconName: 'SproutIcon',
    },
  ],
  ScheduleMeeting: [
    {
      id: 1,
      title: '새로운 프로젝트를 생성하여 회의를 시작해보세요!',
      subtitle: '회의 일정 조율',
      description: '프로젝트의 회의 일정을 쉽게 조율할 수 있어요.',
      iconName: 'CalendarIcon',
    },
    {
      id: 2,
      title: '회의 일정을 편리하게 조율할 수 있어요',
      subtitle: '회의 일정 잡기',
      description: '빠르고 간편하게 회의 일정을 잡으세요.',
      iconName: 'CalendarIcon',
    },
  ],
  CreateMeeting: [
    {
      id: 1,
      title: '회의를 빠르고 간편하게! 모든 과정을 한번에 해결해요',
      subtitle: '회의 생성',
      description: '회의를 생성하는 방법에 대해 알아보세요.',
      iconName: 'WindIcon',
    },
    {
      id: 2,
      title: '회의를 빠르고 간편하게! 모든 과정을 한번에 해결해요',
      subtitle: '하위 폴더',
      description: '하위 폴더를 설정하여 프로젝트를 정리하세요.',
      iconName: 'WindIcon',
    },
  ],
  AISummarize: [
    {
      id: 1,
      title: '귀찮은 회의 정리, 이젠 모두 Clecker에서!',
      subtitle: 'AI 회의 요약',
      description: 'Clecker에서 AI로 회의 내용을 요약해보세요.',
      iconName: 'LightBulbIcon',
    },
    {
      id: 2,
      title: '귀찮은 회의 정리, 이젠 모두 Clecker에서!',
      subtitle: 'AI 회의 요약',
      description: 'Clecker에서 AI로 회의 내용을 요약해보세요.',
      iconName: 'LightBulbIcon',
    },
  ],
};

export default TutorialData;