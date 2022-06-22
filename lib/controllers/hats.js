const { Router } = require('express');
const Hat = require('../models/Hat');

module.exports = Router()
  .get('/:id', async(req, res) => {
    const id = req.params.id;
    const matchingHat = await Hat.getById(id);
    res.json(matchingHat[0]);
  })
  
  .get('/', async(req, res) => {
    const dogs = await Hat.getAll();
    res.json(dogs);
  })

  .post('/', async (req, res, next) => {
    try {
      const hat = await Hat.insert(req.body);
      res.json(hat);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Hat.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
