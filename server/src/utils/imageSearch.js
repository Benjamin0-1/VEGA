const cloudinary = require('cloudinary').v2;
const data = require("../../Data.json");

async function buscarImagensEnCarpetas(categoria) {
 
  try {
    let resultados = [];
    const searchOptions = [
      { folder: `${categoria}_Portada`, maxResults: 1}, // Busca la portada
      { folder: `${categoria}_Detalle`, maxResults: 3} // Busca detallesd
    ];


    for (let i = 0; i < searchOptions.length; i++ ) {
      const options = searchOptions[i];
    
      const response = await cloudinary.search
      .expression(`folder:${options.folder}`)
      .max_results(options.maxResults)
      .sort_by('created_at')
      .execute();
      console.log(response);
      response.resources.forEach(resource => {

        const isCover = options.folder.includes("_Portada"); // true si es una portada, false si es detalle

        resultados.push({
          url: resource.secure_url,
          category: categoria,
          carpeta: resource.asset_folder,
          isCover: isCover, // Usa la variable determinada anteriormente
        });
      });

    }

    return resultados;
  } catch (error) {
    console.error("Error buscando imágenes:", error);
  }
}

module.exports = { buscarImagensEnCarpetas };
//     // let carpeta = "VegaStore"
//   const opcionesBusqueda = {
//     folder: "VegaStore",
//     max_results: 10 // Número máximo de resultados
//   };

//   const resultadosBusqueda = await cloudinary.search
//    .expression(`folder:VegaStore`)
//    .sort_by('public_id')
//    .max_results(opcionesBusqueda.max_results)
//    .execute();

// const urls = resultadosBusqueda.resources.map(respuesta => {
//  return respuesta.secure_url
// })
//    return urls

// const cloudinary = require("../cloudinary");
// const data = require("../../Data.json");

// async function buscarImagensEnCarpetas(categoria) {
//   try {
//     let resultados = [];
//     for (const imageData of data.imagenes) {
//       // Determina la carpeta basada en la categoría y si la imagen es cover
//       const carpeta = imageData.isCover? `${categoria}_Portada` : `${categoria}_Detalle`;
//     console.log(imageData.content);
//       try {
//         if(imageData.category === categoria){
//           const resultado = await cloudinary.uploader.upload(imageData.content, {folder: carpeta,});
        

//         resultados.push({
//           url: resultado.secure_url,
//           categoryy: categoria, // 
//           carpeta: resultado.asset_folder,
//           isCover: imageData.isCover,
//         });

//         // Agrega la categoría al arreglo de categorías procesadas
      

    
//         if (resultados.length >= 4) {
//           break; // 
//         }

        
//       }
//       } catch (error) {
//         console.error(`Error cargando imagen ${imageData.content} en la carpeta ${carpeta}:`, error);
//       }
//     }
//     return resultados;
  
//   } catch (error) {
//     console.error("Error buscando imágenes:", error);
//   }
// }

// module.exports = { buscarImagensEnCarpetas };

// async function buscarImagensEnCarpetas(categoria) {
//   try {
//     let resultados = [];
//     for (const imageData of data.imagenes) {
//       // Determina la carpeta basada en la categoría y si la imagen es cover
//       const carpeta = imageData.isCover? `${categoria}_Portada` : `${categoria}_Detalle`;
//     console.log(imageData.content);
//       try {
//         if(imageData.category === categoria){
//           const resultado = await cloudinary.uploader.upload(imageData.content, {folder: carpeta,});
        

//         resultados.push({
//           url: resultado.secure_url,
//           categoryy: categoria, // 
//           carpeta: resultado.asset_folder,
//           isCover: imageData.isCover,
//         });

//         // Agrega la categoría al arreglo de categorías procesadas
      

    
//         if (resultados.length >= 4) {
//           break; // 
//         }

        
//       }
//       } catch (error) {
//         console.error(`Error cargando imagen ${imageData.content} en la carpeta ${carpeta}:`, error);
//       }
//     }
//     return resultados;
  
//   } catch (error) {
//     console.error("Error buscando imágenes:", error);
//   }
// }

// module.exports = { buscarImagensEnCarpetas };
// const cloudinary = require("../cloudinary");
// const data = require("../../Data.json");

// async function buscarImagensEnCarpetas(categoria) {
//   try {
//     let resultados = [];
//     for (const imageData of data.imagenes) {
//       // Determina la carpeta basada en la categoría y si la imagen es cover
//       const carpeta = imageData.isCover? `${categoria}_Portada` : `${categoria}_Detalle`;
//     console.log(imageData.content);
//       try {
//         if(imageData.category === categoria){
//           const resultado = await cloudinary.uploader.upload(imageData.content, {folder: carpeta,});
        

//         resultados.push({
//           url: resultado.secure_url,
//           categoryy: categoria, // 
//           carpeta: resultado.asset_folder,
//           isCover: imageData.isCover,
//         });

//         // Agrega la categoría al arreglo de categorías procesadas
      

    
//         if (resultados.length >= 4) {
//           break; // 
//         }

        
//       }
//       } catch (error) {
//         console.error(`Error cargando imagen ${imageData.content} en la carpeta ${carpeta}:`, error);
//       }
//     }
//     return resultados;
  
//   } catch (error) {
//     console.error("Error buscando imágenes:", error);
//   }
// }

// module.exports = { buscarImagensEnCarpetas };