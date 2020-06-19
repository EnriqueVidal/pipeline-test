import * as React from 'react';
import { sort } from './objectHelper';

interface Hook<T> {
  currentEntries: T[];
  direction: string;
  setEntries: (deals: T[]) => void;
  sortColumn: (column: string) => void;
}

const useTabular = <T>(propEntries: T[]): Hook<T> => {
  const [currentEntries, setEntries] = React.useState(propEntries);
  const [direction, setDirection] = React.useState('ASC');

  const sortColumn = (column: string) => {
    const sortAs = direction === 'DESC' ? 'ASC' : 'DESC';

    setEntries((entries) => sort(entries, column, direction));
    setDirection(sortAs);
  };

  return {
    currentEntries,
    direction,
    setEntries,
    sortColumn,
  };
};

export default useTabular;
