const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('country routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/countries should return a list of countries', async () => {
    const resp = await request(app).get('/countries');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', name: 'Brazil', capital: 'Brasília' },
      { id: '2', name: 'Canada', capital: 'Ottawa' },
      { id: '3', name: 'Lithuania', capital: 'Vilnius' },
      { id: '4', name: 'Australia', capital: 'Canberra' }
    ]);
  });

  it('/countries/:id should return country detail', async () => {
    const res = await request(app).get('/countries/1');
    const soup = {
      id: '1',
      name: 'Brazil',
      population: 216,
      capital: 'Brasília',
      currency: 'BRL'
    };
    expect(res.body).toEqual(soup);
  });

  it('POST /countries should create a new country', async () => {
    const resp = await request(app).post('/countries').send(
      { name: 'America', population: 331, capital: 'Washington, D.C.', currency: 'USD' });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('America');
  });

  it('PUT /countries/:id should update country', async () => {
    const resp = await request(app)
      .put('/countries/2')
      .send({ name: 'America\'s Hat' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('America\'s Hat');
  });

  it('DELETE /countries/:id should delete a country', async () => {
    const resp = await request(app).delete('/countries/2');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/countries/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
