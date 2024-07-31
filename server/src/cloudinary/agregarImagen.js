const { Category, Technology, Template, Image } = require("../db");
const data = require("../../Data.json");
const { buscarImagensEnCarpetas } = require("../utils/imageSearch");

const guardaImagenes = async (template, templateData) => {
  try {
    const categoryName = templateData.categories[0];
    const technologyName = templateData.technologies[0];
    const technology = await Technology.findOne({ where: { name: technologyName } });
    const category = await Category.findOne({ where: { name: categoryName } });
    if(!technology){
      console.log("no se encuentra la technology en la DB");
    }
    if (!category) {
      console.warn(`Category not found for name: ${categoryName}`);
      return;
    }
    const allImagene = await buscarImagensEnCarpetas(categoryName);

    if (allImagene.length === 0) {
      console.warn(
        `No images found for category: ${category}`
      );
      return; 
    }
    for (let i = 0; i < allImagene.length; i++) {
      const index = `${allImagene[i].category}${i + 1}`;
      if (!allImagene[i].url || !allImagene[i].carpeta) {
        console.error("Invalid data for image:", allImagene[i]);
        continue;
      }
      const existingImage = await Image.findOne({ where: { set: index } });
      if (existingImage) {
        await technology.addImage(existingImage);
        await category.addImage(existingImage);
        await template.addImage(existingImage);
      } else {
        const newImage = await Image.create({
          original: allImagene[i].url,
          set: index,
          isCover: allImagene[i].isCover,
          category: allImagene[i].category,
        });
        await technology.addImage(newImage);
        await category.addImage(newImage);
        await template.addImage(newImage);
      }
    }
  } catch (error) {
    console.error("Error saving images:", error);
  }
};

module.exports = { guardaImagenes };
