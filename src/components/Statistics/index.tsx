import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// Selectors
import { pointsSelector } from 'selectors';

const Container = styled.main`
  background-color: var(--panels-background-color);
  flex-grow: 1;
  padding: 20px 50px;
  color: var(--text-color);
`;

const Title = styled.h1`
  text-align: center;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
`;

// Square color box
const Color = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
`;

/**
 * Statistics page's root component
 */
export default function Statistics() {
  const points = useSelector(pointsSelector);

  // Group lines by color
  const colors = Array.isArray(points)
    ? Object.entries(
        points.reduce((acc, { color }) => {
          // Turn rgba containing object into string
          const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

          // If it hasn't been added to the list
          // add it with 0 occurrence
          if (!acc[rgba]) acc[rgba] = 0;

          // Increment the number of objects
          // with same color
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
          <p>{index + 1}.</p>
          {/* Square color box */}
          <Color color={color} />
          <p>- {count} objects</p>
        </ColorContainer>
      ))}
    </Container>
  );
}
