import React from 'react';
import styled from 'styled-components';
import { FolderIcon, ActiveSettingIcon, CheckIcon } from '@assets';
import { ItemsCenterRow } from '@styles';
import { TitleTabProps } from '@types';

// 인터페이스
interface LargeModalTitleTabProps extends TitleTabProps {
    type: 'project' | 'accountSetting' | 'scheduleCheck';
}

// 스타일 컴포넌트
const Container = styled(ItemsCenterRow)`
    gap: 5px;
    font-size: 24px;
    background-color: var(--background-color);
    user-select: none;
`;

const IconImage = styled.img<{ $width: number; $height: number }>`
    width: ${(props) => {
        return props.$width;
    }}px;
    height: ${(props) => {
        return props.$height;
    }}px;
`;

// 객체 상수 데이터
const iconConfig = {
    project: {
        src: FolderIcon,
        alt: 'Folder Icon',
        width: 30,
        height: 23,
    },
    accountSetting: {
        src: ActiveSettingIcon,
        alt: 'Setting Icon',
        width: 24,
        height: 24,
    },
    scheduleCheck: {
        src: CheckIcon,
        alt: 'Check Icon',
        width: 26,
        height: 20,
    },
};

// 메인 함수 컴포넌트
const LargeModalTitleTab: React.FC<LargeModalTitleTabProps> = ({
    type,
    title,
}) => {
    const { src, alt, width, height } = iconConfig[type];

    return (
        <Container>
            <IconImage src={src} alt={alt} $width={width} $height={height} />
            {title}
        </Container>
    );
};

export default LargeModalTitleTab;
