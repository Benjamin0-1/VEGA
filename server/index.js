const app = require('./src/app.js');
const { conn, User, Admin, Category, Template, Technology } = require('./src/db.js');
const createDefaultAdmin = require('./src/utils/createDefaultAdmin.js');
const data = require('./Data.json'); // Assuming your data is in a JSON file
const { guardaImagenes } = require('./src/cloudinary/agregarImagen'); // Assuming this is your image saving function

// if the db is empty, then this will simply load the data from the JSON file.
const loadDb = async () => {
  try {
    const categories = await Category.bulkCreate(data.categories, { ignoreDuplicates: true });
    const technologies = await Technology.bulkCreate(data.technologies, { ignoreDuplicates: true });

    for (const templateData of data.templates) {
      const [template, created] = await Template.findOrCreate({
        where: { name: templateData.name },
        defaults: {
          description: templateData.description,
          price: templateData.price,
          technology: templateData.technologies[0]
        }
      });

      if (created) {
        const templateCategories = await Category.findAll({
          where: { name: templateData.categories }
        });
        await template.addCategory(templateCategories);

        const templateTechnologies = await Technology.findAll({
          where: { name: templateData.technologies }
        });
        await template.addTechnologies(templateTechnologies);

        await guardaImagenes(template, templateData);
      }
    }

    console.log("Database loaded successfully with initial data.");
  } catch (error) {
    console.error("Error loading the database:", error);
  }
};

(async () => {
  try {
    await conn.sync({ force: false });

    const adminUser = await User.findOne({ where: { email: 'admin@gmail.com' } });
    if (!adminUser) {
      await createDefaultAdmin();
    } else {
      const adminRecord = await Admin.findOne({ where: { user_id: adminUser.id } });
      if (!adminRecord) {
        await Admin.create({ user_id: adminUser.id });
        console.log('Admin record created for existing admin user.');
      } else {
        console.log('Admin record already exists.');
      }
    }

    const categoriesCount = await Category.count();
    const templatesCount = await Template.count();
    const technologiesCount = await Technology.count();

    if (categoriesCount === 0 && templatesCount === 0 && technologiesCount === 0) {
      await loadDb();
    } else {
      console.log('Database already has initial data.');
    }
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    app.listen(3001, () => {
      console.log('Server is listening at 3001');
    });
  }
})();
