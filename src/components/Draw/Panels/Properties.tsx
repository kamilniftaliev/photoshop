import React, { useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

// Types
import { Point } from 'types';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  grid-area: properties;
  background-color: var(--panels-background-color);
`;

const Shortcuts = styled.section`
  padding: 10px;
`;

const ShortcutText = styled.p`
  color: var(--text-color);
  opacity: 0.3;
`;

interface PropertiesProps {
  color: Point['color'];
  setColor: (color: Point['color']) => void;
}

/**
 * Properties panel - right side of the canvas
 */
export default function Properties({
  color: initialColor,
  setColor: saveColor,
}: PropertiesProps): React.ReactElement {
  const [color, setColor] = useState(initialColor);

  return (
    <Container>
      <ChromePicker
        color={color}
        onChange={({ rgb }) => setColor(rgb)}
        onChangeComplete={({ rgb }) => saveColor(rgb)}
      />
      <Shortcuts>
        <ShortcutText>
          <strong>CTRL/CMD + Z</strong> - Undo
        </ShortcutText>
        <ShortcutText>
          <strong>CTRL/CMD + Shift + Z</strong> - Redo
        </ShortcutText>
      </Shortcuts>
    </Container>
  );
}
