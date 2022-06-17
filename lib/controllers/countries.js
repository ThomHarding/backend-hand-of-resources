const { Router } = require('express');
const Country = require('../models/Country');

module.exports = Router()
  .get('/:id', async(req, res) => {
    const id = req.params.id;
    const matchingCountry = await Country.getById(id);
    res.json(matchingCountry[0]);
  })

  .get('/', async(req, res) => {
    const countries = await Country.getAll();
    res.json(countries);
  })

  .post('/', async (req, res, next) => {
    try {
      const country = await Country.insert(req.body);
      res.json(country);
    } catch (e) {
      next(e);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Country.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Country.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
