
const { Op } = require("sequelize");
const { Category, Technology, Template, Review, Image } = require("../db");
const CreateTemplates = async (
    name,
    description,
    price,
    isCover,
    image,
    technology,
    category
  ) => {
    try {
      console.log(name);
      const newTemplate = await Template.create({
        name,
        description,
        price,
      });
      const categoryNames = category.split(", ");
      const TechnologyNames = technology.split(", ");
  
      for (let urlC of isCover) {
        const newImageC = await Image.create({
          original: urlC,
          isCover: true,
        });
        await newTemplate.addImage(newImageC);
      }
          
      for (let urlD of image) {
        const newImagesD = await Image.create({
          original: urlD,
          isCover: false,
        });
        await newTemplate.addImage(newImagesD);
      }
  
   
      const existingCategories = await Category.findAll({
        where: { name: { [Op.or]: categoryNames } }, // Usar Op.or para buscar múltiples valores
      });
  
      if (existingCategories.length > 0) {
        await newTemplate.addCategories(existingCategories);
      }
     
      for (let categoryName of categoryNames) {
        const foundCategory = existingCategories.find(
          (category) => category.name === categoryName.trim()
        );
        if (!foundCategory) {
          const newCategory = await Category.create({
            name: categoryName.trim(),
          });
          await newTemplate.addCategory(newCategory);
        }
      }
  
      const existingTechnology = await Technology.findAll({
        where: { name: { [Op.or]: TechnologyNames } }, 
      });
      if (existingTechnology.length > 0) {
        await newTemplate.addTechnology(existingTechnology);
      }
      for (let TechnologyName of TechnologyNames) {
        const foundTechnology = existingTechnology.find(
          (technology) => technology.name === TechnologyName.trim()
        );
        if (!foundTechnology) {
  
          const newTechnology = await Technology.create({
            name: TechnologyName.trim(),
          });
  
          await newTemplate.addTechnology(newTechnology);
        }
      }
  
      return newTemplate;
    } catch (error) { console.error(error);
      return {
        error: "error creando template.",
        status: 500,
      };
      
    }
  };

  const getAllTemplates = async () => {
    try {
      const templates = await Template.findAll();
      return templates;
    } catch (err) {
      throw new Error(err.message); 
      return null;
    }
  };
  

const deleteTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findByPk(id);
    if (!template) {
      return res.status(404).json({ error: 'Plantilla no encontrada' });
    }
    await template.destroy(); 
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getAllTemplates,
  deleteTemplate,
  CreateTemplates
};