const express = require('express');
const { womanController } = require('../controllers/womanController');
const womanRoute = express.Router();


womanRoute.get('/', womanController.getAll)
womanRoute.get('/:id', womanController.getById)
womanRoute.post('/',womanController.add)
womanRoute.delete('/:id', womanController.deleteById)
womanRoute.put('/:id', womanController.update)


module.exports = {
    womanRoute
}