const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: "daxqhy1pz", 
  api_key: "763856678654545", 
  api_secret: 'N-Rn4g1WGS3Iysg1cJSW0cncH2k' // Asegúrate de mantener tus credenciales seguras
});

module.exports = cloudinary