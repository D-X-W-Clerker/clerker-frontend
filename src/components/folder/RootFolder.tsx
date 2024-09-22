import React, { useState } from 'react';
import styled from 'styled-components';
import { AddIcon } from '@assets';
import { ProjectFolder, ActionButton, MeetSummaryFile } from '@components';
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

interface ProjectFolderProps {
  project: Project;
  isSelected: boolean;
  onClickProjectFolder: () => void;
  onClickCreateSubFolder: (projectId: string) => void;
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)``;

const RootFolder: React.FC<ProjectFolderProps> = ({
  project,
  isSelected,
  onClickProjectFolder,
  onClickCreateSubFolder,
}) => {
  const [selectedSubFolderId, setSelectedSubFolderId] = useState<string | null>(
    null,
  );
  const [selectedSummaryFileId, setSelectedSummaryFileId] = useState<
    string | null
  >(null);

  const onClickSubFolder = (subFolderId: string): void => {
    setSelectedSubFolderId((prevId) => {
      return prevId === subFolderId ? null : subFolderId;
    });
  };

  const onClickSummaryFile = (summaryFileId: string): void => {
    setSelectedSummaryFileId((prevId) => {
      return prevId === summaryFileId ? null : summaryFileId;
    });
  };

  return (
    <Container>
      <ProjectFolder
        key={project.id}
        isSelected={isSelected}
        onClick={onClickProjectFolder}
        name={project.name}
        isSubFolder={false}
      />
      {isSelected && (
        <>
          <ActionButton
            icon={AddIcon}
            label="하위 폴더 생성"
            onClick={(): void => {
              return onClickCreateSubFolder(project.id);
            }}
          />
          {/* 프로젝트 하위 폴더 */}
          {project.subFolders.map((subFolder) => {
            return (
              <React.Fragment key={subFolder.id}>
                <ProjectFolder
                  key={subFolder.id}
                  isSelected={selectedSubFolderId === subFolder.id}
                  onClick={(): void => {
                    return onClickSubFolder(subFolder.id);
                  }}
                  name={subFolder.name}
                  isSubFolder
                />

                {/* 하위 폴더 내 요약 파일 */}
                {selectedSubFolderId === subFolder.id &&
                  subFolder.summaryFiles.map((summaryFile) => {
                    return (
                      <MeetSummaryFile
                        key={summaryFile.id}
                        isSelected={selectedSummaryFileId === summaryFile.id}
                        onClick={(): void => {
                          return onClickSummaryFile(summaryFile.id);
                        }}
                        name={summaryFile.name}
                        isSubFolder
                      />
                    );
                  })}
              </React.Fragment>
            );
          })}
          {/* 프로젝트 내 요약 파일 */}
          {project.summaryFiles.map((summaryFile) => {
            return (
              <MeetSummaryFile
                key={summaryFile.id}
                isSelected={selectedSummaryFileId === summaryFile.id}
                onClick={(): void => {
                  return onClickSummaryFile(summaryFile.id);
                }}
                name={summaryFile.name}
                isSubFolder={false}
              />
            );
          })}
        </>
      )}
    </Container>
  );
};

export default RootFolder;
