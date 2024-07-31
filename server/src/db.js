require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { image } = require("./cloudinary");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_URL } = process.env;

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  protocol: 'postgres',
  //dialectOptions: {
  //  ssl: {
  //    require: false, // SSL is not required for localhost, but is required for deployed apps.
  //    rejectUnauthorized: false
 //   }
 // },
  logging: false,
});


sequelize.options.timezone = "America/Mexico_City";
const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// const  = sequelize.models;
const { User, Template, Category, Technology, Image, Review, Cart, Order,
  OrderPayment, PaymentStatus, ReportedTemplate, Admin
} = sequelize.models;


Template.belongsToMany(Image, { through: "TemplateImages" });
Image.belongsToMany(Template, { through: "TemplateImages" });
Technology.belongsToMany(Image, { through: "TechnologyImages" });
Image.belongsToMany(Technology, { through: "TechnologyImages" });

Category.belongsToMany(Image, {through: 'CategoriImages'});
Image.belongsToMany(Category, {through: 'CategoriImages'});

Image.belongsTo(User, { through: "userImage" });
User.belongsTo(Image, { through: "userImage" });

Technology.belongsToMany(Category, { through: "TechnologyCategories" });
Category.belongsToMany(Technology, { through: "TechnologyCategories" });

// un template puede pertencer a varias categorias (many-to-many)
// un template pertenece a un usuario ? ?
Template.belongsToMany(User, { through: 'userFavorites', as:"Users" });
Template.belongsToMany(Technology, { through: 'TemplateTechnologies' });
Template.belongsToMany(Category, { through: 'TemplateCategories' });
Category.belongsToMany(Template, { through: 'TemplateCategories' });
//es mejor tener otra tabla Favorite y establecer una relacion many-to-many con Template y de one-to-many entre Favorite y User.
User.belongsToMany(Template, { through: 'userFavorites', as: "Favorites" });
Technology.belongsToMany(Template, { through: 'TemplateTechnologies' });


Template.hasMany(Review, {
  //foreignKey: 'templateId',
  foreignKey: 'idTemplate',
  as: 'reviews'
});

Review.belongsTo(Template, {
  //foreignKey: 'templateId' 
  foreignKey: 'idTemplate',
});


User.hasMany(Review, {
  //foreignKey: 'userId', 
  foreignKey: 'idUser',
  as: 'reviews'
});

