import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

// 상태 관리에서 사용될 타입 정의
interface AuthState {
    token: string | null; // 로그인한 사용자의 JWT 토큰
    user: { name: string; email: string } | null; // 로그인한 사용자 정보 (이름, 이메일)
    isAuthenticated: boolean; // 사용자가 로그인했는지 여부
    login: (
        authToken: string | null, // 로그인 시 받은 JWT 토큰
        authUser: { name: string; email: string }, // 로그인한 사용자 정보
    ) => void; // 로그인 함수
    logout: () => void; // 로그아웃 함수
    setUser: (
        authToken: string | null, // JWT 토큰
        authUser: { name: string; email: string }, // 사용자 정보
    ) => void; // 사용자 정보 및 토큰을 상태에 설정하는 함수
}

// 브라우저 쿠키에서 토큰을 읽어오는 함수
const getTokenFromCookies = (): string | null => {
    // 'token'이라는 이름의 쿠키 값을 추출
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match ? match[2] : null; // 토큰이 있으면 반환, 없으면 null 반환
};

// Zustand를 사용해 인증 상태를 관리하는 스토어 정의
export const useAuthStore = create<AuthState>((set) => {
    // 쿠키에서 JWT 토큰을 가져옴
    const token = getTokenFromCookies();

    // 토큰이 있으면 사용자가 로그인한 상태로 처리
    const isAuthenticated = Boolean(token);

    // 토큰이 있으면 디코딩하여 사용자 정보를 추출
    const user = token
        ? jwtDecode<{ name: string; email: string }>(token)
        : null;

    return {
        token, // 토큰 상태
        user, // 사용자 정보 상태
        isAuthenticated, // 로그인 여부 상태
        login: (authToken, authUser): void => {
            // 로그인 시, 토큰과 사용자 정보를 상태에 설정
            set({ token: authToken, user: authUser, isAuthenticated: true });
        },
        logout: (): void => {
            // 로그아웃 시, 쿠키에서 'token'을 삭제하고 상태를 초기화
            document.cookie = 'token=; path=/; max-age=0; samesite=strict';
            set({ token: null, user: null, isAuthenticated: false });
        },
        setUser: (authToken, authUser): void => {
            // 로그인한 사용자 정보 및 토큰을 상태에 설정
            set({ token: authToken, user: authUser });
        },
    };
});
