const { postReview, getReviewsTemplate, getReviewsUser, deleteReview, updateReview, getTemplateAverageRatings } = require("../handlers/reviewsHandlers");
const reviewsRouter = require("express").Router();
const loginRequire = require("../middlewares/loginRequire");

reviewsRouter
    //.get("/all", getReviews)
    .get("/template-ratings", getTemplateAverageRatings)
    .get("/:id", getReviewsTemplate)
    .post("/",  loginRequire, postReview)
    .get('/', loginRequire, getReviewsUser)
    .put('/:id', loginRequire,updateReview)
    .delete('/:id', loginRequire, deleteReview);
    
   
    

module.exports = reviewsRouter;