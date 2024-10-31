import React from 'react';
import styled from 'styled-components';
import { ContentIcon } from '@assets';
import { ItemsCenterRow } from '@styles';

// -- 인터페이스 --
interface TabContainerProps {
    activeTab: string;
    onClickTab: (tab: string) => void;
}

// -- 스타일 컴포넌트 --
const Container = styled(ItemsCenterRow)`
    gap: 5px;
    margin-bottom: 15px;
`;

const TabButton = styled.div<{ $active: boolean }>`
    font-size: ${(props): string => {
        return props.$active ? '19px' : '15px';
    }};
    color: ${(props): string => {
        return props.$active
            ? 'var(--color-gray-600)'
            : 'var(--color-gray-500)';
    }};
    order: ${(props): number => {
        return props.$active ? -1 : 0;
    }};
    ${(props): string => {
        return props.$active
            ? `&::after {
          content: '|';
          margin-left: 5px;
        }`
            : '';
    }}
    cursor: pointer;
`;

const SvgImage = styled.img`
    width: 22px;
    height: 22px;
    padding-left: 3px;
    order: -2;
`;

const TabContainer: React.FC<TabContainerProps> = ({
    activeTab,
    onClickTab,
}) => {
    return (
        <Container>
            <SvgImage src={ContentIcon} />
            <TabButton
                $active={activeTab === 'meeting'}
                onClick={(): void => {
                    return onClickTab('meeting');
                }}
            >
                Meeting
            </TabButton>
            <TabButton
                $active={activeTab === 'schedule'}
                onClick={(): void => {
                    return onClickTab('schedule');
                }}
            >
                Schedule
            </TabButton>
        </Container>
    );
};

export default TabContainer;
