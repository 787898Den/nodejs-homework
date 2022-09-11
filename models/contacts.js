const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors } = require('../helpers');

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;
const nameRegexp = /^[A-z][A-z0-9-_-\s?]{3,23}$/;
const codeRegexp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      required: [true, 'Set name for contact'],
      unique: true,
    },
    email: {
      type: String,
      match:emailRegexp,
      required: [true, 'Set email for contact'],
      unique: true,
    },
    phone: {
      type: String,
      match:codeRegexp,
      required: [true, 'Enter phone number'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(nameRegexp)
    .required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .required(),
  phone: Joi.string()
    .pattern(codeRegexp)
    .required(),
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