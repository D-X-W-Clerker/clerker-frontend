import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store';
import { ClerkerIcon } from '@assets';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import axios from 'axios';

interface CustomJwtPayload extends JwtPayload {
    username: string;
    email: string;
    isNewUser?: boolean;
}

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const { login } = useAuthStore();

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

                const { email, username, exp, isNewUser } = decoded;

                if (exp && Date.now() >= exp * 1000) {
                    console.error('토큰이 만료되었습니다.');
                    navigate('/');
                    return;
                }

                // 쿠키에 토큰 저장
                document.cookie = `token=${token}; path=/; max-age=3600; ${
                    window.location.protocol === 'https:' ? 'secure;' : ''
                } samesite=strict`;

                // 첫 로그인인 경우 바로 /home으로 이동
                if (isNewUser) {
                    console.log('첫 로그인입니다.');
                    login(token, {
                        name: username,
                        email,
                        profileImage: '', // 기본 프로필 이미지 설정
                    });
                    navigate('/home');
                    return;
                }

                // API 호출로 프로필 데이터 가져오기
                console.log('API 요청 시작');
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/auth/profile`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );

                console.log('API 응답 데이터:', response.data);

                const { profileURL, username: fetchedUsername } = response.data || {};

                // profileURL이 null인 경우 기본 이미지 설정
                const profileImage = profileURL || ClerkerIcon;

                if (!fetchedUsername) {
                    console.error('API 응답에 필요한 데이터가 없습니다.');
                    navigate('/home');
                    return;
                }

                // 상태 업데이트
                login(token, {
                    name: fetchedUsername,
                    email,
                    profileImage,
                });

                navigate('/home');
            } catch (error: any) {
                if (error.response && error.response.status === 301) {
                    console.error('리디렉션 문제가 발생했습니다.');
                } else {
                    console.error('로그인 처리 중 오류:', error.message);
                }
                navigate('/');
            }
        };

        handleLogin();
    }, [token, navigate, login]);

    return <p>구글 로그인 중입니다...</p>;
};

export default GoogleCallback;
