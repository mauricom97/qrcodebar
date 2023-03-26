const create = require('../controllers/projects/create')
const index = require('../controllers/projects/index')
var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth')


router.post('/', auth, create)
router.get('/', auth, index)

module.exports = router;