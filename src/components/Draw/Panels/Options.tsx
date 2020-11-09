import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import DefaultSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImageIcon from '@material-ui/icons/Image';
import PublishIcon from '@material-ui/icons/Publish';

// Utils
import { formatValueAsPx } from 'utils';

// Types
import { Point, SettingsState } from 'types';

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

const HiddenFileInput = styled.input.attrs(() => ({
  accept: 'application/JSON',
  id: 'import-json-file',
  type: 'file',
}))`
  display: none;
`;

const zoomLevels = [10, 30, 50, 75, 100, 125, 150, 200];

interface OptionsProps {
  brushSize: Point['brushSize'];
  setBrushSize: (size: number | number[]) => void;
  zoomLevel: SettingsState['zoomLevel'];
  setZoomLevel: (size: number) => void;
  darkMode: SettingsState['darkMode'];
  toggleDarkMode: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  exportToJSON: () => void;
  saveAsImage: () => void;
  importJSON: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Options({
  brushSize: initialBrushSize,
  setBrushSize: saveBrushSize,
  zoomLevel,
  setZoomLevel,
  darkMode,
  toggleDarkMode,
  undo,
  redo,
  canUndo,
  canRedo,
  exportToJSON,
  saveAsImage,
  importJSON,
}: OptionsProps) {
  const [brushSize, setBrushSize] = useState<number | number[]>(
    initialBrushSize
  );

  return (
    <Container>
      <Setting>
        <Button
          endIcon={<UndoIcon />}
          variant="contained"
          size="small"
          onClick={undo}
          disabled={!canUndo}
        >
          Undo
        </Button>
        <Button
          startIcon={<RedoIcon />}
          variant="contained"
          size="small"
          onClick={redo}
          disabled={!canRedo}
        >
          Redo
        </Button>
      </Setting>
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
          getAriaValueText={formatValueAsPx}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={formatValueAsPx}
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
      <Setting>
        <HiddenFileInput onChange={importJSON} />
        <label htmlFor="import-json-file">
          <Button
            endIcon={<PublishIcon />}
            variant="contained"
            size="small"
            component="span"
          >
            Import
          </Button>
        </label>
        <Button
          endIcon={<GetAppIcon />}
          variant="contained"
          size="small"
          onClick={exportToJSON}
        >
          Export
        </Button>
        <Button
          endIcon={<ImageIcon />}
          variant="contained"
          size="small"
          onClick={saveAsImage}
        >
          Save as Image
        </Button>
      </Setting>
    </Container>
  );
}
