const {Contact} = require('../../models/contacts');

const {RequestError} = require('../../helpers/RequestError');

const updateContactById  = async (req, res) => {
      const {contactId} = req.params;
      const result =  await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
      if(!result){
        throw RequestError(404, 'Not found');
      }
      res.json(result);
       
}

module.exports = updateContactById;