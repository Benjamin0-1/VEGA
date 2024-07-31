const { User, Admin } = require('../../db');
const { Op } = require("sequelize");
const { Category, Technology, Template, Review, Image } = require("../../db");

const createTemplate = async (req, res) => {
    const {
        name,
        description,
        price,
        isCover,
        image,
        technology,
        category
    } = req.body;

    try {
        const newTemplate = await Template.create({
            name,
            description,
            price,
        });

        const categoryNames = category.split(", ");
        const technologyNames = technology.split(", ");

        for (let urlC of isCover) {
            const newImageC = await Image.create({
                original: urlC,
                isCover: true,
            });
            await newTemplate.addImage(newImageC);
        }

        for (let urlD of image) {
            const newImagesD = await Image.create({
                original: urlD,
                isCover: false,
            });
            await newTemplate.addImage(newImagesD);
        }

        const existingCategories = await Category.findAll({
            where: {
                name: {
                    [Op.or]: categoryNames
                }
            },
        });

        if (existingCategories.length > 0) {
            await newTemplate.addCategories(existingCategories);
        }

        for (let categoryName of categoryNames) {
            const foundCategory = existingCategories.find(
                (category) => category.name === categoryName.trim()
            );
            if (!foundCategory) {
                const newCategory = await Category.create({
                    name: categoryName.trim(),
                });
                await newTemplate.addCategory(newCategory);
            }
        }

        const existingTechnology = await Technology.findAll({
            where: {
                name: {
                    [Op.or]: technologyNames
                }
            },
        });

        if (existingTechnology.length > 0) {
            await newTemplate.addTechnology(existingTechnology);
        }

        for (let technologyName of technologyNames) {
            const foundTechnology = existingTechnology.find(
                (technology) => technology.name === technologyName.trim()
            );
            if (!foundTechnology) {
                const newTechnology = await Technology.create({
                    name: technologyName.trim(),
                });
                await newTemplate.addTechnology(newTechnology);
            }
        }

        return res.status(201).json(newTemplate);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Error creating template."
        });
    }
};

const getAllTemplates = async (req, res) => {
    try {
        const templates = await Template.findAll({ paranoid: false });
        if (templates.length === 0) {
            return res.status(404).json({ error: 'No se encontraron templates' });
        }
        return res.status(200).json(templates);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// disable template
const deleteTemplate = async (req, res) => {
    const { id } = req.params;
    try {
        const template = await Template.findByPk(id);
        if (!template) {
            return res.status(404).json({ error: 'Template no encontrado.' });
        }
        template.deleted_at = new Date();
        return res.json({ message: 'Template desactivado' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllTemplates, deleteTemplate };