const { Review, User, Template, Order } = require('../db');

const getReviewsServices = async ()=> {
    return await Review.findAll()
}

// will update it to also include the users's name. to see who left the review.
const getReviewsByTemplateIdServices = async (id)=>{
    try {
        const reviews = await Template.findOne({
            
            where: { id: id },
            include: [{
              model: Review,
              as: 'reviews',
              
            }]
          });

          return reviews
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while fetching the reviews.', status: 500 };
    }
};

// going to add a check where the user must have bought the template to leave a review.
// it works, now it needs to send a message to the user if they have not bought the template.
const postReviewServices = async (userId, data) => {
    try {
        // Check if the user has already left a review for the template
        const existingReview = await Review.findOne({
            where: {
                idUser: userId,
                idTemplate: data.idTemplate
            }
        });

        if (existingReview) {
            throw new Error(`El usuario ya ha dejado una opinión para esta plantilla`);
        }

        // Check for required fields
        const requiredFields = ['rating', 'content', 'idTemplate'];
        for (const field of requiredFields) {
            if (!data[field]) {
                throw new Error(`Falta el campo obligatorio: ${field}`);
            }
        }

        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`Usuario con id ${userId} no encontrado`);
        }

        // Check if the template exists
        const template = await Template.findByPk(data.idTemplate);
        if (!template) {
            throw new Error(`Plantilla con id ${data.idTemplate} no encontrada`);
        }

        // Check if the user has purchased the template
        const hasPurchased = await Order.findOne({
            where: {
                user_id: userId
            },
            include: {
                model: Template,
                as: 'purchasedTemplates',
                where: {
                    id: data.idTemplate
                }
            }
        });

        if (!hasPurchased) {
            throw new Error(`El usuario no ha comprado la plantilla con id ${data.idTemplate}`);
        }

        // Create the review if all checks pass
        const dataReview = {
            idUser: userId,
            rating: data.rating,
            content: data.content,
            idTemplate: data.idTemplate
        };

        const newReview = await Review.create(dataReview);
        return newReview;
    } catch (error) {
        console.error('Error:', error.message);
        throw error; 
    }
};



const getReviewsUserServices = async (idUser) => {
    if (!idUser) {
      throw new Error('User ID is required');
    }
    
    const user = await User.findOne({
        where: { id: idUser },
        include: {
        model: Review,
        as: 'reviews',
        //through: {
        //    attributes: []
        //}
      }
    });  
    console.log(user)
    if (!user) {
      throw new Error('User not found');
    }
  
    return user;
  };

  const deleteReviewUserServices = async (id) => {
    try {
        const review = await Review.findByPk(id);
        if (!review) {
            throw new Error(`Review con id ${id} no encontrada`);
        }
        await review.destroy();
        return { message: 'Review eliminada' };
    } catch (error) {
        console.error('Error:', error.message);
        return error;
    }
};

const updateReviewServices = async (id, data) => {
    try {
        const review = await Review.findByPk(id);

        if (!review) {
            throw new Error('Review no encontrada');
        }

        await review.update(data);
        return review;
    } catch (error) {
        console.error('Error:', error.message);
        return error;
    }
};


const getTemplateAverageRatingsService = async () => {
    try {
        const templates = await Template.findAll({
            include: [{
                model: Review,
                as: 'reviews',
            }]
        });

        const averageRatings = templates.map(template => {
            // math to calculate average rating.
            const totalRatings = template.reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = template.reviews.length ? totalRatings / template.reviews.length : 0;
            return {
                templateId: template.id,
                templateName: template.name,
                averageRating: averageRating.toFixed(2),
            };
        });

        return averageRatings;
    } catch (error) {
        console.error('Error al obtener las calificaciones de las plantillas:', error);
        throw new Error('Ocurrió un error al obtener las calificaciones de las plantillas.');
    }
};

module.exports = {
    getReviewsServices,
    getReviewsByTemplateIdServices,
    getReviewsUserServices,
    postReviewServices,
    deleteReviewUserServices,
    updateReviewServices,
    getTemplateAverageRatingsService
 }