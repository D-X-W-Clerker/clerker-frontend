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
  icon: string;
  text: string;
}

// -- 스타일 컴포넌트 --
const Container = styled(FlexCol)`
  width: 200px;
  height: 100px;
  background-color: var(--background-color);
  border: 0.5px solid var(--color-gray-100);
  border-radius: 33px;
  box-shadow:
    -1px -1px 4px rgba(0, 0, 0, 0.05),
    1px 1px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  padding: 18px;
  gap: 13px;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
    border: 0.55px solid var(--color-blue-100);
    box-shadow:
      -1.1px -1.1px 4.4px rgba(0, 0, 0, 0.05),
      1.1px 1.1px 4.4px rgba(0, 0, 0, 0.05);
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Text = styled.div`
  font-size: 16px;
  color: var(--color-gray-600);
`;

const TutorialModal: React.FC<TutorialButtonProps> = ({ icon, text }) => {
  const IconSrc = IconMap[icon];
  return (
    <Container>
      <Icon src={IconSrc} alt={icon} />
      <Text>{text}</Text>
    </Container>
  );
};

export default TutorialModal;
