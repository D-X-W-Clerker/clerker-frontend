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
import { useMutation } from 'react-query';
import { inviteMember } from '../../../apis';

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

    const { mutate: invite, isLoading } = useMutation(
        (data: { projectId: string; emails: string[] }) => {
            return inviteMember(data.projectId, { emails: data.emails });
        },
        {
            onSuccess: () => {
                alert('사용자 초대가 완료되었습니다.');
                setEmails([]); // 이메일 목록 초기화
                onCancel();
            },
            onError: (error) => {
                console.error('멤버 초대에 실패했습니다:', error);
                alert('멤버 초대에 실패했습니다. 다시 시도해주세요.');
            },
        },
    );

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
        if (emails.length === 0) {
            alert('초대할 이메일을 추가해주세요.');
            return;
        }
        invite({ projectId, emails });
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
                    <ModalButton
                        text="취소"
                        color="gray"
                        onClick={onCancel}
                        disabled={isLoading}
                    />
                    <ModalButton
                        text="완료"
                        color="blue"
                        onClick={onClickConfirm}
                        disabled={isLoading || emails.length === 0}
                    />
                </ButtonArea>
            </Container>
        </Backdrop>
    );
};

export default MemberInviteModal;
