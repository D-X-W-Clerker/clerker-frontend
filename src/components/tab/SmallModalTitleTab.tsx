import React from 'react';
import styled from 'styled-components';
import { FolderIcon, ActiveLogoutIcon } from '@assets';
import { ItemsCenterRow } from '@styles';
import { TitleTabProps } from '@types';

// 스타일 컴포넌트
const Container = styled(ItemsCenterRow)`
    gap: 5px;
    font-size: 20px;
    background-color: var(--background-color);
`;

const IconImage = styled.img<{ $width: number; $height: number }>`
    width: ${(props): number => {
        return props.$width;
    }}px;
    height: ${(props): number => {
        return props.$height;
    }}px;
`;

// 메인 함수 컴포넌트
const SmallModalTitleTab: React.FC<TitleTabProps> = ({ type, title }) => {
    const isProject = type === 'project';

    return (
        <Container>
            <IconImage
                src={isProject ? FolderIcon : ActiveLogoutIcon}
                alt={isProject ? 'Folder Icon' : 'Logout Icon'}
                $width={isProject ? 24 : 21}
                $height={isProject ? 19 : 19}
            />
            {title}
        </Container>
    );
};

export default SmallModalTitleTab;
