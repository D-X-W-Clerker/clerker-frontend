import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store'; // zustand 상태 훅
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
    username: string;
    email: string;
}

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const { login } = useAuthStore(); // login 함수 가져오기

    useEffect(() => {
        const handleLogin = async (): Promise<void> => {
            if (!token) {
                console.log('토큰이 없습니다.');
                navigate('/');
                return;
            }

            try {
                console.log('토큰 디코딩 시도');
                const decoded = jwtDecode<CustomJwtPayload>(token);
                console.log('디코딩된 토큰:', decoded);
                const { email, username, exp } = decoded;

                if (exp && Date.now() >= exp * 1000) {
                    console.error('토큰이 만료되었습니다.');
                    navigate('/');
                    return;
                }

                console.log('로그인 처리');
                // 상태 관리에서 login 함수 호출 (이때 상태 업데이트)
                login(token, { name: username, email });

                // 로그인 후 페이지 리디렉션
                setTimeout(() => {
                    navigate('/home'); // 상태 업데이트가 완료된 후에 navigate 호출
                }, 0); // 상태 업데이트 후 바로 호출되도록 비동기적으로 설정
            } catch (error) {
                console.error('토큰 디코딩 실패:', error);
                navigate('/');
            }
        };

        handleLogin();
    }, [token, navigate, login]);

    return <p>구글 로그인 중입니다...</p>;
};

export default GoogleCallback;
