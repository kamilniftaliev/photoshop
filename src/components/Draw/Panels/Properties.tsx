import React, { useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: properties;
  background-color: var(--panels-background-color);
`;

interface IProps {
  color: string;
  setColor: (color: IProps['color']) => void;
}

export default function Properties({
  color: initialColor,
  setColor: saveColor,
}: IProps) {
  const [color, setColor] = useState(initialColor);

  return (
    <Container>
      <ChromePicker
        color={color}
        onChange={({ rgb }) => setColor(rgb)}
        onChangeComplete={({ rgb }) => saveColor(rgb)}
      />
    </Container>
  );
}
