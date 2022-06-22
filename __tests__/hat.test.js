const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/hats should return a list of hats', async () => {
    const resp = await request(app).get('/hats');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', name: 'Stetson' },
      { id: '2', name: 'Top Hat' },
      { id: '3', name: 'Baldness' }
    ]);
  });

  it('/hats/:id should return hat detail', async () => {
    const res = await request(app).get('/hats/1');
    const testHat = {
      id: '1',
      name: 'Stetson',
      color: 3,
      width: 1
    };
    expect(res.body).toEqual(testHat);
  });

  afterAll(() => {
    pool.end();
  });
});
