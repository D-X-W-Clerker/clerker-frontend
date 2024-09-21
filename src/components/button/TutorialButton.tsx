import React from 'react';
import styled from 'styled-components';
import { SproutIcon, CalendarIcon, WindIcon, LightBulbIcon } from '@assets';
import { FlexCol } from '@styles';

// IconMap 객체 생성
const IconMap: { [key: string]: string } = {
  project: SproutIcon,
  schedule: CalendarIcon,
  summary: WindIcon,
  other: LightBulbIcon,
};

// -- 인터페이스 --
interface TutorialButtonProps {
  icon: 'project' | 'schedule' | 'summary' | 'other';
  text: string;
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)`
  width: 200px;
  height: 100px;
  background-color: var(--background-color);
  border: 0.5px solid #d2d2d2;
  border-radius: 33px;
  box-shadow:
    -1px -1px 4px rgba(0, 0, 0, 0.05),
    1px 1px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  padding: 18px;
  gap: 13px;

  &:hover {
    width: 220px;
    height: 110px;
    border: 0.55px solid #5aa6ff;
    box-shadow:
      -1.1px -1.1px 4.4px rgba(0, 0, 0, 0.05),
      1.1px 1.1px 4.4px rgba(0, 0, 0, 0.05);

    img {
      width: 28px;
      height: 28px;
    }

    div {
      font-size: 17px;
    }
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Text = styled.div`
  font-size: 16px;
  color: #3a3a3a;
`;

const TutorialButton: React.FC<TutorialButtonProps> = ({ icon, text }) => {
  const IconSrc = IconMap[icon];
  return (
    <Container>
      <Icon src={IconSrc} alt={icon} />
      <Text>{text}</Text>
    </Container>
  );
};

export default TutorialButton;