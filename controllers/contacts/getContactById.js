const {Contact} = require('../../models/contacts');
const { RequestError } = require('../../helpers/RequestError');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.json(result)
     
};

module.exports = getContactById;