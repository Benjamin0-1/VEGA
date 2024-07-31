//const { getAllTemplates, deleteTemplate } = require("../services/adminTemplatesServices");
const {getAllTemplates, deleteTemplate, restoreTemplate, viewDisabledTemplates} = require('../handlers/adminDashboard/adminTemplateHandler');
const loginRequire = require("../middlewares/loginRequire");
const isAdmin = require("../middlewares/isAdmin");
const { postTemplates } = require("../handlers/templatesHandlers");
const {createTemplates} = require('../handlers/adminDashboard/adminTemplateHandler');
const adminTemplatesRouter = require("express").Router();
// we import from handlers, we don't just trhow a service to the router.

adminTemplatesRouter
    .get("/", loginRequire, isAdmin, getAllTemplates) 
    .get("/disabled", loginRequire, isAdmin, viewDisabledTemplates)
    .put("/restore/:id", loginRequire, isAdmin, restoreTemplate)
    .delete("/:id", loginRequire, isAdmin, deleteTemplate)
    .post("/", loginRequire, isAdmin, postTemplates); // changed from /create to / <- this is the route that the frontend is calling. very important to keep the same route. verify this with the frontend.

module.exports = adminTemplatesRouter;


// paranoid on Template. and all the functionalities similar to the user crud.
// then, check google auth. <- tough one.
// manage changing passwords for google users, once fixed, if fixed at all.
// REMOVE EMAIL CHANGES FROM THE FRONT AND BACKEND.
// nice changes: 
    // - Local storage for the cart, then gets automatically added to the user's cart after login or signup. <- tough one.

