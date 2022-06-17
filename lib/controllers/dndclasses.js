const { Router } = require('express');
const DndClass = require('../models/DndClass.js');

module.exports = Router()
  .get('/:id', async(req, res) => {
    const id = req.params.id;
    const matchingDndClass = await DndClass.getById(id);
    res.json(matchingDndClass[0]);
  })

  .get('/', async(req, res) => {
    const dndclasses = await DndClass.getAll();
    res.json(dndclasses);
  })

  .post('/', async (req, res, next) => {
    try {
      const dndClass = await DndClass.insert(req.body);
      res.json(dndClass);
    } catch (e) {
      next(e);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await DndClass.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await DndClass.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
