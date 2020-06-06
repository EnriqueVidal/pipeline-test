import { dig, sort } from '../objectHelper';

describe('Object dig', () => {
  const objectMock = {
    user: {
      firstName: 'John',
      lastName: 'Doe',
    },
    title: 'My blog post',
  };

  it('handles unexisting properties', () => {
    expect(dig(objectMock, 'unexisting')).toBe(null);
  });

  it('handles unexisting despite depth', () => {
    expect(dig(objectMock, 'deep.unexisting')).toBe(null);
  });

  it('can find deeply nested values', () => {
    expect(dig(objectMock, 'user.firstName')).toBe('John');
  });
});

describe('Object sort', () => {
  const collectionMock = [
    { child: { age: 2 }, likes: 9 },
    { child: { age: 10 }, likes: 5 },
    { child: { age: 3 }, likes: 10 },
  ];

  const byLikesASC = [
    { child: { age: 10 }, likes: 5 },
    { child: { age: 2 }, likes: 9 },
    { child: { age: 3 }, likes: 10 },
  ];

  const byAgeASC = [
    { child: { age: 2 }, likes: 9 },
    { child: { age: 3 }, likes: 10 },
    { child: { age: 10 }, likes: 5 },
  ];

  const collectionWithString = [
    { value: '1', name: 'Ni' },
    { value: 'zero', name: 'Zero' },
    { value: '', name: 'Ichi' },
    { value: '2', name: 'San' },
  ];

  describe('ASC', () => {
    it('can sort by shallow field', () => {
      expect(sort(collectionMock, 'likes')).toEqual(byLikesASC);
    });

    it('can sort by deeply nested field', () => {
      expect(sort(collectionMock, 'child.age')).toEqual(byAgeASC);
    });
  });

  describe('DESC', () => {
    it('can sort by shallow field', () => {
      expect(sort(collectionMock, 'likes', 'DESC')).toEqual(byLikesASC.reverse());
    });

    it('can sort by deeply nested field', () => {
      expect(sort(collectionMock, 'child.age', 'DESC')).toEqual(byAgeASC.reverse());
    });
  });

  describe('will try to cast string to number', () => {
    const sorted = sort(collectionWithString, 'value').map(({ name }) => name);
    expect(sorted).toEqual(['Zero', 'Ichi', 'Ni', 'San']);
  });
});
