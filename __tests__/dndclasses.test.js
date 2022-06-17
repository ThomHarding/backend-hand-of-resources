const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dndClass routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/dndClasses should return a list of dndClasses', async () => {
    const resp = await request(app).get('/dndClasses');
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

  it('/dndClasses/:id should return dndClass detail', async () => {
    const res = await request(app).get('/dndClasses/1');
    const soup = {
      id: '1',
      name: 'Soup',
      primary_stat: 3,
      original_edition: 'blue',
      caster: 'tan'
    };
    expect(res.body).toEqual(soup);
  });

  it('POST /dndClasses should create a new dndClass', async () => {
    const resp = await request(app).post('/dndClasses').send(
      { name: 'Monk', primary_stat: 'Wisdom', original_edition: 2, caster: false
      });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Monk');
  });

  it('PUT /dndClasses/:id should update dndClass', async () => {
    const resp = await request(app)
      .put('/dndClasses/2')
      .send({ name: 'Magic-User' });
    //which is, i found out today, the actual original name of the class
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Magic-User');
  });

  it('DELETE /dndClasses/:id should delete a dndClass', async () => {
    const resp = await request(app).delete('/dndClasses/2');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/dndClasses/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
