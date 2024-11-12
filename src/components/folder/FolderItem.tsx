import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
    FileIcon,
    DownArrowIcon,
    RightArrowIcon,
    FolderIcon,
    MoreIcon,
} from '@assets';
import { FolderModal, SmallModal } from '@components';
import { CenterRow, ItemsCenterRow } from '@styles';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProject, exitProject, modifyProject } from '../../apis';

// -- 인터페이스 --
interface FolderItemProps {
    id: string;
    name: string;
    isOpen?: boolean;
    isSelected: boolean;
    onClickToggle?: () => void;
    onClickNav: () => void;
    isSubFolder?: boolean;
}

interface Member {
    organizationId: number;
    role: 'OWNER' | 'MEMBER' | 'ADMIN';
    type: string;
}

interface ProjectRequest {
    projectName: string;
    members: Member[];
}

const Container = styled(ItemsCenterRow)<{
    $isSelected: boolean;
    $isSubFolder?: boolean;
    $onClickToggle?: () => void;
}>`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    gap: 4px;
    padding: 4px 3px 4px
        ${(props): string => {
            if (!props.$onClickToggle)
                return props.$isSubFolder ? '38px' : '20px'; // 파일에 대한 padding
            return props.$isSubFolder ? '20px' : '3px'; // 폴더에 대한 padding
        }};
    border-radius: 7px;
    cursor: pointer;
    user-select: none;
    color: var(--color-gray-600);
    background-color: ${(props): string => {
        return props.$isSelected ? 'var(--color-gray-50)' : 'transparent';
    }};

    &:hover {
        background-color: var(--color-gray-50);
    }
`;

const MoreIconArea = styled(CenterRow)<{
    $showModal: boolean;
    $isEditing: boolean;
}>`
    position: absolute;
    right: 3px;
    top: 58%;
    transform: translateY(-50%);
    cursor: pointer;
    display: ${(props): string => {
        if (props.$isEditing) return 'none';
        return props.$showModal ? 'block' : 'none';
    }};

    ${Container}:hover & {
        display: ${(props): string => {
            return props.$isEditing ? 'none' : 'block';
        }};
    }
`;

const Title = styled(ItemsCenterRow)<{
    $isSubFolder: boolean;
    $hasToggle: boolean;
}>`
    display: block;
    flex: 1;
    min-width: 0;
    font-weight: var(--font-normal);
    color: var(--color-gray-600);
    font-size: 12.6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    max-width: ${(props): string => {
        if (!props.$hasToggle) {
            // 파일일 경우
            return props.$isSubFolder
                ? 'calc(100% - 20x)'
                : 'calc(100% - 23px)';
        }
        return props.$isSubFolder ? 'calc(100% - 20px)' : 'calc(100% - 30px)';
    }};

    ${Container}:hover & {
        max-width: ${(props): string => {
            if (!props.$hasToggle) {
                // 파일일 경우
                return props.$isSubFolder
                    ? 'calc(100% - 33px)'
                    : 'calc(100% - 35px)';
            }
            return props.$isSubFolder
                ? 'calc(100% - 55px)'
                : 'calc(100% - 60px)';
        }};
    }
`;

const TitleInput = styled.input`
    min-width: 0;
    padding-right: 3px;
    font-size: 12.6px;
    font-weight: var(--font-normal);
    color: var(--color-gray-600);
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const SvgImage = styled.img`
    width: 14px;
    height: 14px;
    flex-shrink: 0;
`;

const MoreIconImage = styled(SvgImage)`
    padding: 1px 2px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: var(--color-gray-100);
    }
`;

const FolderModalArea = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
`;

const Backdrop = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

