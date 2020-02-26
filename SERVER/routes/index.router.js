const express = require('express');
const router = express.Router();

const ctrlBook = require('../controllers/bookController');
const ctrlUser = require('../controllers/userController');
const jwtHelper = require('../config/jwtHelper');

router.post('/books',ctrlBook.add);
router.get('/books',ctrlBook.display);
router.get('/books/:_id',ctrlBook.displayOne);
router.delete('/books/:_id',ctrlBook.delete);
router.post('/books/:email',ctrlBook.displayEmail);

router.post('/register',ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;