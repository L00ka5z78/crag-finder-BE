import { CragRecord } from '../records/crag-record';

let ad: CragRecord;

const defaultObject = {
  name: 'Test name',
  description: 'crag description',
  url: 'https//google.com',
  lat: 9,
  lon: 9,
};

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
  test('If CragRecord returns data from database for all entry when searching for "a"', async () => {
    const crag = await CragRecord.listAllCrags('te');
    expect(crag).not.toEqual([]);
  });

  test('If CragRecord returns an empty array when searching something doesnt exist', async () => {
    const crag = await CragRecord.listAllCrags('cbf');
    expect(crag).toEqual([]);
  });

  test('If CragRecord returns smaller amount of data', async () => {
    const crag = await CragRecord.listAllCrags('te');
    expect(crag[0].id).toBeDefined();
    expect(crag[0].lat).toBeDefined();
    expect(crag[0].lon).toBeDefined();
  });
});

describe('If CragRecord.createNewCrag create new crag', () => {
  test('If  CragRecord.createNewCrag returns new UUID', async () => {
    const add = new CragRecord(defaultObject);
    expect(add.id).toBeDefined();
    expect(typeof add.id).toBe('string');
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
