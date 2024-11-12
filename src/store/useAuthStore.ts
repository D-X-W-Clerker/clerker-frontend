import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

// 상태 관리에서 사용될 타입 정의
interface AuthState {
    token: string | null; // 로그인한 사용자의 JWT 토큰
    user: { name: string; email: string } | null; // 로그인한 사용자 정보 (이름, 이메일)
    isAuthenticated: boolean; // 사용자가 로그인했는지 여부
    login: (
        authToken: string,
        authUser: { name: string; email: string },
    ) => void; // 로그인 함수
    logout: () => void; // 로그아웃 함수
    setUser: (
        authToken: string,
        authUser: { name: string; email: string },
    ) => void; // 사용자 정보 및 토큰을 상태에 설정하는 함수
}

// 브라우저 쿠키에서 토큰을 읽어오는 함수
const getTokenFromCookies = (): string | null => {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match ? match[2] : null;
};

// Zustand를 사용해 인증 상태를 관리하는 스토어 정의
export const useAuthStore = create<AuthState>()(
    persist(
        (set): AuthState => {
            const token = getTokenFromCookies();
            const isAuthenticated = Boolean(token);
            const user = token
                ? jwtDecode<{ name: string; email: string }>(token)
                : null;

            return {
                token, // 토큰 상태
                user, // 사용자 정보 상태
                isAuthenticated, // 로그인 여부 상태
                login: (authToken, authUser): void => {
                    // 로그인 시, 토큰과 사용자 정보를 상태에 설정
                    set({
                        token: authToken,
                        user: authUser,
                        isAuthenticated: true,
                    });
                },
                logout: (): void => {
                    // 로그아웃 시, 쿠키에서 'token'을 삭제하고 상태를 초기화
                    document.cookie =
                        'token=; path=/; max-age=0; samesite=strict';
                    set({ token: null, user: null, isAuthenticated: false });
                },
                setUser: (authToken, authUser): void => {
                    // 로그인한 사용자 정보 및 토큰을 상태에 설정
                    set({ token: authToken, user: authUser });
                },
            };
        },
        {
            // persist 미들웨어의 설정
            name: 'auth-storage', // 상태를 저장할 키값 (localStorage에 저장될 key)
            storage: createJSONStorage(() => {
                return localStorage;
            }), // JSON 형태로 localStorage 사용
        },
    ),
);
