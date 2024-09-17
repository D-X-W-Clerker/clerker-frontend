import React from 'react';
import { SproutIcon, CalendarIcon, WindIcon, LightBulbIcon } from '@assets';
import styled from 'styled-components';
import { FlexRow } from '@styles'; // SVG 이미지 파일을 임포트

// -- 인터페이스 --
interface TutorialButtonProps {
  text: string; // 버튼에 표시될 텍스트
  type: 'project' | 'schedule' | 'summary' | 'other'; // 버튼 유형에 따라 아이콘 결정
}

// -- 스타일 컴포넌트 --
const TuButton = styled(FlexRow)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 200px;
  height: 100px;
  background-color: #ffffff;
  border: 0.5px solid #d2d2d2;
  border-radius: 33px;
  box-shadow:
    -1px -1px 4px rgba(0, 0, 0, 0.05),
    1px 1px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  margin-right: 32px;
  padding: 15px;

  &:hover {
    width: 220px;
    height: 110px;
    border: 0.55px solid #5aa6ff;
    box-shadow:
      -1.1px -1.1px 4.4px rgba(0, 0, 0, 0.05),
      1.1px 1.1px 4.4px rgba(0, 0, 0, 0.05);
  }

  img {
    width: 17px;
    height: 17px;
    margin-bottom: 10px;
  }

  p {
    margin: 9px 15px 15px 15px;
    text-align: center;
    font-size: 16px;
    color: #3a3a3a;
  }
`;

const TutorialButton: React.FC<TutorialButtonProps> = ({ text, type }) => {
  let IconSrc;
  switch (type) {
    case 'project':
      IconSrc = SproutIcon;
      break;
    case 'schedule':
      IconSrc = CalendarIcon;
      break;
    case 'summary':
      IconSrc = WindIcon;
      break;
    case 'other':
      IconSrc = LightBulbIcon;
      break;
    default:
      IconSrc = undefined;
  }

  return (
    <TuButton>
      {IconSrc && <img src={IconSrc} alt={type} />} <p>{text}</p>
    </TuButton>
  );
};

export default TutorialButton;
