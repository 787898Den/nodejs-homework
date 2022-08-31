const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: /^[A-z][A-z0-9-_-\s?]{3,23}$/,
      required: [true, 'Set name for contact'],
      unique: true,
    },
    email: {
      type: String,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      required: [true, 'Set email for contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Enter phone number'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-z][A-z0-9-_-\s?]{3,23}$/)
    .required(),
  email: Joi.string()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateStatusContactSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
}