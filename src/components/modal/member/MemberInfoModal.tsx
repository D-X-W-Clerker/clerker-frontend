import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { MemberIcon } from '@assets';
import { ModalButton, LargeModalTitleTab, MemberEditTable } from '@components';
import {
    CenterRow,
    FlexCol,
    ItemsCenterRow,
    ItemsCenterStartRow,
    ItemsCenterEndRow,
} from '@styles';
import { modifyProject } from '../../../apis';

// -- 인터페이스 --
interface Member {
    organizationId: string;
    username: string;
    email: string;
    type: string | null;
    role: string;
}

interface MemberInfoModalProps {
    projectId: string;
    projectName: string;
    memberData: Member[];
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

const TextArea = styled(ItemsCenterRow)`
    padding: 0 5px;
    gap: 5px;
`;

const MemberTableArea = styled(FlexCol)`
    overflow-y: auto;
    max-height: 170px;
`;

const ButtonArea = styled(ItemsCenterEndRow)`
    gap: 10px;
`;

const Text = styled(ItemsCenterStartRow)`
    font-size: 14px;
    color: var(--color-gray-600);
`;

const SvgImage = styled.img`
    width: 17px;
    height: 17px;
`;

const MemberInfoModal: React.FC<MemberInfoModalProps> = ({
    projectId,
    projectName,
    memberData,
    onCancel,
}) => {
    const [members, setMembers] = useState(memberData);
    const [originalMembers] = useState(memberData); // 원래 멤버 목록

    const modifyMutation = useMutation(
        (data: {
            projectID: string;
            projectName: string;
            members: Member[];
        }) => {
            return modifyProject(data.projectID, {
                projectName: data.projectName,
                members: data.members.map((member) => {
                    return {
                        organizationId: member.organizationId,
                        username: member.username,
                        email: member.email,
                        role: member.role,
                        type: member.type || '',
                    };
                }),
            });
        },
        {
            onSuccess: () => {
                alert('멤버 정보가 성공적으로 수정되었습니다.');
                onCancel();
            },
            onError: (error) => {
                console.error('멤버 정보 수정 중 오류 발생:', error);
            },
        },
    );

    // onRoleChange 함수에 useCallback을 사용하여 무한 렌더링 방지
    const onChangeType = useCallback((id: string, newType: string): void => {
        setMembers((prevMembers) => {
            return prevMembers.map((member) => {
                if (member.organizationId === id && member.type !== newType) {
                    return { ...member, type: newType };
                }
                return member;
            });
        });
    }, []);

    // Confirm 버튼 클릭 시 변경된 멤버의 정보를 콘솔에 찍기
    const onClickConfirm = (): void => {
        // type이 변경된 멤버만 필터링
        const changedMembers = members.filter((member, index) => {
            return member.type !== originalMembers[index].type;
        });

        modifyMutation.mutate({
            projectID: projectId,
            projectName,
            members: changedMembers,
        });
    };

    return (
        <Backdrop>
            <Container>
                <LargeModalTitleTab type="project" title={projectName} />
                <ContentArea>
                    <TextArea>
                        <SvgImage src={MemberIcon} />
                        <Text>Member</Text>
                    </TextArea>
                    <MemberTableArea>
                        <MemberEditTable
                            data={members}
                            onChangeType={onChangeType}
                        />
                    </MemberTableArea>
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

export default MemberInfoModal;
