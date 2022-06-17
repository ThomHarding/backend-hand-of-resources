const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('class routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/classes should return a list of classes', async () => {
    const resp = await request(app).get('/classes');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { id: '1', name: 'Fighter', primary_stat: 'Strength' },
      { id: '2', name: 'Wizard', primary_stat: 'Intelligence' },
      { id: '3', name: 'Sorcerer', primary_stat: 'Charisma' },
      { id: '4', name: 'Artificer', primary_stat: 'Intelligence' },
      { id: '5', name: 'Cleric', primary_stat: 'Wisdom' },
      { id: '6', name: 'Warlock', primary_stat: 'Charisma' },
      { id: '7', name: 'Paladin', primary_stat: 'Charisma' },
      { id: '8', name: 'Druid', primary_stat: 'Wisdom' },
      { id: '9', name: 'Rogue', primary_stat: 'Dexterity' },
    ]);
  });

  it('/classes/:id should return class detail', async () => {
    const res = await request(app).get('/classes/1');
    const soup = {
      id: '1',
      name: 'Soup',
      primary_stat: 3,
      original_edition: 'blue',
      caster: 'tan'
    };
    expect(res.body).toEqual(soup);
  });

  it('POST /classes should create a new class', async () => {
    const resp = await request(app).post('/classes').send(
      { name: 'Monk', primary_stat: 'Wisdom', original_edition: 2, caster: false
      });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Monk');
  });

  it('PUT /classes/:id should update class', async () => {
    const resp = await request(app)
      .put('/classes/2')
      .send({ name: 'Magic-User' });
    //which is, i found out today, the actual original name of the class
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Magic-User');
  });

  it('DELETE /classes/:id should delete a class', async () => {
    const resp = await request(app).delete('/classes/2');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/classes/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
