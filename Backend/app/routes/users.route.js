const express = require('express');
const users = require('../controllers/users.controller')

const router = express.Router();

router.route('/').get(users.findAll).post(users.create).delete(users.deleteAll);

router.route('/:id').get(users.findOne).put(users.update).delete(users.delete);

router.route('/Login').post(users.checkLogin);

// router.route('/drop/:name').post(users.dropCollection)
module.exports = router;