const { registerService, loginService, addNewFavorite, getAllFavorites, removeFavorite, userId } = require('../services/usersServices');
const {User} = require('../db');
const bcrypt = require('bcrypt');
// VERIFY every function is working.

const registerUser = async (req, res) => {
    const { email, lastname, name, image } = req.body;
    const userPassword = req.body.password;
    try {
        const response = await registerService(email, lastname, name, userPassword, image);
        if (response.error) {
            return res.status(response.status).send(response.error);
        }
        return res.status(response.status).send(response.data);
    } catch (error) {
        return res.send(error);
    }
};

const loginUser = async (req, res) => {
    const { email, password: userPassword, firebaseToken } = req.body;
    
    try {
        const response = await loginService(email, userPassword, firebaseToken);
        if (response.error) {
            return res.status(response.status).send(response.error);
        }
        return res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const getUserInfo = async (req, res) => {
    const userId = req.userId;
try {
    const response = await getUserInfo(userId)
} catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
    }

}
const addFavorite = async (req, res) => {
    const { templateId } = req.body;
    console.log(templateId);
    const userId = req.userId;
    try {
        const response = await addNewFavorite(templateId, userId);
        if (response.error) {
            return res.status(response.status).send(response.error);
        }
        return res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error al añadir a favoritos:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const getFavorites = async (req, res) => {
    const userId = req.userId;
    try {
        const response = await getAllFavorites(userId);
        if (response.error) {
            return res.status(response.status).send(response.error);
        }
        return res.status(response.status).send(response.data);
    } catch (error) {
        return res.status(response.status).send(response.error);
    }
}

const deleteFavorite = async (req, res) => {
    const { templateId } = req.body;
    console.log(templateId);
    const userId = req.userId;
    try {
        const result = await removeFavorite(templateId, userId);
        return res.status(result.status).send(result.data);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getUserById= async (req, res) => {
    const { idUser } = req.params
    try {
        let user = await userId(idUser);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(error);
    }
};


const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.userId;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ message: 'Se requiere la contraseña actual, nueva y confirmación' });
    }
  
    try {
    
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
  

      if (!newPassword || !confirmNewPassword) {
        return res.status(400).json({ message: 'Se requiere una nueva contraseña y confirmación' });
      }
  
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: 'Las contraseñas nuevas no coinciden' });
      }
  
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
    registerUser,
    loginUser,
    addFavorite,
    getFavorites,
    deleteFavorite, 
    getUserById,
    changePassword
}

