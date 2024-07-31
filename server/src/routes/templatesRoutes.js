const { getTemplates, loadDb, getTemplateById, getTechnologies, getCategories, postTemplates } = require("../handlers/templatesHandlers");
const { searchTemplateByTechnology,} = require("../services/templatesServices");

const templatesRouter = require("express").Router();

templatesRouter
    .get("/", getTemplates)
    .post("/create", postTemplates)
    .post("/loadDb", loadDb)
    .get("/technologies", getTechnologies)
    .get("/categories", getCategories)
    .get('/:id', getTemplateById)
    .get('/search/technology', searchTemplateByTechnology)

module.exports = templatesRouter;
