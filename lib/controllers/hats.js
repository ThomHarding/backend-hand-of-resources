const { Router } = require('express');
const Hat = require('../models/Hat');

module.exports = Router()
  .get('/', async(req, res) => {
    const dogs = await Hat.getAll();
    res.json(dogs);
  });