Review.belongsTo(User, {
  //foreignKey: 'userId' 
  foreignKey: 'idUser'
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Cart.belongsToMany(Template, { through: 'CartTemplates', as: "inCart"});
Template.belongsToMany(Cart, { through: 'CartTemplates', as: "toCart" });

Order.belongsToMany(Template, { through: 'OrderTemplates', as: 'purchasedTemplates' });
Template.belongsToMany(Order, { through: 'OrderTemplates', as: 'orders' });

// Relacion admin y user. (one-to-one).
User.hasOne(Admin, { foreignKey: 'user_id', as: 'admin' });
Admin.belongsTo(User, { foreignKey: 'user_id' });


/*User.belongsToMany(Review,  {foreignKey: 'user_id'}, {through: 'userReview'}

);
Review.belongsTo(User, {foreignKey: 'user_id'}, {through: 'userReview'}
  );
Review.belongsTo(Template, {foreignKey: 'template_id'}, {through: 'templateReview'}
  ); // cada review debe ir asociada a un template.
Template.belongsToMany(Review, {foreignKey: 'template_id'}, {through: 'templateReview'}

); // cada template puede contener muchas reviews.



// // relacion Entre Cart, User, y Template.
// // va aqui.
// Cart.belongsTo(User, {foreignKey: 'user_id'}); // cada cart debe pertenecer a un usuario.
// Cart.belongsToMany(Template, {through: 'TemplateCart'});
// Template.belongsToMany(Cart, {through: 'TemplateCart'}); 


// // Relacion entre Order, Template, y User.
// Order.belongsTo(User, {foreignKey: 'customer_id'}); // un usuario puede tener muchas ordenes. cada orden pertenece a un usuario.
// User.hasMany(OrderPayment, {foreignKey: 'customer_id'});
// OrderPayment.belongsToMany(Template, {through: 'OrderPaymentTemplate'});
// Template.hasMany(OrderPayment, {through: 'OrderPaymentTemplate'}); 

// PaymentStatus.belongsTo(OrderPayment, {foreignKey: 'payment_status_id'}); // es importante primero crear: Pending & Fulfilled en en la tabla PaymentStatus.

// PaymentStatus.hasMany(OrderPayment, {foreignKey: 'payment_status_id'}); // PaymentStatus (Pending & Fulfilled) pueden tener varias ordenes asociadas a ellas.
// OrderPayment.belongsTo(PaymentStatus, {foreignKey: 'payment_status_id'});

// OrderPayment.belongsTo(Order, {foreignKey: 'order_id'});
// Order.hasMany(OrderPayment, {foreignKey: 'order_id'});
/*
// relacion Entre Cart, User, y Template.
// va aqui.
Cart.belongsTo(User, {foreignKey: 'user_id'}); // cada cart debe pertenecer a un usuario.
Cart.belongsToMany(Template, {through: 'TemplateCart'});
Template.belongsToMany(Cart, {through: 'TemplateCart'}); 
// Relacion entre Order, Template, y User.
Order.belongsTo(User, {foreignKey: 'user_id'}); // un usuario puede tener muchas ordenes. cada orden pertenece a un usuario.
User.hasMany(OrderPayment, {foreignKey: 'user_id'});
// OrderPayment.belongsToMany(Template, {through: 'OrderPaymentTemplate'});
// Template.hasMany(OrderPayment, {through: 'OrderPaymentTemplate'}); 
// PaymentStatus.belongsTo(OrderPayment, {foreignKey: 'payment_status_id'}); // es importante primero crear: Pending & Fulfilled en en la tabla PaymentStatus.
// PaymentStatus.hasMany(OrderPayment, {foreignKey: 'payment_status_id'}); // PaymentStatus (Pending & Fulfilled) pueden tener varias ordenes asociadas a ellas.
// OrderPayment.belongsTo(PaymentStatus, {foreignKey: 'payment_status_id'});
OrderPayment.belongsTo(Order, {foreignKey: 'order_id'});
Order.belongsToMany(OrderPayment, {foreignKey: 'order_id'});

// // reported template.
// // cada report esta asociado a un usuario.
// ReportedTemplate.belongsTo(User, {foreignKey: 'user_id'});
// // un usuario puede realizar varios reportes.
// ReportedTemplate.belongsTo(Template, {foreignKey: 'template_id'});

// // cada reporte pertenece a un template.
// ReportedTemplate.belongsTo(Template, {foreignKey: 'template_id'});

// // un template puede contener varios reportes.
// Template.hasMany(ReportedTemplate, {foreignKey: 'template_id'});

// // relaciones admin.
// // one-to-one
// User.hasOne(Admin, {foreignKey: 'user_id'});
// Admin.belongsTo(User, {foreignKey: 'user_id'})

/**
 * Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsToMany(Template, { through: 'OrderTemplate' });
Template.belongsToMany(Order, { through: 'OrderTemplate' });

 */


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};


// Es muy importante que una vez que una compra pase de "Pending" a "Fulfilled"
// que no puede regresar al estado inicial, el cual seria: Pending.
// esto se puede proteger a nivel de Ruta o database.

/**
 ***** EJEMPLO : 
 * router.put('/order-payment/:id/status', async (req, res) => {
    const { id } = req.params;
    const { newStatus } = req.body;

    try {
        const orderPayment = await OrderPayment.findByPk(id);
        const currentStatus = await PaymentStatus.findByPk(orderPayment.payment_status_id);

        if (currentStatus.status === 'fulfilled' && newStatus === 'pending') {
            return res.status(400).json({ error: 'Cannot revert status from fulfilled to pending' });
        }

        const status = await PaymentStatus.findOne({ where: { status: newStatus } });
        orderPayment.payment_status_id = status.id;
        await orderPayment.save();

        res.json(orderPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

 */