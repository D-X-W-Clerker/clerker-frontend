import React from 'react';
import styled from 'styled-components';
import { LargeModalTitleTab, ModalButton } from '@components';
import { CenterRow, FlexCol, ItemsCenterEndRow } from '@styles';
import CheckIcon from '../../../assets/action/check/Check.svg';

interface ScheduleCheckModalProps {
    projectId: string;
    onConfirm: () => void;
}

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
    max-width: 520px;
    height: 300px;
    box-sizing: border-box;
    gap: 20px;
    padding: 20px 20px;
    background-color: var(--background-color);
    border-radius: 10px;
`;

const ContentArea = styled(FlexCol)`
    gap: 10px;
    align-items: center;
`;

const CheckIconImage = styled.img`
    width: 50px;
    height: 50px;
`;

const ButtonArea = styled(ItemsCenterEndRow)`
    gap: 10px;
`;

const ScheduleCheckModal: React.FC<ScheduleCheckModalProps> = ({
    projectId,
    onConfirm,
}) => {
    return (
        <Backdrop>
            <Container>
                <LargeModalTitleTab type="project" title="일정 확인" />
                <ContentArea>
                    <CheckIconImage src={CheckIcon} alt="Check Icon" />
                </ContentArea>
                <ButtonArea>
                    <ModalButton text="확인" color="blue" onClick={onConfirm} />
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default ScheduleCheckModal;
