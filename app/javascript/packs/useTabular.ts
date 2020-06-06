import * as React from 'react';
import { sort } from './objectHelper';

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

const useTabular = (propDeals: Deal[]): Hook => {
  const [currentDeals, setDeals] = React.useState(propDeals);
  const [direction, setDirection] = React.useState('ASC');

  const sortColumn = (column: string) => {
    const sortAs = direction === 'DESC' ? 'ASC' : 'DESC';

    setDeals((deals) => sort(deals, column, direction));
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
