import { CragRecord } from '../records/crag-record';

const defaultObject = {
  name: 'Test name',
  description: 'crag description',
  url: 'https//google.com',
  lat: 9,
  lon: 9,
};

test('If it builds CragRecord', () => {
  const crag = new CragRecord(defaultObject);

  expect(crag.name).toBe('Test name');
  expect(crag.description).toBe('crag description');
});

test('Checks if name is valid', () => {
  expect(() => new CragRecord({ ...defaultObject, name: '' })).toThrow(
    "Crags name can't be empty or longer than 100 characters"
  );

  expect(
    () => new CragRecord({ ...defaultObject, name: 'x'.repeat(101) })
  ).toThrow("Crags name can't be empty or longer than 100 characters");
});

test('If it validates invalid description', () => {
  expect(
    () => new CragRecord({ ...defaultObject, description: 'x'.repeat(1001) })
  ).toThrow("Crags description can't be longer than 1000 characters");
});

test('If it validates invalid url', () => {
  expect(
    () =>
      new CragRecord({
        ...defaultObject,
        url: '',
      })
  ).toThrow("URL address can't be empty or longer than 100 characters");

  expect(
    () => new CragRecord({ ...defaultObject, url: 'x'.repeat(101) })
  ).toThrow("URL address can't be empty or longer than 100 characters");
});

test('If it validates invalid lat/lon', () => {
  expect(
    () => new CragRecord({ ...defaultObject, lat: 'x' as never, lon: 9 })
  ).toThrow('Invalid coordinates');
  expect(
    () => new CragRecord({ ...defaultObject, lat: 9, lon: 'x' as never })
  ).toThrow('Invalid coordinates');
});
