const CategoryService = require("../services/CategoryService");
const helpers = require("../util/helpers.js");

module.exports = () => {
    const add = async (req, res, next) => {
        console.log("CategoryController => add");
        let data = { name: req.body.name, image: req.file.filename };
        console.log(tmp_path);
    }

    return {
        add
    };
};