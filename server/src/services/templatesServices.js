const { Category, Technology, Template, Review, Image } = require("../db");
const { Sequelize, Op } = require("sequelize");

const CreateTemplates = async (
  name,
  description,
  price,
  imagen,
  technology,
  category,
) => {
  const newTemplate = await Template.create({
    name, description, price
  });

  if (imagen) await newTemplate.addImage(imagen);
  if (technology) await newTemplate.addTechnology(technology);
  if (category) await newTemplate.addCategory(category);

  return newTemplate

}

// dynamic query to filter templates.
const getFilteredTemplates = async ({
  imagen,
  technology,
  category,
  sortBy,
  order,
  page,
  pageSize,
}) => {
  const technologyFilter = technology ? { name: technology.split(",") } : {};
  const categoryFilter = category ? { name: category.split(",") } : {};
  
  try {
    // Prepare sorting options
    const orderArray = [];
    if (sortBy && order) {
      orderArray.push([sortBy, order.toUpperCase()]);
    }
    // Prepare pagination options
    const limit = pageSize ? parseInt(pageSize) : 5; // Default value of 5 if not specified
    const offset = page ? (parseInt(page) - 1) * limit : 0;

    // Fetch total count of templates with filters applied.
    const totalCount = await Template.count({
      where: {
        ...technologyFilter,
        ...categoryFilter,
      },
      paranoid: true, // Ensure soft deleted templates are excluded
    });

    // Fetch templates with filters applied.
    const templates = await Template.findAll({
      include: [
        {
          model: Technology,
          where: technologyFilter,
          required: !!technology, // Include only if there is a technology filter
        },
        {
          model: Category,
          where: categoryFilter,
          required: !!category, // Include only if there is a category filter
        },
        {
          model: Image,
          through: {
            attributes: [], // Specify attributes if necessary
          },
          where: imagen,
        },
        {
          model: Review,
          as: 'reviews',
        }
      ],
      
      // Apply sorting, pagination, and other options.
      order: orderArray.length ? orderArray : undefined,
      limit: limit !== null ? limit : undefined,
      offset: offset !== null ? offset : undefined,
      paranoid: true, // Ensure soft deleted templates are excluded
    });

    // Calculate total pages based on the total count and limit.
    const totalPages = Math.ceil(totalCount / limit);
    if (!templates.length) {
      return { error: "No templates found with the specified filters", status: 404 };
    }

    // Return the templates and total pages
    return { data: templates, totalPages: totalPages === 0 ? 1 : totalPages, status: 200 };
  } catch (error) {
    console.error(error);
    return {
      error: "An error occurred while fetching the templates.",
      status: 500,
    };
  }
};




const getAllCategories = async () => {
  try {
    const response = await Category.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

const getAllTechnologies = async () => {
  try {
    const response = await Technology.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

const getTemplateId = async (id) => {
  try {
    let product = await Template.findByPk(id, {

      include: [ {
        model: Review,
        as: 'reviews'
      }, 
      {
        model: Technology,
        through: {
          attributes: [],
        }
      },
      {
        model: Category,
        through: {
          attributes: [],
        }
  },{model: Image,
    through: {
        attributes: [],
      },
      attributes: ['original'],
    },
  ],
});

// Procesar las imágenes para incluir solo la propiedad original
if (product && product.Images) {
  product.Images = product.Images.map(image => ({
    original: image.original,
  }));
}
      return product;
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while fetching the template.', status: 500 };
  }
}

const searchTemplateByTechnology = async (req, res) => {
  const technologyName = req.query.technology;
  console.log("Searching for technology:", technologyName);

  try {
   
    const templates = await Template.findAll({
      where: {
        technology: {
          [ Op.iLike ]: `%${technologyName}%`, // Utiliza ILIKE para búsqueda por coincidencia parcial
        },
      },
      include: [
      {
          model: Image,
          through: {
            attributes: [],
          },
        },{
          model: Technology,
          through: {
            attributes: [],
          },
        }
      ],
    });
    
  
    
    if (templates.length === 0) {
      console.log("Technology not found:", technologyName);
      return res.status(404).json({ error: "Technology not found" });
    }
    console.log(templates);
    console.log(templates);
    // Mapeamos los resultados para formatear la respuesta deseada
    

    console.log("Technologies found:", templates);
   return res.status(200).json(templates);
  } catch (error) {
    console.error("Error searching by technology:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getFilteredTemplates,
  getTemplateId,
  getAllCategories,
  getAllTechnologies,
  searchTemplateByTechnology,
  CreateTemplates,
};