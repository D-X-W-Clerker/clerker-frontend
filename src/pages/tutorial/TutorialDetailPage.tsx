import React from 'react';
import styled from 'styled-components';
import { ContentDetail } from '@components';
import { FlexCol, FlexRow } from '@styles';
import Layout from '../../Layout';

const Container = styled(FlexCol)`
  width: 100%;
  max-width: 1100px;
  align-items: center;
  padding: 0;
`;

const TutorialDetailArea = styled(FlexRow)`
  width: 1016px;
  height: 595px;
  margin: 35px 45px;
`;

const TutorialDetailPage: React.FC = () => {
  const tutorialKey = 'CreateProject'; // 페이지에 따라 이 값을 동적으로 설정

  return (
    <Layout>
      <Container>
        <ContentDetail tutorialKey={tutorialKey} />
      </Container>
    </Layout>
  );
};

export default TutorialDetailPage;
