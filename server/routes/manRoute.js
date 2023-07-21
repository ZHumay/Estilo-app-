const express = require('express');
const { manController } = require('../controllers/manController');
const manRoute = express.Router();


manRoute.get('/', manController.getAll)
manRoute.get('/:id', manController.getById)
manRoute.post('/',manController.add)
manRoute.delete('/:id', manController.deleteById)
manRoute.put('/:id', manController.update)


module.exports = {
    manRoute
}