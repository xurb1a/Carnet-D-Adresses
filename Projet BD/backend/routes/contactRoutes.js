const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/add', contactController.addContact);
router.put('/modify', contactController.modifyContact);
router.get('/list/:idUtilisateur', contactController.getContacts);
router.delete('/delete', contactController.deleteContact);

module.exports = router;
