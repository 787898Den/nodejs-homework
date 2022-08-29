const express = require('express');
const controllers = require("../../controllers");
const { controllersWrapper } = require("../../helpers");
const { validationBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contacts');

const router = express.Router();

router.get('/',
    controllersWrapper(controllers.getAllContacts),
);

router.get('/:contactId',
    isValidId,
    controllersWrapper(controllers.getContactById),
);

router.post(
    '/',
    validationBody(schemas.addContact),
    controllersWrapper(controllers.addContact),
);

router.delete('/:contactId',
    isValidId,
    controllersWrapper(controllers.removeContact),
);

router.put('/:contactId',
    isValidId,
    validationBody(schemas.addSchema),
    controllersWrapper(controllers.updateContactById),
);

router.patch('/:contactId/favorite',
    isValidId,
    validationBody(schemas.updateStatusContactSchema),
    controllersWrapper(controllers.updateStatusContact),
);

module.exports = router;