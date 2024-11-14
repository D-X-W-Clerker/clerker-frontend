import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    user: { name: string; email: string; profileImage: string } | null;
    isAuthenticated: boolean;
    login: (
        authToken: string,
        authUser: { name: string; email: string; profileImage: string },
    ) => void;
    logout: () => void;
    setUser: (
        authToken: string,
        authUser: { name: string; email: string; profileImage: string },
    ) => void;
}

const getTokenFromCookies = (): string | null => {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match ? match[2] : null;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set): AuthState => {
            const token = getTokenFromCookies();
            const isAuthenticated = Boolean(token);

            return {
                token,
                user: null,
                isAuthenticated,
                login: (authToken, authUser): void => {
                    set({
                        token: authToken,
                        user: authUser,
                        isAuthenticated: true,
                    });
                },
                logout: (): void => {
                    document.cookie =
                        'token=; path=/; max-age=0; samesite=strict';
                    set({ token: null, user: null, isAuthenticated: false });
                },
                setUser: (authToken, authUser): void => {
                    document.cookie = `token=${authToken}; path=/; samesite=strict`;
                    set({
                        token: authToken,
                        user: authUser,
                        isAuthenticated: true,
                    });
                },
            };
        },
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
