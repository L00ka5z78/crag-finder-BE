import { CragRecord } from '../records/crag-record';
import { CragEntity } from '../types';
import { pool } from '../utils/connectDb';

let crag: CragRecord;

const defaultObject = {
  name: 'Test name',
  description: 'crag description',
  url: 'https//google.com',
  routes: 123,
  lat: 9,
  lon: 9,
};

afterAll(async () => {
  await pool.end();
});

describe('Adding CragRecord.GetOne()', () => {
  test('If CragRecord returns data from database for single entry', async () => {
    const crag = await CragRecord.getOneCragById(
      'bbb5b116-ec11-11ed-b2e9-204747011e7c'
    );

    console.log(crag);

    // test piece. WORKS WELL

    // expect(crag).toBeDefined();
    // if (crag) {
    //   expect(crag.id).toBe('asd');
    //   expect(crag.name).toBe('test');
    //   expect(crag.description).toBe('test one');
    //   expect(crag.url).toBe('http://test.com');
    //   expect(crag.lat).toBe(45);
    //   expect(crag.lon).toBe(45);
    // }

    expect(crag).toBeDefined();
    expect(crag.id).toBe('bbb5b116-ec11-11ed-b2e9-204747011e7c');
    expect(crag.name).toBe('Krkavka');
  });

  test('If CragRecord returns null from database for unexisting entry', async () => {
    const crag = await CragRecord.getOneCragById('---');

    expect(crag).toBeNull();
  });
});

describe('Adding CragRecord.listAllCrags', () => {
  test('If CragRecord returns an array of found entries', async () => {
    const crag = await CragRecord.listAllCrags('');
    expect(crag).not.toEqual([]);
    expect(crag[0].id).toBeDefined();
  });

  test('If CragRecord returns data from database for all entry when searching for "a"', async () => {
    const crag = await CragRecord.listAllCrags('a');
    expect(crag).not.toEqual([]);
    expect(crag[0].id).toBeDefined();
  });

  test('If CragRecord returns an empty array when searching something doesnt exist', async () => {
    const crag = await CragRecord.listAllCrags('-------------------------');
    expect(crag).toEqual([]);
  });

  test('If CragRecord returns smaller amount of data', async () => {
    const crag = await CragRecord.listAllCrags('');
    expect((crag[0] as CragEntity).id).toBeDefined();
    expect((crag[0] as CragEntity).lat).toBeDefined();
    expect((crag[0] as CragEntity).lon).toBeDefined();
  });
});

describe('If CragRecord.createNewCrag creates new crag', () => {
  test('If  CragRecord.createNewCrag returns new UUID', async () => {
    const crag = new CragRecord(defaultObject);

    await crag.createNewCrag();

    expect(crag.id).toBeDefined();
    expect(typeof crag.id).toBe('string');
  });

  test('If CragRecord.createNewCrag add data to database', async () => {
    const crag = new CragRecord(defaultObject);
    await crag.createNewCrag();

    const foundCrag = await CragRecord.getOneCragById(crag.id);

    expect(foundCrag).toBeDefined();
    expect(foundCrag).not.toBeNull();
    expect(foundCrag!.id).toBe(crag.id);
  });
});

describe('If CragRecord.deleteCrag removes crag from database', () => {
  test('If CragRecord.deleteCrag removes data from database', async () => {
    const crag = new CragRecord(defaultObject);
    await crag.createNewCrag();

    const foundCrag = await CragRecord.getOneCragById(crag.id);

    expect(foundCrag).not.toBeDefined();
    expect(foundCrag!.id).not.toBe(crag.id);
  });
});

describe('If CragRecord.updateCragDetails updates given crag', () => {
  // test doesnt pass
  test('If CragRecord.updateCragDetails add data to database', async () => {
    const crag = new CragRecord(defaultObject);
    await crag.updateCragDetails();

    const foundCrag = await CragRecord.getOneCragById(crag.id);

    expect(foundCrag).toBeDefined();
    expect(foundCrag).not.toBeNull();
    expect(foundCrag!.id).toBe(crag.id);
  });
});
