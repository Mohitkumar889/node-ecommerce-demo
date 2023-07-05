const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
    const addValidator = async (req, res, next) => {
        console.log(req.body);
        const v = new Validator(req.body, {
            name: validations.general.required,
        });
        validate(v, res, next, req);
        const q = new Validator(req.file, {
            name: validations.general.required,
        });

        validate(q, res, next, req);
    };




    return {
        addValidator,
    };

};