export const dig = (object: object, property: string) => {
  const [head, ...rest] = property.split('.');
  const currentValue = object[head];

  if (!currentValue) return null;
  if (rest.length === 0) return currentValue;

  return dig(currentValue, rest.join('.'));
};

export const sort = (collection: any[], column: string, direction = 'ASC') => (
  collection.sort((a, b) => {
    const x = parseFloat(dig(a, column)) || 0;
    const y = parseFloat(dig(b, column)) || 0;

    if (x === y) return 0;
    if (x < y) return direction === 'ASC' ? -1 : 1;

    return direction === 'ASC' ? 1 : -1;
  })
);
