import React from 'react';
import styled from 'styled-components';

// Icons
import PenIcon from '../../../icons/Pen';
import EraserIcon from '../../../icons/Eraser';

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

interface IProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

export default function Tools({ selectedTool, setSelectedTool }: IProps) {
  return (
    <Container>
      {tools.map(({ Icon, name }) => (
        <Icon
          key={name}
          className={selectedTool === name ? 'active' : ''}
          onClick={() => setSelectedTool(name)}
        />
      ))}
    </Container>
  );
}
