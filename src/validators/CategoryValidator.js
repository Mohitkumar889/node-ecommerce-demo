const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
    const addValidator = async (req, res, next) => {
        let data = { name: req.body.name, image: req.file };
        const v = new Validator(data, {
            name: validations.general.required,
            image: validations.general.required,
        });
        validate(v, res, next, req);
    };

    const updateValidator = async (req, res, next) => {
        console.log("categoryValidator => updateValidator");
        let data = { _id: req.body._id };

        const v = new Validator(data, {
            _id: validations.category.IdExists,
        });
        validate(v, res, next, req);
    };




    return {
        addValidator,
        updateValidator
    };

};