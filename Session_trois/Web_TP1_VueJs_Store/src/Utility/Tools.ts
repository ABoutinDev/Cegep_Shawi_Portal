/**
 * Fonction qui permet de générer une URL pour une image peu importe où dans le projet 
 * @param assetsFolder 
 * @param subfolder 
 * @param imageFileName 
 * @returns 
 */
const getImageUrl = (assetsFolder: string, subfolder: string, imageFileName: string) => {
  return new URL(`${assetsFolder}${subfolder}${imageFileName}`, import.meta.url).href;
};

export const Tools = {
  getImageUrl,
};