const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/dogs should return a list of dogs', async () => {
    const resp = await request(app).get('/dogs');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', name: 'Soup', age: 3 },
      { id: '2', name: 'Cricket', age: 16 },
      { id: '3', name: 'Bear', age: 8 },
      { id: '4', name: 'Pasta', age: 1 },
      { id: '5', name: 'Howard', age: 9 },
    ]);
  });

  it('/dogs/:id should return dog detail', async () => {
    const res = await request(app).get('/dogs/1');
    const soup = {
      id: '1',
      name: 'Soup',
      age: 3,
      eyes: 'blue',
      fur: 'tan'
    };
    console.log(soup);
    console.log('bruh');
    console.log(res.body);
    expect(res.body).toEqual(soup);
  });

  it('POST /dogs should create a new dog', async () => {
    const resp = await request(app).post('/dogs').send({ name: 'Doug', age: 2, eyes: 'empty', fur: 'purple' });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Doug');
  });

  it('PUT /dogs/:id should update dog', async () => {
    const resp = await request(app)
      .put('/dogs/2')
      .send({ name: 'Linguini' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Linguini');
  });

  it('DELETE /dogs/:id should delete a dog', async () => {
    const resp = await request(app).delete('/dogs/2');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/dogs/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
