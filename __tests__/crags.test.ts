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

    // different test piece. WORKS WELL

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
