import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store';
import { jwtDecode, JwtPayload } from 'jwt-decode';

// JWT 토큰의 커스텀 페이로드 정의 (username, email)
interface CustomJwtPayload extends JwtPayload {
    username: string;
    email: string;
}

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token'); // 쿼리 파라미터에서 'token' 값 추출
    const { login } = useAuthStore();

    useEffect(() => {
        const handleLogin = async (): Promise<void> => {
            // 토큰이 없으면 로그인 실패
            if (!token) {
                console.log('토큰이 없습니다.');
                navigate('/');
                return;
            }

            try {
                console.log('토큰 디코딩 시도');
                // JWT 토큰을 디코딩하여 페이로드 추출
                const decoded = jwtDecode<CustomJwtPayload>(token);
                console.log('디코딩된 토큰:', decoded);
                const { email, username, exp } = decoded; // 토큰에서 이메일, 사용자 이름, 만료 시간 추출

                // 토큰이 만료되었으면 로그인 실패 처리
                if (exp && Date.now() >= exp * 1000) {
                    console.error('토큰이 만료되었습니다.');
                    navigate('/');
                    return;
                }

                console.log('로그인 처리');
                // 로그인 상태 업데이트 (zustand 상태 관리)
                login(token, { name: username, email });

                // 쿠키에 토큰 저장 (1시간 만료, HTTPS일 경우 secure 옵션 추가)
                document.cookie = `token=${token}; path=/; max-age=3600; ${
                    window.location.protocol === 'https:' ? 'secure;' : ''
                } samesite=strict`;

                setTimeout(() => {
                    navigate('/home');
                }, 0);
            } catch (error) {
                console.error('토큰 디코딩 실패:', error);
                navigate('/');
            }
        };

        handleLogin();
    }, [token, navigate, login]); // token, navigate, login이 변경될 때마다 실행

    return <p>구글 로그인 중입니다...</p>;
};

export default GoogleCallback;
