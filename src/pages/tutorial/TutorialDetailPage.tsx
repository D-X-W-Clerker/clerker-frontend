import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentDetail } from '@components';
import { CenterRow } from '@styles';
import Layout from '../../Layout';

const Container = styled(CenterRow)``;

const tutorialKeys = [
  'CreateProject',
  'ScheduleMeeting',
  'CreateMeeting',
  'AISummarize',
];

const TutorialDetailPage: React.FC = (): React.ReactElement => {
  const [tutorialId, setTutorialId] = useState(1); // id 상태 관리
  const [tutorialIndex, setTutorialIndex] = useState(0); // tutorialKey 인덱스 관리

  const handleNext = (): void => {
    setTutorialId((prevId) => {
      const nextId = prevId + 1;
      if (nextId > 2) {
        // id가 2를 넘으면 다음 tutorialKey로 변경
        if (tutorialIndex < tutorialKeys.length - 1) {
          setTutorialIndex((prevIndex) => {
            return prevIndex + 0.5;
          });
          return 1; // id를 다시 1로 리셋
        }
      }
      return nextId;
    });
  };

  const currentTutorialKey = tutorialKeys[tutorialIndex]; // 현재 tutorialKey

  return (
    <Layout>
      <Container>
        <ContentDetail
          tutorialKey={currentTutorialKey}
          id={tutorialId}
          handleNext={handleNext}
        />
      </Container>
    </Layout>
  );
};

export default TutorialDetailPage;
