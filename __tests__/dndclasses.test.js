const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dndClass routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/dndclasses should return a list of dndclasses', async () => {
    const resp = await request(app).get('/dndclasses');
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

  it('/dndclasses/:id should return dndClass detail', async () => {
    const res = await request(app).get('/dndclasses/1');
    const fighter = {
      id: '1',
      name: 'Fighter',
      primary_stat: 'Strength',
      original_edition: 1,
      caster: false
    };
    expect(res.body).toEqual(fighter);
  });

  it('POST /dndclasses should create a new dndClass', async () => {
    const resp = await request(app).post('/dndclasses').send(
      { name: 'Monk', primary_stat: 'Wisdom', original_edition: 2, caster: false
      });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Monk');
  });

  it('PUT /dndclasses/:id should update dndClass', async () => {
    const resp = await request(app)
      .put('/dndclasses/2')
      .send({ name: 'Magic-User' });
    //which is, i found out today, the actual original name of the class
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Magic-User');
  });

  it('DELETE /dndclasses/:id should delete a dndClass', async () => {
    const resp = await request(app).delete('/dndclasses/2');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/dndclasses/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
