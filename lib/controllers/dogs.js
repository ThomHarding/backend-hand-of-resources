const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .get('/:id', async(req, res) => {
    const id = req.params.id;
    const matchingDog = await Dog.getById(id);
    res.json(matchingDog[0]);
  })

  .get('/', async(req, res) => {
    const dogs = await Dog.getAll();
    res.json(dogs);
  })

  .post('/', async (req, res, next) => {
    try {
      const dog = await Dog.insert(req.body);
      res.json(dog);
    } catch (e) {
      next(e);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Dog.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Dog.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
