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

  const onClickMore = (folderId: string): void => {
    alert('기타 기능 클릭');
  };

  return (
    <Container>
      <FolderItem
        isOpen={openFolderIds.includes(project.id)}
        isSelected={selectedId === project.id}
        onClickToggle={(): void => {
          return toggleFolderOpen(project.id);
        }}
        onClickNav={(): void => {
          return onClickFolder(project.id);
        }}
        onClickMore={(): void => {
          return onClickMore(project.id);
        }}
        name={project.name}
        isSubFolder={false}
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
                isSelected={selectedId === summaryFile.id}
                onClickNav={(): void => {
                  return onClickSummaryFile(summaryFile.id);
                }}
                onClickMore={(): void => {
                  return onClickMore(project.id);
                }}
                name={summaryFile.name}
                isSubFolder={false}
              />
            );
          })}
          {/* 프로젝트 하위 폴더 */}
          {project.subFolders.map((subFolder) => {
            return (
              <React.Fragment key={subFolder.id}>
                <FolderItem
                  isSelected={selectedId === subFolder.id}
                  isOpen={openFolderIds.includes(subFolder.id)}
                  onClickToggle={(): void => {
                    return toggleFolderOpen(subFolder.id);
                  }}
                  onClickNav={(): void => {
                    return onClickFolder(subFolder.id);
                  }}
                  onClickMore={(): void => {
                    return onClickMore(subFolder.id);
                  }}
                  name={subFolder.name}
                  isSubFolder
                />
                {/* 하위 폴더 내 요약 파일 */}
                {openFolderIds.includes(subFolder.id) &&
                  subFolder.summaryFiles.map((summaryFile) => {
                    return (
                      <FolderItem
                        key={summaryFile.id}
                        isSelected={selectedId === summaryFile.id}
                        onClickNav={(): void => {
                          return onClickSummaryFile(summaryFile.id);
                        }}
                        onClickMore={(): void => {
                          return onClickMore(project.id);
                        }}
                        name={summaryFile.name}
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
