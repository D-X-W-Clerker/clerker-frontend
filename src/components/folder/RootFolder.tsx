import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AddIcon } from '@assets';
import { ActionButton, FolderItem } from '@components';
import { useFolderStore } from '@store';
import { FlexCol } from '@styles';

// -- 인터페이스 --
interface SummaryFile {
  id: string;
  name: string;
}

interface SubFolder {
  id: string;
  name: string;
  summaryFiles: SummaryFile[];
}

interface Project {
  id: string;
  name: string;
  summaryFiles: SummaryFile[];
  subFolders: SubFolder[];
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

  const onClickSummaryFile = (summaryFileId: string): void => {
    setSelectedId(summaryFileId);
    navigate(`/summary/${summaryFileId}`);
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
          {project.summaryFiles.map((summaryFile) => {
            return (
              <FolderItem
                key={summaryFile.id}
                id={summaryFile.id}
                name={summaryFile.name}
                isSelected={selectedId === summaryFile.id}
                onClickNav={(): void => {
                  return onClickSummaryFile(summaryFile.id);
                }}
              />
            );
          })}
          {/* 프로젝트 하위 폴더 */}
          {project.subFolders.map((subFolder) => {
            return (
              <React.Fragment key={subFolder.id}>
                <FolderItem
                  id={subFolder.id}
                  name={subFolder.name}
                  isSelected={selectedId === subFolder.id}
                  isOpen={openFolderIds.includes(subFolder.id)}
                  onClickToggle={(): void => {
                    return toggleFolderOpen(subFolder.id);
                  }}
                  onClickNav={(): void => {
                    return onClickFolder(subFolder.id);
                  }}
                  isSubFolder
                />
                {/* 하위 폴더 내 요약 파일 */}
                {openFolderIds.includes(subFolder.id) &&
                  subFolder.summaryFiles.map((summaryFile) => {
                    return (
                      <FolderItem
                        key={summaryFile.id}
                        id={summaryFile.id}
                        name={summaryFile.name}
                        isSelected={selectedId === summaryFile.id}
                        onClickNav={(): void => {
                          return onClickSummaryFile(summaryFile.id);
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
