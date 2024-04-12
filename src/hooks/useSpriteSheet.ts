import { useEffect, useState } from 'react';

/**
 * A custom React hook to extract sprites from a sprite sheet image.
 * @param {string} imagePath - The path to the sprite sheet image.
 * @param {number} columns - The number of columns in the sprite sheet.
 * @param {number} rows - The number of rows in the sprite sheet.
 * @param {number} cellWidth - The width of each sprite cell in pixels.
 * @param {number} cellHeight - The height of each sprite cell in pixels.
 * @returns {function} A function to get a specific sprite from the sprite sheet.
 * @example
 * const getSprite = useSpriteSheet('path/to/sprite.png', 4, 3, 32, 32);
 * const sprite = getSprite(2, 3); // Get sprite at row 2, column 3
 */
export default function useSpriteSheet(
  imagePath: string,
  columns: number,
  rows: number,
  cellWidth: number,
  cellHeight: number
) {
  const [spriteGrid, setSpriteGrid] = useState<Array<Array<string | null>>>([]);

  /**
   * Get a specific sprite from the sprite sheet.
   * @param rowIndex The row index of the sprite.
   * @param colIndex The column index of the sprite.
   * @returns The base64 representation of the sprite.
   */
  const getSprite = (rowIndex: number, colIndex: number) => {
    if (spriteGrid.length) {
      const sprite = spriteGrid[rowIndex][colIndex];
      return sprite;
    }
    return undefined;
  };

  useEffect(() => {
    const image = new Image();
    image.src = imagePath;

    // Append the image to the canvas
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = columns * cellWidth;
      canvas.height = rows * cellHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(image, 0, 0);

        // Extract the sprites from the image as base64
        const sprites = [];
        for (let row = 0; row < rows; row++) {
          const spriteRow = [];
          for (let col = 0; col < columns; col++) {
            // Get the image data
            const imageData = ctx.getImageData(
              col * cellWidth,
              row * cellHeight,
              cellWidth,
              cellHeight
            );

            // Create a temporary canvas to convert ImageData to base64
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = cellWidth;
            tempCanvas.height = cellHeight;
            const tempCtx = tempCanvas.getContext('2d');

            if (tempCtx) {
              tempCtx.putImageData(imageData, 0, 0);
              // Convert to base64
              const base64 = tempCanvas.toDataURL('image/png');
              spriteRow.push(base64);
            }
          }
          sprites.push(spriteRow);
        }

        setSpriteGrid(sprites);
      }
    };
  }, []);

  return getSprite;
}
