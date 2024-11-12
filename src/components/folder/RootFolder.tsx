import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AddIcon } from '@assets';
import { ActionButton, FolderItem } from '@components';
import { useFolderStore } from '@store';
import { FlexCol } from '@styles';
import { Project, Meeting, ChildProject } from '../../types';

// -- 인터페이스 --
// interface Meeting {
//     meetingId: string;
//     name: string;
// }
//
// interface ChildProject {
//     id: string;
//     name: string;
//     childProjects: [];
//     meetings: Meeting[];
// }
//
// interface Project {
//     projectId: string;
//     name: string;
//     childProjects: ChildProject[];
//     meetings: Meeting[];
// }

interface RootFolderProps {
    project: Project;
    onClickCreateSubFolder: (projectId: string) => void;
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)``;

const RootFolder: React.FC<RootFolderProps> = ({
    project,
    onClickCreateSubFolder,
}) => {
    const { selectedId, setSelectedId, openFolderIds, toggleFolderOpen } =
        useFolderStore();
    const navigate = useNavigate();

    const onClickFolder = (folderId: string): void => {
        setSelectedId(folderId);
        navigate(`/project/${folderId}`);
    };

    const onClickMeeting = (meetingId: string): void => {
        setSelectedId(meetingId);
        navigate(`/summary/${meetingId}`);
    };

    return (
        <Container>
            <FolderItem
                id={project.projectId}
                name={project.name}
                isOpen={openFolderIds.includes(project.projectId)}
                isSelected={selectedId === project.projectId}
                onClickToggle={(): void => {
                    return toggleFolderOpen(project.projectId);
                }}
                onClickNav={(): void => {
                    return onClickFolder(project.projectId);
                }}
            />
            {openFolderIds.includes(project.projectId) && (
                <>
                    <ActionButton
                        icon={AddIcon}
                        label="하위 폴더 생성"
                        onClick={(): void => {
                            return onClickCreateSubFolder(project.projectId);
                        }}
                    />
                    {/* 프로젝트 내 요약 파일 */}
                    {project.meetings.map((meeting) => {
                        return (
                            <FolderItem
                                key={meeting.meetingId}
                                id={meeting.meetingId}
                                name={meeting.name}
                                isSelected={selectedId === meeting.meetingId}
                                onClickNav={(): void => {
                                    return onClickMeeting(meeting.meetingId);
                                }}
                            />
                        );
                    })}
                    {/* 프로젝트 하위 폴더 */}
                    {project.childProjects.map((childProject) => {
                        return (
                            <React.Fragment key={childProject.id}>
                                <FolderItem
                                    id={childProject.id}
                                    name={childProject.name}
                                    isSelected={selectedId === childProject.id}
                                    isOpen={openFolderIds.includes(
                                        childProject.id,
                                    )}
                                    onClickToggle={(): void => {
                                        return toggleFolderOpen(
                                            childProject.id,
                                        );
                                    }}
                                    onClickNav={(): void => {
                                        return onClickFolder(childProject.id);
                                    }}
                                    isSubFolder
                                />
                                {/* 하위 폴더 내 요약 파일 */}
                                {openFolderIds.includes(childProject.id) &&
                                    childProject.meetings.map((meeting) => {
                                        return (
                                            <FolderItem
                                                key={meeting.meetingId}
                                                id={meeting.meetingId}
                                                name={meeting.name}
                                                isSelected={
                                                    selectedId ===
                                                    meeting.meetingId
                                                }
                                                onClickNav={(): void => {
                                                    return onClickMeeting(
                                                        meeting.meetingId,
                                                    );
                                                }}
                                                isSubFolder
                                            />
                                        );
                                    })}
                            </React.Fragment>
                        );
                    })}
                </>
            )}
        </Container>
    );
};

export default RootFolder;
