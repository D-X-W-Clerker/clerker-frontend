import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store';
import {jwtDecode, JwtPayload } from 'jwt-decode';
import axios from 'axios';

// JWT 토큰의 커스텀 페이로드 정의
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
                const { email, username, exp } = decoded;

                if (exp && Date.now() >= exp * 1000) {
                    console.error('토큰이 만료되었습니다.');
                    navigate('/');
                    return;
                }

                // 쿠키에 토큰 저장
                document.cookie = `token=${token}; path=/; max-age=3600; ${
                    window.location.protocol === 'https:' ? 'secure;' : ''
                } samesite=strict`;

                // 추가 API 호출로 프로필 데이터 가져오기
                const response = await axios.patch(
                    `${process.env.REACT_APP_BASE_URL}/api/auth/profile`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );

                const { profileURL } = response.data;
                console.log('프로필 데이터 가져오기 성공:', response.data);

                // 상태 업데이트
                login(token, { name: username, email, profileImage: profileURL });
                setTimeout(() => navigate('/home'), 0);
            } catch (error) {
                console.error('로그인 처리 중 오류:', error);
                navigate('/');
            }
        };

        handleLogin();
    }, [token, navigate, login]);

    return <p>구글 로그인 중입니다...</p>;
};

export default GoogleCallback;