const FolderItem: React.FC<FolderItemProps> = ({
    id,
    name,
    isOpen = false,
    isSelected,
    onClickToggle,
    onClickNav,
    isSubFolder = false,
}) => {
    const [showModal, setShowModal] = useState(false); // More 모달 관리 상태
    const [showSmallModal, setShowSmallModal] = useState(false);
    const [smallModalType, setSmallModalType] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false); // 이름 변경 모드 상태
    const [folderName, setFolderName] = useState(name); // 폴더 이름 상태
    const modalRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();

    // 폴더 기능 모달 토글 함수
    const onClickMoreIcon = (): void => {
        setShowModal((prev) => {
            return !prev;
        });
    };

    const modifyMutation = useMutation(
        ({ projectID, data }: { projectID: string; data: ProjectRequest }) => {
            return modifyProject(projectID, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('projects');
                alert('프로젝트명이 성공적으로 수정되었습니다.');
            },
            onError: (error) => {
                console.error('프로젝트 수정 실패:', error);
                alert('프로젝트명 수정에 실패했습니다.');
            },
        },
    );

    // 이름 변경 버튼 함수
    const onClickRename = (): void => {
        setIsEditing(true);
        setShowModal(false);
    };

    const deleteMutation = useMutation(deleteProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('projects'); // 'projects' 데이터를 새로고침
            alert('프로젝트가 성공적으로 삭제되었습니다.');
        },
        onError: (error) => {
            console.error('프로젝트 삭제 실패:', error);
            alert('프로젝트 삭제에 실패했습니다.');
        },
    });

    const onConfirmDelete = (): void => {
        setShowSmallModal(false);
        deleteMutation.mutate(id);
    };

    // 프로젝트 삭제 버튼 함수
    const onClickDelete = (): void => {
        setSmallModalType('delete');
        setShowSmallModal(true);
        setShowModal(false);
    };

    const exitMutation = useMutation(exitProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('projects'); // 'projects' 데이터를 새로고침
            alert('프로젝트를 성공적으로 나가셨습니다.');
        },
        onError: (error) => {
            console.error('프로젝트 나가기 실패:', error);
            alert('프로젝트 나가기에 실패했습니다.');
        },
    });

    const onConfirmExit = (): void => {
        setShowSmallModal(false);
        exitMutation.mutate(id);
    };

    // 프로젝트 나가기 버튼 함수
    const onClickLeave = (): void => {
        setSmallModalType('leave');
        setShowSmallModal(true);
        setShowModal(false);
    };

    // 취소 버튼 함수
    const onClickCancel = (): void => {
        setShowSmallModal(false);
        setSmallModalType(null);
    };

    // 외부 클릭 시 모달 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setShowModal(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFolderName(e.target.value);
    };

    const onSaveName = (): void => {
        setIsEditing(false);
        // 저장 후 api 호출
        modifyMutation.mutate({
            projectID: id,
            data: {
                projectName: folderName,
                members: [],
            },
        });
    };

    return (
        <Container
            $isSelected={isSelected}
            $isSubFolder={isSubFolder}
            $onClickToggle={onClickToggle}
        >
            {onClickToggle && (
                <SvgImage
                    src={isOpen ? DownArrowIcon : RightArrowIcon}
                    onClick={(e): void => {
                        e.stopPropagation();
                        onClickToggle();
                    }}
                />
            )}
            <SvgImage
                onClick={onClickNav}
                src={!onClickToggle ? FileIcon : FolderIcon}
            />
            {isEditing ? (
                <TitleInput
                    value={folderName}
                    onChange={onChangeName}
                    onBlur={onSaveName} // 포커스가 벗어날 때 저장
                    onKeyDown={(e): void => {
                        if (e.key === 'Enter') {
                            onSaveName();
                        }
                    }}
                    autoFocus
                />
            ) : (
                <Title
                    $isSubFolder={isSubFolder}
                    $hasToggle={!!onClickToggle}
                    onClick={onClickNav}
                    onDoubleClick={onClickToggle}
                >
                    {folderName}
                </Title>
            )}
            <MoreIconArea
                onClick={onClickMoreIcon}
                $showModal={showModal}
                $isEditing={isEditing}
            >
                <MoreIconImage src={MoreIcon} alt="More Options" />
            </MoreIconArea>
            {showModal && (
                <>
                    <FolderModalArea ref={modalRef}>
                        <FolderModal
                            onRename={onClickRename}
                            onDelete={onClickDelete}
                            onLeave={onClickLeave}
                        />
                    </FolderModalArea>
                    <Backdrop
                        onClick={(): void => {
                            return setShowModal(false);
                        }}
                    />
                </>
            )}
            {showSmallModal && (
                <SmallModal
                    type={smallModalType === 'delete' ? 'delete' : 'leave'}
                    title={name}
                    message={
                        smallModalType === 'delete'
                            ? '프로젝트를 삭제하시겠습니까?'
                            : '프로젝트에서 나가시겠습니까?'
                    }
                    onConfirm={
                        smallModalType === 'delete'
                            ? onConfirmDelete
                            : onConfirmExit
                    } // 확인 버튼 클릭 시 처리
                    onCancel={onClickCancel} // 취소 버튼 클릭 시
                    isDelete={smallModalType === 'delete'}
                />
            )}
        </Container>
    );
};

export default FolderItem;
