import React, { useState } from 'react';
import styled from 'styled-components';
import {
  RightArrowIcon,
  DownArrowIcon,
  FolderIcon,
  AddIcon,
} from '../../assets';

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

interface SvgIconProps {
  width?: string;
  height?: string;
}

// -- 스타일 컴포넌트 --
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FolderContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 3px;
  border-radius: 7px;
  color: #3d3d3d;
  background-color: ${(props): string => {
    return props.isSelected ? '#ececec' : 'transparent';
  }};
  cursor: pointer;

  &:hover {
    background-color: #ececec;
  }
`;

const ProjectFolderContainer = styled(FolderContainer)``;

const SubFolderContainer = styled(FolderContainer)`
  padding-left: 20px;
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

const SvgIcon = styled.img<SvgIconProps>`
  width: ${(props): string => {
    return props.width || '14px';
  }};
  height: ${(props): string => {
    return props.height || '14px';
  }};
`;

const ProjectTitle = styled.div`
  font-weight: var(--font-normal);
  color: #3d3d3d;
  font-size: 13px;
`;

const ProjectFolder: React.FC<ProjectFolderProps> = ({
  project,
  isSelected,
  onClickProjectFolder,
  onClickCreateSubFolder,
}) => {
  const [expandedSubFolderId, setExpandedSubFolderId] = useState<string | null>(
    null,
  );

  const handleClickSubFolder = (subFolderId: string): void => {
    setExpandedSubFolderId((prevId) => {
      return prevId === subFolderId ? null : subFolderId;
    });
  };

  return (
    <Container>
      <ProjectFolderContainer
        isSelected={isSelected}
        onClick={onClickProjectFolder}
      >
        <SvgIcon src={isSelected ? DownArrowIcon : RightArrowIcon} />
        <SvgIcon src={FolderIcon} />
        <ProjectTitle>{project.name}</ProjectTitle>
      </ProjectFolderContainer>
      {isSelected && (
        <>
          <AddSubFolderButton
            onClick={(): void => {
              return onClickCreateSubFolder(project.id);
            }}
          >
            <SvgIcon src={AddIcon} width="12px" height="12px" />
            하위 폴더 생성
          </AddSubFolderButton>
          {project.subFolders.map((subFolder) => {
            return (
              <SubFolderContainer
                key={subFolder.id}
                isSelected={expandedSubFolderId === subFolder.id}
                onClick={(): void => {
                  return handleClickSubFolder(subFolder.id);
                }}
              >
                <SvgIcon
                  src={
                    expandedSubFolderId === subFolder.id
                      ? DownArrowIcon
                      : RightArrowIcon
                  }
                />
                <SvgIcon src={FolderIcon} />
                <ProjectTitle>{subFolder.name}</ProjectTitle>
              </SubFolderContainer>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default ProjectFolder;
