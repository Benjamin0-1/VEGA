const bcrypt = require('bcrypt');
const { User, Template, Order, Review, Image} = require('../db');
const token = require('../utils/token');
//const sendMail = require('../utils/nodemailer');
const firebaseAdmin = require("../firebaseConfig/firebaseConfig");
const { Op } = require('sequelize');
const nodemailer = require('nodemailer')

// NODEMAILER CONFIG
const nodemailerOptions = {
  service: 'gmail',
  auth: {
      user: 'oliver125125@gmail.com',
      pass: 'aiyp fvhl djxd rjny',
  }
};

async function initializeTransporter() {
  const testAccount = await nodemailer.createTestAccount();

  nodemailerOptions.auth.user = nodemailerOptions.auth.user;
  nodemailerOptions.auth.pass = nodemailerOptions.auth.pass;

  const transporter = nodemailer.createTransport(nodemailerOptions);

  return transporter;
};

async function sendMail(transporter, to, subject, message) {
  try {
    const info = await transporter.sendMail({
      from: nodemailerOptions.auth.user,
      to: to,
      subject: subject,
      html: `
        <html>
          <head>
            <style>
             
              body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
              }
              .header img {
                max-width: 200px;
              }
              .content {
                color: #555;
                line-height: 1.5;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://example.com/logo.png" alt="Logo">
              </div>
              <h1>${subject}</h1>
              <p class="content">${message}</p>
              <p class="content">Click the button below to learn more.</p>
              <a class="button" href="https://example.com">Learn More</a>
            </div>
          </body>
        </html>
      `
    });
    console.log(`Message sent: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (error) {
    console.error(`Error sending email to ${to}: ${error}`);
    throw error;
  }
}



const registerService = async (email, lastname, name, userPassword, image) => {
  try {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { error: 'Email inválido', status: 400 };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    const existingUser = await User.findOne({
      where: {
        email: email
      }
    });
    if (existingUser) {
      return { error: `El email ${email} ya existe`, status: 409 }
    }
    const newUser = await User.create({
      name: name,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    // EMAIL
    const transporter = await initializeTransporter();
    await sendMail(transporter, newUser.email, 'Cuenta registrada', 'Tu cuenta ha sido registrada exitosamente.');

    return { data: `Bienvenido a Vega, ${name}`, status: 201 }
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return { error: 'Error al crear el usuario', status: 500 };
  }
};

const loginService = async (email, userPassword, firebaseToken) => {

  if (!email) {
    return {status: 400, error: 'Faltan datos'}
  };

  // verificar si usuario esta desactivado.
  if (email) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { status: 400, error: 'Usuario no encontrado.' };
    };
    if (user.deleted_at !== null) {
      return { status: 403, error: 'Tu cuenta ha sido desactivada.' };
    };
  }

  try {
    let user;

    if (firebaseToken) {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
      const { uid, email } = decodedToken;

      user = await User.findOne({
        where: {
          [Op.or]: [
            { firebaseUid: uid },
            { email: email }
          ]
        },
        include: [
          {
            model: Order,
            foreignKey: "user_id"
          },
          {
            model: Template,
            as: 'Favorites',
            through: {
              attributes: []
            }
          }
        ]
      });

      if (user && user.password) {
        // Si el usuario tiene contraseña, genera un token con ese usuario
        const userToken = token(user);
        const { password, ...userWithoutPassword } = user.get();

        return { status: 200, data: { token: userToken, userInfo: userWithoutPassword } };
      }

      // Si el usuario no tiene contraseña (por ejemplo, si se registró solo con Firebase)
      if (!user) {
        user = await User.create({
          email,
          firebaseUid: uid,
          name: decodedToken.name.split(" ")[0],
          lastname: decodedToken.name.split(" ")[2] || decodedToken.name.split(" ")[1],
          imagen: decodedToken.picture,
        });
      }
    } else {
      // Lógica para manejar inicio de sesión con email y contraseña
      user = await User.findOne({
        where: { email },
        include: [
          {
            model: Order,
            foreignKey: "user_id"
          },
          {
            model: Template,
            as: 'Favorites',
            through: {
              attributes: []
            }
          }
        ]
      });

      if (!user || user.deleted_at !== null) {
        return { status: 403, error: 'Tu cuenta ha sido desactivada.' };
      }

      const passwordCorrect = await bcrypt.compare(userPassword, user.password);

      if (!passwordCorrect) {
        return { status: 400, error: 'Email o contraseña inválidos.' };
      }
    }

    // Genera el token para el usuario encontrado
    const userToken = token(user);
    const { password, ...userWithoutPassword } = user.get();

    return { status: 200, data: { token: userToken, userInfo: userWithoutPassword } };

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { status: 500, error: 'Error al procesar la solicitud de login.' };
  }
};



const addNewFavorite = async (templateId, userId) => {
  try {
    const user = await User.findByPk(userId);
    const template = await Template.findByPk(templateId);
    if (user && template) { // will always be found on the front end.
      await user.addFavorite(template);
      const updatedFavorites = await User.findByPk(userId, {
        include: [
          {
            model: Template,
            as: 'Favorites',
            include: [
              {
                model: Review,
                as: 'reviews',
              },
              {
                model: Image,
                through: {
                  attributes: [], 
                },
              },
            ],
            through: {
              attributes: [],
            },
          },
        ],
      }).then(user => user.Favorites);
      return { status: 200, message: 'Favorito añadido.', data: updatedFavorites };
    } else {
      return { status: 404, error: 'Usuario o Template no encontrado.' };
    }
  } catch (error) {
    console.error('Error al añadir a favoritos:', error);
    return { status: 500, error: 'Error al procesar la solicitud.' };
  }
};

const getAllFavorites = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Template,
          as: 'Favorites',
          include: [
            {
              model: Review,
              as: 'reviews',
            },
            {
              model: Image,
              through: {
                attributes: [],
              }
            },
          ],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!user) {
      return { status: 404, data: 'Usuario no encontrado' };
    }
    const favorites = user.Favorites;
    return { status: 200, data: favorites };
  } catch (error) {
    return { status: 500, error: error.message };
  }
};

const removeFavorite = async (templateId, userId) => {
  try {
    const user = await User.findByPk(userId);
    const template = await Template.findByPk(templateId);

    if (user && template) {
      await user.removeFavorite(template);

      const updatedFavorites = await User.findByPk(userId, {
        include: [
          {
            model: Template,
            as: 'Favorites',
            include: [
              {
                model: Review,
                as: 'reviews',
              },
              {
                model: Image,
                through: {
                  attributes: [], 
                }
              },
            ],
            through: {
              attributes: [],
            },
          },
        ],
      }).then(user => user.Favorites);

      return {
        status: 200,
        message: "Favorito eliminado.",
        data: updatedFavorites,
      };
    } else {
      return { status: 404, error: 'Usuario o Template no encontrado.' };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, error: error.message };
  }
};




const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }


    const userProfileData = await User.findOne({
      where: { id: userId },
      attributes: { exclude: [ 'password' ] },
      include: [
        {
          model: Order,
          foreignKey: 'user_id',
        },
        {
          model: Template,
          as: 'Favorites',
          through: {
            attributes: []
          },
          include: [
            {
              model: Review,
              as: 'reviews',
            },
            {
              model: Image,
              through: {
                attributes: [], 
              }
            },
          ],
        }
      ]
    });

    if (!userProfileData) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }


    res.status(200).json(userProfileData);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const updateProfile = async (req, res) => {
  const { name, lastname, email } = req.body;

  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    // Fetch the user from the database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Update user profile
    await User.update(
      {
        name: name || user.name,
        lastname: lastname || user.lastname,
        email: email || user.email,
      },
      { where: { id: userId } }
    );

    // Fetch updated user profile
    const updatedProfile = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password'] }
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const userId = req.userId;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Handle Firebase UID case
    if (user.firebaseUid && !currentPassword) {
      user.firebaseUid = ''; // Clear firebaseUid if no currentPassword is provided
      await User.update({ firebaseUid: '' }, { where: { id: userId } });
    } else {
      // Validate current password
      if (!currentPassword) {
        return res.status(400).json({ message: 'Se requiere la contraseña actual' });
      }
      
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
      }
    }

    // Validate new password
    if (!newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: 'Se requiere una nueva contraseña y confirmación' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'Las contraseñas nuevas no coinciden' });
    }

    // Password strength check (optional, implement as needed)
    // Example: if (newPassword.length < 8) { ... }

    // Hash and update new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.update(
      { password: hashedPassword, firebaseUid: user.firebaseUid },
      { where: { id: userId } }
    );

    res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};



module.exports = {
  registerService,
  loginService,
  addNewFavorite,
  getAllFavorites,
  removeFavorite,
  getProfile,
  updateProfile,
  changePassword
}