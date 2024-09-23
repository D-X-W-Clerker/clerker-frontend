// --인터페이스 생성 --
interface TutorialText {
  title: string;
  subtitle: string;
  description: string;
}

const TutorialTexts: { [key: string]: TutorialText } = {
  CreateProject: {
    title: '새로운 프로젝트를 생성하여 회의를 시작해보세요!',
    subtitle: '새로운 프로젝트 생성',
    description: `
      좌측 상단 메뉴 바에서 프로젝트 생성 버튼을 클릭하여 새로운 프로젝트를 생성할 수 있어요.
      수신함에서 프로젝트와 관련된 알림을 확인할 수 있어요.
      이름 변경, 프로필 사진 수정, 계정 삭제 등의 기능은 계정 설정 탭에서 이용 가능해요.
      로그아웃은 좌측 하단 프로필에서 할 수 있어요.
    `,
  },
  CreateProject2: {
    title: '새로운 프로젝트를 생성하여 회의를 시작해보세요!',
    subtitle: '프로젝트 관리',
    description: `
      
    `,
  },
  ScheduleMeeting: {
    title: '새로운 프로젝트를 생성하여 회의를 시작해보세요!',
    subtitle: '회의 일정 조율',
    description: `
  
    `,
  },
  ScheduleMeeting2: {
    title: '회의 일정을 편리하게 조율할 수 있어요',
    subtitle: '회의 일정 잡기',
    description: `
  
    `,
  },
  CreateMeeting: {
    title: '회의를 빠르고 간편하게! 모든 과정을 한번에 해결해요',
    subtitle: '회의 생성',
    description: `
  
    `,
  },
  CreateMeeting2: {
    title: '회의를 빠르고 간편하게! 모든 과정을 한번에 해결해요',
    subtitle: '하위 폴더',
    description: `
  
    `,
  },
  AISummarize: {
    title: '귀찮은 회의 정리, 이젠 모두 Clecker에서!',
    subtitle: 'AI 회의 요약',
    description: `
  
    `,
  },
};

export default TutorialTexts;
