const express = require('express');
const { salesController } = require('../controllers/salesController');
const saleRoute = express.Router();


saleRoute.get('/', salesController.getAll)
saleRoute.get('/:id', salesController.getById)
saleRoute.post('/',salesController.add)
saleRoute.delete('/:id', salesController.deleteById)
saleRoute.put('/:id', salesController.update)


module.exports = {
    saleRoute
}