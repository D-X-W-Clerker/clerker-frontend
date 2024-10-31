import React from 'react';
import styled from 'styled-components';
import { InviteDeleteIcon } from '@assets';
import { ItemsCenterSpaceRow } from '@styles';

interface MemberInviteItemProps {
    email: string;
    onClick: () => void;
}

const Container = styled(ItemsCenterSpaceRow)`
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
    background-color: var(--background-color);
`;

const Text = styled.div`
    font-size: 14px;
`;

const SvgImage = styled.img`
    width: 9px;
    height: 9px;
    cursor: pointer;
`;

const MemberInviteItem: React.FC<MemberInviteItemProps> = ({
    email,
    onClick,
}) => {
    return (
        <Container>
            <Text>{email}</Text>
            <SvgImage src={InviteDeleteIcon} onClick={onClick} />
        </Container>
    );
};

export default MemberInviteItem;
