import * as React from 'react';

interface User {
 id: number;
 first_name: string;
 last_name: string;
}

interface Stage {
  id: number;
  percent: number;
  name: string;
}

export interface Deal {
  id: number;
  name: string;
  deal_stage: Stage;
  user: User;
  value: string;
 }

interface Hook {
  currentDeals: Deal[];
  direction: string;
  setDeals: (deals: Deal[]) => void;
  sortColumn: (column: string) => void;
}

export const dig = (object: object, property: string) => {
  const [head, ...rest] = property.split('.');
  const currentValue = object[head];

  if (!currentValue) return null;
  if (rest.length === 0) return currentValue;

  return dig(currentValue, rest.join('.'));
};

const useTabular = (propDeals: Deal[]): Hook => {
  const [currentDeals, setDeals] = React.useState(propDeals);
  const [direction, setDirection] = React.useState('ASC');

  const sortDeals = async (direction = 'asc', column = 'deal_stage.percent') => {
    const sorted = currentDeals.sort((a, b) => {
      const x = parseFloat(dig(a, column)) || 0;
      const y = parseFloat(dig(b, column)) || 0;

      if (x === y) return 0;
      if (x < y) return direction === 'ASC' ? 1 : -1;
      if (x > y) return direction === 'ASC' ? -1 : 1;
    });

    setDeals(sorted);
  };

  const sortColumn = (column: string) => {
    const sortAs = direction === 'DESC' ? 'ASC' : 'DESC';

    sortDeals(sortAs, column);
    setDirection(sortAs);
  };

  return {
    currentDeals,
    direction,
    setDeals,
    sortColumn,
  };
};

export default useTabular;
