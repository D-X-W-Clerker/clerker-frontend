// Header.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Clerker, GoogleIcon } from '@assets';
import { ItemsCenterRow } from '@styles';
import { useFolderStore } from '@store';

const Container = styled(ItemsCenterRow)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    padding-left: 130px;
    background-color: var(--background-color);
    border-bottom: 0.5px solid var(--color-gray-300);
    z-index: 1000;
`;

const IconImage = styled.img`
    width: 90px;
    height: 30px;
`;

const GoogleIconImage = styled.img`
    width: 140px;
    height: 30px;
    position: absolute;
    right: 250px;
    cursor: pointer;
`;

interface HeaderProps {
    showGoogleIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showGoogleIcon }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setSelectedId, toggleFolderOpen, openFolderIds } = useFolderStore();

    const onGoogleLoginClick = (): void => {
        window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/google`;
    };

    const onClickLogo = (): void => {
        if (location.pathname !== '/') {
            setSelectedId(null);
            openFolderIds.forEach((id) => {
                toggleFolderOpen(id);
            });
            navigate('/home');
        }
    };

    return (
        <Container onClick={onClickLogo}>
            <IconImage src={Clerker} />
            {showGoogleIcon && (
                <GoogleIconImage
                    src={GoogleIcon}
                    onClick={onGoogleLoginClick}
                />
            )}{' '}
            {/* 조건부로 GoogleIcon 렌더링 */}
        </Container>
    );
};

export default Header;
