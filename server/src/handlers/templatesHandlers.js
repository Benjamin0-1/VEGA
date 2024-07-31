const {
  getFilteredTemplates,
  getTemplateId,
  getAllTechnologies,
  getAllCategories,
} = require("../services/templatesServices");

const data = require("../../Data.json");
const { Category, Technology, Template, Image } = require("../db");
const { CreateTemplates } = require("../services/adminTemplatesServices");
const { guardaImagenes } = require("../cloudinary/agregarImagen");

const postTemplates = async (req, res) => {
  try {
    const { name, description, price, technology, category, image, isCover } = req.body;

    if (!name || !description || !price || !technology || !category || !image || !isCover) {
      res.status(400).json({ message: "Missing info"  });
    } else {
      const newTemplate = await CreateTemplates(
        name,
        description,
        price,
        isCover,
        image,
        technology,
        category
      );
      return res.status(200).json(newTemplate);
    }
  } catch (error) {
    return res.status(500).send("Error al crear plantilla.");
  }
};

const getTemplates = async (req, res) => {
  const { technology, category, sortBy, order, page, pageSize, imagen } =
    req.query;
  
  try {
    const templates = await getFilteredTemplates({
      imagen,
      technology,
      category,
      sortBy,
      order,
      page,
      pageSize,
      where : {deleted_at: null} // added this line.
    });
    if (templates.status === 404) {
      return res.status(templates.status).json(templates.error);
    }

    return res.status(templates.status).send(templates);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};

const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getTemplateId(id);

    if (!response || Object.keys(data).length === 0) {
      return res.status(400).send("No encontrado");
    }

   return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ha ocurrido un error.");
  }
};

const getTechnologies = async (req, res) => {
  try {
    const response = await getAllTechnologies();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).send("Ha ocurrido un error.");
  }
};

const getCategories = async (req, res) => {
  try {
    const response = await getAllCategories();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).send("Ha ocurrido un error.");
  }
};
// funcion auxiliar par cargar la base de datos
const loadDb = async (req, res) => {
  try {
    const categories = await Category.bulkCreate(data.categories);
    const technologies = await Technology.bulkCreate(data.technologies);

    for (const templateData of data.templates) {
      const template = await Template.create({
        name: templateData.name,
        description: templateData.description,
        price: templateData.price,
        technology: templateData.technologies[0]
      });
    console.log(templateData.categories);
      const templateCategories = await Category.findAll({
        where: {
          name: templateData.categories,
        },
      });
      await template.addCategory(templateCategories);
     

      const templateTechnologies = await Technology.findAll({
        where: {
          name: templateData.technologies,
        },
      });
      await template.addTechnologies(templateTechnologies);
      
      await guardaImagenes(template, templateData)
    }
    // esto debe devolver un array de URLS

    res.status(200).json("se cargo con exito");
  } catch (error) {
    console.error("Error al cargar la base de datos:", error);
    res.status(500).send("Error al cargar la base de datos");
  }
};

module.exports = {
  getTemplates,
  getTemplateById,
  loadDb,
  getTechnologies,
  getCategories,
  postTemplates,
};

