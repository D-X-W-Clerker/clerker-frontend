import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';

// -- 인터페이스 --
interface LayoutProps {
  children: React.ReactNode;
}

interface Project {
  id: string;
  name: string;
  summaryFiles: { id: string; name: string }[];
  subFolders: { id: string; name: string }[];
}

// -- 스타일 컴포넌트 --
const Container = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  height: calc(100vh - 50px);
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const generateUniqueId = (): string => {
    return crypto.randomUUID();
  };

  const createProjectAPI = (): Promise<{ id: string; name: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: generateUniqueId(),
          name: `새로운 프로젝트`,
        });
      }, 100);
    });
  };

  const onClickCreateProject = async (): Promise<void> => {
    try {
      const response = await createProjectAPI();
      const newProject = response;

      setProjects((prevProjects) => {
        return [
          ...prevProjects,
          {
            id: newProject.id,
            name: newProject.name,
            summaryFiles: [],
            subFolders: [],
          },
        ];
      });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const onClickCreateSubFolder = (projectId: string): void => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        return project.id === projectId
          ? {
              ...project,
              subItems: [
                ...project.subFolders,
                {
                  id: generateUniqueId(),
                  name: `새로운 폴더`,
                },
              ],
            }
          : project;
      });
    });
  };

  return (
    <Container>
      <Header />
      <Sidebar
        projects={projects}
        onClickCreateProject={onClickCreateProject}
        onClickCreateSubFolder={onClickCreateSubFolder}
      />
      <ContentArea>{children}</ContentArea>
    </Container>
  );
};

export default Layout;
