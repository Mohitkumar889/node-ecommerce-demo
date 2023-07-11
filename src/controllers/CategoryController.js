const CategoryService = require("../services/CategoryService");
const helpers = require("../util/helpers.js");
const server = require("../../config/server");

module.exports = () => {
    const add = async (req, res, next) => {
        console.log("CategoryController => add");
        let query = { name: req.body.name, image: req.file.filename };
        let add = await CategoryService().addCategory(query);
        if (add) {
            const addWithoutVersion = add.toObject();
            addWithoutVersion.imageUrl = `${server.baseUrl}/uploads/${add.image}`;
            req.rCode = 1;
            req.msg = "category added successfully.";
            req.rData = addWithoutVersion;
        } else {
            req.rCode = 0;
            req.msg = "category not added.";
            req.rData = {};
        }
        next();
    }

    const update = async (req, res, next) => {
        console.log("CategoryController => update");
        let query = { name: req.body.name || '', image: req.file ? req.file.filename : '' };
        let update = await CategoryService().updateCategory(query, req.body._id);
        if (update) {
            let cat = await CategoryService().getOneCategory(req.body._id);
            const addWithoutVersion = cat.toObject();
            addWithoutVersion.imageUrl = `${server.baseUrl}/uploads/${cat.image}`;
            req.rCode = 1;
            req.msg = "category updated successfully.";
            req.rData = addWithoutVersion;
        } else {
            req.rCode = 0;
            req.msg = "category not updated.";
            req.rData = {};
        }
        next();
    }

    return {
        add,
        update
    };
};