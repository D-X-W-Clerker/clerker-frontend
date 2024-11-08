import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store';

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get('name') as string;
    const email = searchParams.get('email') as string;
    const token = new URLSearchParams(window.location.search).get('token');
    const { login } = useAuthStore();

    useEffect(() => {
        if (token) {
            // 토큰과 사용자 정보를 함께 로그인 처리
            login(token, { name, email });
            navigate('/');
        } else {
            navigate('/'); // 온보딩 페이지로 리디렉션
        }
    }, [token, navigate, login]); // 의존성 배열

    return <p>구글 로그인 중입니다...</p>;
};

export default GoogleCallback;
