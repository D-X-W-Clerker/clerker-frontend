import styled from 'styled-components';

// FlexRow (Default)
export const FlexRow = styled.div`
  display: flex;
`;

export const CenterRow = styled(FlexRow)`
  align-items: center;
  justify-content: center;
`;

export const ItemsCenterRow = styled(FlexRow)`
  align-items: center;
`;

export const JustifyCenterRow = styled(FlexRow)`
  justify-content: center;
`;

export const ItemsCenterStartRow = styled(ItemsCenterRow)`
  justify-content: flex-start;
`;

export const ItemsCenterEndRow = styled(ItemsCenterRow)`
  justify-content: flex-end;
`;

export const ItemsCenterSpaceRow = styled(ItemsCenterRow)`
  justify-content: space-between;
`;

// FlexCol
export const FlexCol = styled(FlexRow)`
  flex-direction: column;
`;

export const CenterCol = styled(FlexCol)`
  align-items: center;
  justify-content: center;
`;

export const ItemsCenterCol = styled(FlexCol)`
  align-items: center;
`;

export const ItemsStartCol = styled(FlexCol)`
  align-items: start;
`;

export const JustifyCenterCol = styled(FlexCol)`
  justify-content: center;
`;

export const SpaceBetweenCol = styled(FlexCol)`
  justify-content: space-between;
`;
