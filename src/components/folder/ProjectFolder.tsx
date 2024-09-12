import React, { useState } from 'react';
import styled from 'styled-components';
import { AddIcon } from '../../assets';
import FolderItem from './FolderItem';

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
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddSubFolderButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 22px;
  font-size: 12px;
  border-radius: 7px;
  color: #707070;
  cursor: pointer;
  &:hover {
    background-color: #ececec;
  }
`;

const SvgIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const ProjectFolder: React.FC<ProjectFolderProps> = ({
  project,
  isSelected,
  onClickProjectFolder,
  onClickCreateSubFolder,
}) => {
  const [selectedSubFolderId, setSelectedSubFolderId] = useState<string | null>(
    null,
  );

  const onClickSubFolder = (subFolderId: string): void => {
    setSelectedSubFolderId((prevId) => {
      return prevId === subFolderId ? null : subFolderId;
    });
  };

  return (
    <Container>
      <FolderItem
        isSelected={isSelected}
        onClick={onClickProjectFolder}
        name={project.name}
        isSubFolder={false}
      />
      {isSelected && (
        <>
          <AddSubFolderButton
            onClick={(): void => {
              return onClickCreateSubFolder(project.id);
            }}
          >
            <SvgIcon src={AddIcon} />
            하위 폴더 생성
          </AddSubFolderButton>
          {project.subFolders.map((subFolder) => {
            return (
              <FolderItem
                key={subFolder.id}
                isSelected={selectedSubFolderId === subFolder.id}
                onClick={(): void => {
                  return onClickSubFolder(subFolder.id);
                }}
                name={subFolder.name}
                isSubFolder
              />
            );
          })}
          {/* 요약 파일 */}
        </>
      )}
    </Container>
  );
};

export default ProjectFolder;
