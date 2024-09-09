import React from 'react';
import styled from 'styled-components';
import Layout from '../Layout';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
`;

const ContentArea = styled.div`
  width: 50%;
  overflow-y: auto;
  height: calc(100vh - 50px);
  padding: 20px;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const LeftContentArea = styled(ContentArea)`
  border-right: 0.5px solid #b6b6b6; /* 영역 구분 되게끔 일부러 표시해둔 거에용 */
`;

const RightContentArea = styled(ContentArea)``;

const ProjectDetailPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <LeftContentArea>
          <h2>멤버 및 파일 목록</h2>
        </LeftContentArea>
        <RightContentArea>
          <h2>캘린더 및 when2meet</h2>
        </RightContentArea>
      </Container>
    </Layout>
  );
};

export default ProjectDetailPage;
