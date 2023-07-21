const express = require('express');
const { categoryController } = require('../controllers/categoryController');
const categoryRoute = express.Router();


categoryRoute.get('/', categoryController.getAll)
categoryRoute.get('/:id', categoryController.getById)
categoryRoute.post('/',categoryController.add)
categoryRoute.delete('/:id', categoryController.deleteById)
categoryRoute.put('/:id', categoryController.update)


module.exports = {
    categoryRoute
}