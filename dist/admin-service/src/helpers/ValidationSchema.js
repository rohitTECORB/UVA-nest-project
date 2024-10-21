"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchema = exports.listing = exports.UpdateStatus = exports.editProfileSchema = exports.varifyPassSchema = exports.UpdatePassSchema = exports.emailSchema = exports.LoginSchema = exports.addSchema = void 0;
const Joi = require("joi");
exports.addSchema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    contact: Joi.number().optional().empty('').required()
});
exports.LoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email()
});
exports.emailSchema = Joi.object({
    email: Joi.string().email().required(),
    user_id: Joi.string().required()
});
exports.UpdatePassSchema = Joi.object({
    email: Joi.string().email().required(),
    oldpassword: Joi.string().required(),
    newpassword: Joi.string().required()
});
exports.varifyPassSchema = Joi.object({
    email: Joi.string().email().required(),
    OTP: Joi.number().required(),
});
exports.editProfileSchema = Joi.object({
    email: Joi.string().email().required(),
    status: Joi.string().required(),
    user_id: Joi.string().required()
});
exports.UpdateStatus = Joi.object({
    status: Joi.string().required(),
    user_id: Joi.string().required()
});
exports.listing = Joi.object({
    page: Joi.number().required(),
    perPage: Joi.number().required(),
    search: {
        name: Joi.string().min(3).max(15).required(),
        email: Joi.string().email().required(),
        contact: Joi.number().optional().empty('').required(),
    }
});
exports.deleteSchema = Joi.object({
    user_id: Joi.string().required()
});
//# sourceMappingURL=ValidationSchema.js.map