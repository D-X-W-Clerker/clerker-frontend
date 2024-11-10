import { create } from 'zustand';

interface AuthState {
    token: string | null; // 로그인한 사용자의 JWT 토큰
    user: { name: string; email: string } | null; // 사용자 정보 (이름, 이메일)
    isAuthenticated: boolean; // 사용자가 로그인했는지 여부
    login: (
        token: string | null, // 로그인 시 받은 토큰
        user: { name: string; email: string }, // 로그인한 사용자 정보
    ) => void; // 로그인 함수
    logout: () => void; // 로그아웃 함수
    setUser: (
        token: string | null, // 사용자 정보와 함께 토큰을 설정하는 함수
        user: { name: string; email: string },
    ) => void;
}

// useAuthStore 상태 관리 훅을 zustand의 create로 생성
export const useAuthStore = create<AuthState>((set) => {
    return {
        token: null, // 초기 토큰 값은 null
        user: null, // 초기 사용자 정보는 null
        isAuthenticated: false, // 초기 인증 상태는 false (로그인되지 않음)
        login: (token, user): void => {
            // 로그인 시, 토큰과 사용자 정보를 상태에 저장
            set({ token, user, isAuthenticated: true });
        },
        logout: (): void => {
            // 로그아웃 시, 상태 초기화
            set({ token: null, user: null, isAuthenticated: false });
        },
        setUser: (token, user): void => {
            // 사용자 정보와 토큰을 상태에 설정
            set({ token, user });
        },
    };
});
