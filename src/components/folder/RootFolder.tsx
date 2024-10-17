import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AddIcon } from '@assets';
import { ActionButton, FolderItem } from '@components';
import { useFolderStore } from '@store';
import { FlexCol } from '@styles';

// -- 인터페이스 --
interface Meeting {
  id: string;
  name: string;
}

interface ChildProject {
  id: string;
  name: string;
  childProjects: [];
  meetings: Meeting[];
}

interface Project {
  id: string;
  name: string;
  childProjects: ChildProject[];
  meetings: Meeting[];
}

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
        id={project.id}
        name={project.name}
        isOpen={openFolderIds.includes(project.id)}
        isSelected={selectedId === project.id}
        onClickToggle={(): void => {
          return toggleFolderOpen(project.id);
        }}
        onClickNav={(): void => {
          return onClickFolder(project.id);
        }}
      />
      {openFolderIds.includes(project.id) && (
        <>
          <ActionButton
            icon={AddIcon}
            label="하위 폴더 생성"
            onClick={(): void => {
              return onClickCreateSubFolder(project.id);
            }}
          />
          {/* 프로젝트 내 요약 파일 */}
          {project.meetings.map((meeting) => {
            return (
              <FolderItem
                key={meeting.id}
                id={meeting.id}
                name={meeting.name}
                isSelected={selectedId === meeting.id}
                onClickNav={(): void => {
                  return onClickMeeting(meeting.id);
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
                  isOpen={openFolderIds.includes(childProject.id)}
                  onClickToggle={(): void => {
                    return toggleFolderOpen(childProject.id);
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
                        key={meeting.id}
                        id={meeting.id}
                        name={meeting.name}
                        isSelected={selectedId === meeting.id}
                        onClickNav={(): void => {
                          return onClickMeeting(meeting.id);
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
