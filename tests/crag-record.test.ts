import { CragRecord } from '../records/crag-record';

test('If builds CragRecord', () => {
  const crag = new CragRecord({
    name: 'Test name',
    description: 'crag description',
    url: 'https//google.com',
    lat: 9,
    lon: 9,
  });

  expect(crag.name).toBe('Test name');
  expect(crag.description).toBe('crag description');
});
