import React from 'react';
import styled from 'styled-components';
import { FlexRow, CenterRow } from '@styles';
import { Header, Sidebar } from '@components';

// -- 인터페이스 --
interface LayoutProps {
  children: React.ReactNode;
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexRow)`
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
`;

const ContentArea = styled(CenterRow)`
  flex: 1;
  margin-top: 50px;
  height: calc(100vh - 50px);
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Sidebar />
      <ContentArea>{children}</ContentArea>
    </Container>
  );
};

export default Layout;
