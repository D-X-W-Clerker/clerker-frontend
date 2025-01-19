import React from 'react';
import styled from 'styled-components';
import { SmallModalTitleTab, ModalButton } from '@components';
import { FlexCol, CenterRow, ItemsCenterEndRow } from '@styles';

// -- 인터페이스 --
interface SmallModalProps {
    type: string;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDelete?: boolean;
}

// -- 스타일 컴포넌트 --
const Backdrop = styled(CenterRow)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 1000;
`;

const Container = styled(FlexCol)`
    width: 100%;
    max-width: 360px;
    padding: 20px;
    gap: 50px;
    background-color: var(--background-color);
    border-radius: 7px;
`;

const MessageArea = styled(CenterRow)`
    font-size: 20px;
    color: var(--color-red);
`;

const ButtonArea = styled(ItemsCenterEndRow)`
    gap: 10px;
`;

const SmallModal: React.FC<SmallModalProps> = ({
    type,
    title,
    message,
    onConfirm,
    onCancel,
    isDelete = false,
}) => {
    const buttons = [
        {
            text: '취소',
            color: isDelete ? 'blue' : 'gray',
            onClick: onCancel,
            key: 'cancel-button',
        },
        {
            text: '확인',
            color: isDelete ? 'gray' : 'blue',
            onClick: onConfirm,
            key: 'confirm-button',
        },
    ];

    return (
        <Backdrop>
            <Container>
                <SmallModalTitleTab type={type} title={title} />
                <MessageArea>{message}</MessageArea>
                <ButtonArea>
                    {buttons.map((button) => {
                        return (
                            <ModalButton
                                key={button.key}
                                text={button.text}
                                color={button.color}
                                onClick={button.onClick}
                            />
                        );
                    })}
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default SmallModal;
