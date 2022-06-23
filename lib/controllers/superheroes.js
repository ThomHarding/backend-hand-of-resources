const { Router } = require('express');
const Superhero = require('../models/Superhero');

module.exports = Router()
  .get('/:id', async(req, res) => {
    const id = req.params.id;
    const matchingSuperhero = await Superhero.getById(id);
    res.json(matchingSuperhero[0]);
  })

  .get('/', async(req, res) => {
    const superheros = await Superhero.getAll();
    res.json(superheros);
  })

  .post('/', async (req, res, next) => {
    try {
      const superhero = await Superhero.insert(req.body);
      res.json(superhero);
    } catch (e) {
      next(e);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Superhero.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Superhero.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
