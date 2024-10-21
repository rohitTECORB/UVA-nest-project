import * as Joi from 'joi';


export const addSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  contact: Joi.number().optional().empty('').required()
});

export const LoginSchema = Joi.object({
  // name: Joi.string().min(3).max(15).required(),
  password: Joi.string().required(),
  email: Joi.string().email()
});

export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
  user_id: Joi.string().required()
})

export const UpdatePassSchema = Joi.object({
  email: Joi.string().email().required(),
  oldpassword: Joi.string().required(),
  newpassword: Joi.string().required()
})


export const varifyPassSchema = Joi.object({
  email: Joi.string().email().required(),
  OTP: Joi.number().required(), 
})

export const editProfileSchema = Joi.object({
  email: Joi.string().email().required(),
  status: Joi.string().required(),
 user_id: Joi.string().required() 
})

export const UpdateStatus = Joi.object({
  status: Joi.string().required(),
  user_id: Joi.string().required() 
})

export const listing = Joi.object({
 page: Joi.number().required(),
 perPage: Joi.number().required(),
 search:{
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  contact: Joi.number().optional().empty('').required(),
 }
})

export const deleteSchema = Joi.object({
  user_id: Joi.string().required()
})




