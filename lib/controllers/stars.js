const { Router } = require('express');
const Star = require('../models/Star');

module.exports = Router()
  .get('/:id', async(req, res) => {
    const id = req.params.id;
    const matchingStar = await Star.getById(id);
    res.json(matchingStar[0]);
  })

  .get('/', async(req, res) => {
    const stars = await Star.getAll();
    res.json(stars);
  })

  .post('/', async (req, res, next) => {
    try {
      const star = await Star.insert(req.body);
      res.json(star);
    } catch (e) {
      next(e);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Star.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Star.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
