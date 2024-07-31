//const { getAllTemplates, deleteTemplate } = require("../services/adminTemplatesServices");
const {getAllTemplates, deleteTemplate} = require('../handlers/adminDashboard/adminTemplateHandler');
const loginRequire = require("../middlewares/loginRequire");
const isAdmin = require("../middlewares/isAdmin");
const { postTemplates } = require("../handlers/templatesHandlers");
const {createTemplates} = require('../handlers/adminDashboard/adminTemplateHandler');
const adminTemplatesRouter = require("express").Router();
// we import from handlers, we don't just trhow a service to the router.

adminTemplatesRouter
    .get("/", loginRequire, isAdmin, getAllTemplates) // this needs fixing, add it to the routes.
    .delete("/:id", loginRequire, isAdmin, deleteTemplate)
    .post("/", loginRequire, isAdmin, postTemplates); // changed from /create to / <- this is the route that the frontend is calling. very important to keep the same route. verify this with the frontend.

module.exports = adminTemplatesRouter;
// so far everything works on the backend.
// its time to move to the frontend and fix the routes there. in the admin dashboard.
// Also check the disableUserByEmail.jsx <- improve user feedback. < easy.
// Might want to fix or delete "templates metrics" from the dashboard.
// "cerrar sesion" button doesn't do anything inside the admin dashboard.
// then, check google auth. <- tough one.
// then, check the search bar. <- tough one.
// then, add a button inside the dashboard to go back to the home page. <- easy.
// remove all username functionality from the frontend and the backend. <- easy.
// payment hsitory is working on the backend, add a section to see the user's payment history and fix it on the frontend.
// manage changing passwords for google users, once fixed, if fixed at all.

// USE REDUX IF AT ALL POSSIBLE.

// nice changes: 
    // - only user payments history can leave a review on a template. < easy.
    // - after a template has been bought, clean the cart. <- easy.
    // - Local storage for the cart, then gets automatically added to the user's cart after login or signup. <- tough one.

