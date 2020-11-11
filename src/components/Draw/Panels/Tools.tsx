import React from 'react';
import styled from 'styled-components';

// Icons
import { PenIcon, EraserIcon } from 'icons';

// Types
import { Point } from 'types';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: tools;
  background-color: var(--panels-background-color);

  svg {
    width: var(--tools-panel-width);
    height: var(--tools-panel-width);
    padding: 15px;
    box-sizing: border-box;
    cursor: pointer;
    border: 2px solid transparent;

    &:hover,
    &.active {
      background-color: rgba(0, 0, 0, 0.3);
    }

    &.active {
      border-color: var(--text-color);
    }
  }
`;

const tools = [
  {
    name: 'pen',
    Icon: PenIcon,
  },
  {
    name: 'eraser',
    Icon: EraserIcon,
  },
];

interface ToolsProps {
  selectedTool: Point['tool'];
  setSelectedTool: (tool: Point['tool']) => void;
}

/**
 * Tools panel - left side of the canvas
 */
export default function Tools({
  selectedTool,
  setSelectedTool,
}: ToolsProps): React.ReactElement {
  return (
    <Container>
      {tools.map(({ Icon, name }) => (
        <Icon
          key={name}
          className={selectedTool === name ? 'active' : ''}
          onClick={() => setSelectedTool(name as Point['tool'])}
        />
      ))}
    </Container>
  );
}
