const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('star routes', () => {
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


  afterAll(() => {
    pool.end();
  });
});
