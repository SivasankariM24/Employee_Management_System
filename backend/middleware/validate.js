const Joi = require('joi');

exports.registerValidation = data => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')) // strong password
  });
  return schema.validate(data);
};

exports.employeeValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
    salary: Joi.number().required()
  });
  return schema.validate(data);
};
