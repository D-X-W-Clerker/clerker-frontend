import React from 'react';
import styled from 'styled-components';
import { FolderIcon, ActiveSettingIcon } from '@assets';
import CheckIcon from '../../assets/action/check/Check.svg'; // CheckIcon 경로 확인 필요
import { ItemsCenterRow } from '@styles';

interface LargeModalTitleTabProps {
    type: string;
    title: string;
}

const Container = styled(ItemsCenterRow)`
    gap: 5px;
    font-size: 24px;
    background-color: var(--background-color);
    user-select: none;
`;

const IconImage = styled.img<{ $width: number; $height: number }>`
    width: ${(props): number => props.$width}px;
    height: ${(props): number => props.$height}px;
`;

const LargeModalTitleTab: React.FC<LargeModalTitleTabProps> = ({
    type,
    title,
}) => {
    let iconSrc;
    let altText;
    let width;
    let height;

    if (type === 'project') {
        iconSrc = FolderIcon;
        altText = 'Folder Icon';
        width = 30;
        height = 23;
    } else if (type === 'scheduleCheck') {
        iconSrc = CheckIcon;
        altText = 'Check Icon';
        width = 30;
        height = 30;
    } else {
        iconSrc = ActiveSettingIcon;
        altText = 'Setting Icon';
        width = 24;
        height = 24;
    }

    return (
        <Container>
            <IconImage
                src={iconSrc}
                alt={altText}
                $width={width}
                $height={height}
            />
            {title}
        </Container>
    );
};

export default LargeModalTitleTab;
