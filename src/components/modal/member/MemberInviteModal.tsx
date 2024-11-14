import React, { useState } from 'react';
import styled from 'styled-components';
import {
    ModalButton,
    ProjectInput,
    LargeModalTitleTab,
    MemberInviteItem,
} from '@components';
import {
    CenterRow,
    FlexCol,
    ItemsCenterStartRow,
    ItemsCenterEndRow,
} from '@styles';

// -- 인터페이스 --
interface MemberInviteModalProps {
    projectId: string;
    projectName: string;
    onCancel: () => void;
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
    max-width: 520px;
    height: 350px;
    box-sizing: border-box;
    gap: 20px;
    padding: 20px 20px;
    background-color: var(--background-color);
    border-radius: 10px;
`;

const ContentArea = styled(FlexCol)`
    flex: 1;
    gap: 10px;
`;

const UserListArea = styled(FlexCol)`
    gap: 10px;
    overflow-y: auto;
    max-height: 150px;
`;

const ButtonArea = styled(ItemsCenterEndRow)`
    gap: 10px;
`;

const Text = styled(ItemsCenterStartRow)`
    font-size: 10px;
    color: var(--color-gray-600);
    padding: 0 10px;
`;

const MemberInviteModal: React.FC<MemberInviteModalProps> = ({
    projectId,
    projectName,
    onCancel,
}) => {
    const [user, setUsers] = useState<string>('');
    const [emails, setEmails] = useState<string[]>([]);

    const onAddEmail = (): void => {
        if (user) {
            setEmails((prevUsers) => {
                return [...prevUsers, user];
            });
            setUsers(''); // 이메일 입력 초기화
        }
    };

    const onRemoveEmail = (emailToRemove: string): void => {
        setEmails(
            emails.filter((email) => {
                return email !== emailToRemove;
            }),
        );
    };

    const onClickConfirm = (): void => {
        console.log('emails', emails);
        alert('사용자 초대 완료');
        onCancel();
    };

    return (
        <Backdrop>
            <Container>
                <LargeModalTitleTab type="project" title={projectName} />
                <ContentArea>
                    <ProjectInput
                        type="invite"
                        value={user}
                        onChange={(e): void => {
                            return setUsers(e.target.value);
                        }}
                        placeholder="이메일 입력"
                        onClick={onAddEmail}
                    />
                    <Text>초대된 사용자</Text>
                    <UserListArea>
                        {emails.map((email) => {
                            return (
                                <MemberInviteItem
                                    key={email}
                                    email={email}
                                    onClick={(): void => {
                                        return onRemoveEmail(email);
                                    }}
                                />
                            );
                        })}
                    </UserListArea>
                </ContentArea>
                <ButtonArea>
                    <ModalButton text="취소" color="gray" onClick={onCancel} />
                    <ModalButton
                        text="완료"
                        color="blue"
                        onClick={onClickConfirm}
                    />
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default MemberInviteModal;
