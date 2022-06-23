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
  
  it('POST /hats should create a new hat', async () => {
    const resp = await request(app).post('/hats').send(
      { name: 'Bowler Cap', color: 6, width: 2 });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Bowler Cap');
  });

  it('DELETE /hats/:id should delete a hat', async () => {
    const resp = await request(app).delete('/hats/2');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/hats/2');
    expect(body).toEqual('');
  });

  it('PUT /hats/:id should update hat', async () => {
    const resp = await request(app)
      .put('/hats/3')
      .send({ name: 'None' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('None');
  });

  afterAll(() => {
    pool.end();
  });
});
