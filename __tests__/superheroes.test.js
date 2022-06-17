const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('superhero routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/superheroes should return a list of superheroes', async () => {
    const resp = await request(app).get('/superheroes');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', name: 'Skitter' },
      { id: '2', name: 'One For All' },
      { id: '3', name: 'Morbius' }
    ]);
  });

  it('/superheroes/:id should return superhero detail', async () => {
    const res = await request(app).get('/superheroes/1');
    const soup = {
      id: '1',
      name: 'Skitter',
      real_name: 'Taylor Hebert',
      foe_name: 'None',
      hometown: 'Brockton Bay'
    };
    expect(res.body).toEqual(soup);
  });

  it('POST /superheroes should create a new superhero', async () => {
    const resp = await request(app).post('/superheroes').send(
      { name: 'Captain America',
        real_name: 'Steve Rogers',
        foe_name: 'Red Skull',
        hometown: 'New York City' });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe(' Captain America');
  });

  it('PUT /superheroes/:id should update superhero', async () => {
    const resp = await request(app)
      .put('/superheroes/2')
      .send({ name: '#MORBIUSSWEEP' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('#MORBIUSSWEEP');
  });

  it('DELETE /superheroes/:id should delete a superhero', async () => {
    const resp = await request(app).delete('/superheroes/2');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/superheroes/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
