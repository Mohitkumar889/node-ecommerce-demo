const Category = require("../models/Category");
const helpers = require("../util/helpers");

module.exports = () => {
    const addCategory = (data) => {
        console.log("categoryService => addCategory")
        return new Promise(function (resolve, reject) {
            Category.create(data).then(resolve).catch(reject);
        });
    };

    const updateCategory = async (data, id) => {
        console.log("categoryService=>updateCategory");
        let d = await helpers().filterObject(data);
        return new Promise(function (resolve, reject) {
            Category.findByIdAndUpdate({ _id: id }, d).then(resolve).catch(reject);
        });
    }

    const getOneCategory = async (id) => {
        console.log("categoryService=>getoneCategory");
        return new Promise(function (resolve, reject) {
            Category.findOne({ _id: id }).then(resolve).catch(reject);
        });
    }



    return {
        addCategory,
        updateCategory,
        getOneCategory
    };
};