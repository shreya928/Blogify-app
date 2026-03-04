const Joi = require("joi");

// Blog validation schema
const blogSchema = Joi.object({
    blog: Joi.object({
        title: Joi.string().required().min(3),
        content: Joi.string().required().min(10),
        image: Joi.string().allow("",null),
    }).required()
});

// Comment validation schema
const commentSchema = Joi.object({
    comment: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        text: Joi.string().required(),
    }).required()
});

module.exports = { blogSchema, commentSchema };
