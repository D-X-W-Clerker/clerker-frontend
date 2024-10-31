import React from 'react';
import styled from 'styled-components';
import { ProjectLogoutIcon, DeleteIcon, NewNameAddIcon } from '@assets';
import { FolderModalButton } from '@components';
import { FlexCol } from '@styles';

// -- 인터페이스 --
interface FolderModalProps {
    onRename: () => void;
    onDelete: () => void;
    onLeave: () => void;
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)`
    background-color: var(--background-color);
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
`;

const FolderModal: React.FC<FolderModalProps> = ({
    onRename,
    onDelete,
    onLeave,
}) => {
    const modalItems = [
        {
            id: '1',
            icon: NewNameAddIcon,
            label: '이름 바꾸기',
            onClick: onRename,
            type: 'change',
        },
        {
            id: '2',
            icon: DeleteIcon,
            label: '프로젝트 삭제',
            onClick: onDelete,
            type: 'delete',
        },
        {
            id: '3',
            icon: ProjectLogoutIcon,
            label: '프로젝트 나가기',
            onClick: onLeave,
            type: 'out',
        },
    ];

    return (
        <Container>
            {modalItems.map((item) => {
                return (
                    <FolderModalButton
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        onClick={item.onClick}
                        type={item.type}
                    />
                );
            })}
        </Container>
    );
};

export default FolderModal;
