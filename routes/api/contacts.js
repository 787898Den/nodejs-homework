const express = require('express');
const controllers = require("../../controllers/contacts");
const { controllersWrapper } = require("../../helpers");
const { validationBody,
       isValidId,
       authenticate, 
} = require('../../middlewares');
const { schemas } = require('../../models/contacts');

const router = express.Router();

router.get('/', authenticate,
    controllersWrapper(controllers.getAllContacts),
);

router.get('/:contactId',
    authenticate,
    isValidId,
    controllersWrapper(controllers.getContactById),
);

router.post(
    '/',
    authenticate,
    validationBody(schemas.addContact),
    controllersWrapper(controllers.addContact),
);

router.delete('/:contactId',
    authenticate,
    isValidId,
    controllersWrapper(controllers.removeContact),
);

router.put('/:contactId',
    authenticate,
    isValidId,
    validationBody(schemas.addSchema),
    controllersWrapper(controllers.updateContactById),
);

router.patch('/:contactId/favorite',
    authenticate,
    isValidId,
    validationBody(schemas.updateStatusContactSchema),
    controllersWrapper(controllers.updateStatusContact),
);

module.exports = router;