import FileSaver from 'file-saver';

// Types
import { Point } from 'types';

/**
 * Generates a filename from current date and time
 */
function generateFilename(): string {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = `${date.getHours()}-${date.getMinutes()}`;
  const filename = `Drawing - ${day}.${month}.${year} ${time}`;

  return filename;
}

/**
 * Downloads a JSON file with points stringified
 */
export function downloadJSONFileWithDrawing(points: Point[]) {
  const blob = new Blob([JSON.stringify(points)], {
    type: 'application/json;charset=utf-8',
  });

  FileSaver.saveAs(blob, `${generateFilename()}.json`);
}

/**
 * Saves canvas as PNG image
 * @param canvasElement - Element to save image from
 */
export function saveCanvasAsImage(canvasElement: HTMLCanvasElement) {
  canvasElement.toBlob((blob) =>
    FileSaver.saveAs(blob, `${generateFilename()}.png`)
  );
}

/**
 * Parses a JSON file from file input
 * @param event - Change event from hidden file input
 * @param callback - Function that will be called after successful parsing
 */
export function readDrawingFromJSON(event: React.ChangeEvent<HTMLInputElement>, callback: (points: Point[]) => void) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const points = JSON.parse(event.target.result as string) as Point[];

    if (points.length) {
      callback(points);
    }
  };
  reader.readAsText(event.target.files[0]);
}

/**
 * Format for tooltip above the slider
 * @param value - number from range slider
 */
export function formatValueAsPx(value: number) {
  return `${value}px`;
}