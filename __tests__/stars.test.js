const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('star routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/stars should return a list of stars', async () => {
    const resp = await request(app).get('/stars');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', name: 'Epsilon Indi A' },
      { id: '2', name: 'DX Cancri' },
      { id: '3', name: 'The Sun' },
      { id: '4', name: 'PSR J0108-1431' },
      { id: '5', name: 'Aldebaran' },
    ]);
  });

  it('/stars/:id should return star detail', async () => {
    const res = await request(app).get('/stars/1');
    const testStar = {
      id: '1',
      name: 'Epsilon Indi A',
      type: 'Orange Dwarf',
      distance: 11.8
    };
    expect(res.body).toEqual(testStar);
  });

  it('POST /stars should create a new star', async () => {
    const resp = await request(app).post('/stars').send(
      { name: 'Sirius B', type: 'White Dwarf', distance: 8.6 });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Sirius B');
  });

  it('PUT /stars/:id should update star', async () => {
    const resp = await request(app)
      .put('/stars/3')
      .send({ name: 'Sol' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Sol');
  });

  it('DELETE /stars/:id should delete a star', async () => {
    const resp = await request(app).delete('/stars/2');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/stars/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
