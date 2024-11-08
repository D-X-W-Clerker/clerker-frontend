import React from 'react';
import styled from 'styled-components';
import { FolderIcon, FileIcon } from '@assets';
import { ItemsCenterRow, ItemsCenterSpaceRow } from '@styles';

// -- 인터페이스 --
interface HeaderProps {
    type: string;
    title: string;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterSpaceRow)`
    height: 33px;
    margin-top: 44px;
    background-color: var(--background-color);
`;

const TitleArea = styled(ItemsCenterRow)`
    gap: 12px;
    font-size: 26px;
`;

const IconImage = styled.img<{ $width: number; $height: number }>`
    width: ${(props): number => {
        return props.$width;
    }}px;
    height: ${(props): number => {
        return props.$height;
    }}px;
    cursor: pointer;
`;

const TitleTab: React.FC<HeaderProps> = ({ type, title }) => {
    const isProject = type === 'project';

    return (
        <Container>
            <TitleArea>
                <IconImage
                    src={isProject ? FolderIcon : FileIcon}
                    alt={isProject ? 'Folder Icon' : 'File Icon'}
                    $width={isProject ? 34 : 28}
                    $height={isProject ? 26 : 33}
                />
                {title}
            </TitleArea>
        </Container>
    );
};

export default TitleTab;
