import Joi from "joi";

export const schemaSignUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3),
    confirmPassword: Joi.string().required().min(3)
})

export const schemaSigIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3)
})

export const schemaUrl = Joi.object({
    url: Joi.string()
    .uri({ scheme: ['http', 'https'] }) // Aceita apenas URLs com os esquemas 'http' ou 'https'
    .trim() // Remove espaços em branco no início e no final da URL
    .required()
})