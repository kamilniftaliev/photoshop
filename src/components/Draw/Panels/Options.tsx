import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import DefaultSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const Container = styled.header`
  display: flex;
  grid-area: options;
  background-color: var(--panels-background-color);
  padding: 10px 15px;
  column-gap: 45px;
`;

const Setting = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  color: var(--text-color);
`;

const SettingLabel = styled.p`
  flex-shrink: 0;
`;

const BrushSetting = styled(Setting)`
  width: 250px;
`;

const DarkModeSetting = styled(Setting)`
  & > label {
    margin-left: 0;
  }
`;

const Select = styled(DefaultSelect)`
  width: 80px;
  text-align: center;

  .MuiSelect-select {
    color: var(--text-color);
  }

  svg {
    fill: var(--text-color);
  }

  &:before,
  &:hover:before {
    border-bottom-color: var(--text-color) !important;
  }
`;

function formatValue(value: number) {
  return `${value}px`;
}

const zoomLevels = [10, 30, 50, 75, 100, 125, 150, 200];

interface IProps {
  brushSize: number;
  setBrushSize: (size: number | number[]) => void;
  zoomLevel: number;
  setZoomLevel: (size: number) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Options({
  brushSize: initialBrushSize,
  setBrushSize: saveBrushSize,
  zoomLevel,
  setZoomLevel,
  darkMode,
  toggleDarkMode,
}: IProps) {
  const [brushSize, setBrushSize] = useState<number | number[]>(
    initialBrushSize
  );

  return (
    <Container>
      <Setting>
        <SettingLabel>Zoom Level:</SettingLabel>
        <Select
          value={zoomLevel}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setZoomLevel(event.target.value as number);
          }}
        >
          {zoomLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}%
            </MenuItem>
          ))}
        </Select>
      </Setting>
      <BrushSetting>
        <SettingLabel>Brush size:</SettingLabel>
        <Slider
          getAriaValueText={formatValue}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={formatValue}
          min={0}
          max={100}
          value={brushSize}
          onChange={(_, value) => setBrushSize(value)}
          onChangeCommitted={(_, value) => saveBrushSize(value)}
        />
      </BrushSetting>
      <DarkModeSetting>
        <FormControlLabel
          value="start"
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode"
          labelPlacement="start"
        />
      </DarkModeSetting>
    </Container>
  );
}
