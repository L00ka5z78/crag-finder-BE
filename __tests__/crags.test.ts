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
    const crag = await CragRecord.getOneCragById('abc');

    expect(crag).toBeDefined();
    expect(crag.id).toBe('abc');
    expect(crag.title).toBe('Krkavka');
  });

  test('If CragRecord returns null from database for unexisting entry', async () => {
    const crag = await CragRecord.getOneCragById('---');

    expect(crag).toBeNull();
  });
});
