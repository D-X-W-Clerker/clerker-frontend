import React from 'react';
import styled from 'styled-components';
import Header from './components/common/Header';
import AlarmIcon from './assets/SideBar/AlarmIcon.svg';
import SettingIcon from './assets/SideBar/SettingIcon.svg';
import AddIcon from './assets/SideBar/AddIcon.svg';

// 전체 영역
const Container = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
`;

// 사이드바 영역
const SideBarArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 175px;
  max-height: 100vh;
  border-right: 0.5px solid #b6b6b6;
  background-color: var(--background-color);
`;

const SideBarContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MenuArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 8px;
  margin-top: 50px;
  flex-shrink: 0;
`;

const ProjectListArea = styled.div`
  flex: 1;
  padding: 0 8px;
  overflow-y: auto;
`;

const UserInfoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 57px;
  border-top: 0.5px solid #b6b6b6;
  background-color: var(--background-color);
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 20px;
  color: #707070;
  font-size: 12.4px;
  cursor: pointer;
`;

const MenuIcon = styled.img`
  width: 14px;
  height: 14px;
`;

// 컨텐츠 영역
const ContentArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  height: calc(100vh - 50px);
`;

const menuItems = [
  { id: 1, icon: AlarmIcon, label: '수신함' },
  { id: 2, icon: SettingIcon, label: '계정 설정' },
  { id: 3, icon: AddIcon, label: '프로젝트 생성' },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <SideBarArea>
        <SideBarContentArea>
          <MenuArea>
            {menuItems.map((item) => {
              return (
                <MenuItem key={item.id}>
                  <MenuIcon src={item.icon} />
                  {item.label}
                </MenuItem>
              );
            })}
          </MenuArea>
          <ProjectListArea>
            {Array.from({ length: 50 }, (_, index) => {
              return <div key={index}>프로젝트 {index + 1}</div>;
            })}
          </ProjectListArea>
          <UserInfoArea>Clerker</UserInfoArea>
        </SideBarContentArea>
      </SideBarArea>
      <ContentArea>{children}</ContentArea>
    </Container>
  );
};

export default Layout;
