import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from 'store';

const Container = styled.main`
  background-color: var(--panels-background-color);
  flex-grow: 1;
  padding: 20px 50px;
`;

const Title = styled.h1`
  color: var(--text-color);
  text-align: center;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Count = styled.p`
  color: var(--text-color);
`;

export default function Statistics() {
  const points = useSelector((state: RootState) => state.points);

  const colors = Array.isArray(points)
    ? Object.entries(
        points.reduce((acc, { color }) => {
          const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

          if (!acc[rgba]) acc[rgba] = 0;

          acc[rgba] += 1;

          return acc;
        }, {})
      )
    : [];

  return (
    <Container>
      <Title>The number of objects drawn grouped by colour</Title>
      {colors.map(([color, count], index) => (
        <ColorContainer key={color}>
          <Count>{index + 1}.</Count>
          <Color color={color} />
          <Count>- {count} objects</Count>
        </ColorContainer>
      ))}
    </Container>
  );
}
