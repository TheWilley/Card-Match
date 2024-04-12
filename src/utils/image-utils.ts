/**
 * Get the path of the image by name.
 * @param name The name of the image.
 * @returns A string with the path of the image.
 * @see {@link https://www.youtube.com/watch?v=7EFZIe_Cpv8}
 */
export function getImageUrl(name: string) {
  return new URL(`../assets/${name}.png`, import.meta.url).href;
}
