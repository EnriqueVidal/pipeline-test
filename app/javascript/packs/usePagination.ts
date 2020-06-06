import * as React from 'react';

export interface Pagination {
 page: number;
 per_page: number;
 pages: number;
 total: number;
}

interface Action {
  type: 'CHANGE_LIMIT' | 'MOVE_BACK' | 'MOVE_FORWARD';
  payload?: number
}

interface Hook {
  changeLimit: (payload: number) => void;
  moveBack: () => void;
  moveForward: () => void;
  pagination: Pagination;
}

const usePagination = (propsPagination: Pagination): Hook => {
  const [pagination, dispatch] = React.useReducer((state: Pagination, action: Action) => {
    switch (action.type) {
      case 'CHANGE_LIMIT':
        return { ...state, per_page: action.payload };

      case 'MOVE_BACK':
        return { ...state, page: state.page - 1 };

      case 'MOVE_FORWARD':
        return { ...state, page: state.page + 1 };

      /* istanbul ignore next */
      default: // Impossible action with consistent return
        return state;
    }
  },
  propsPagination);

  const changeLimit = (payload: number) => dispatch({ type: 'CHANGE_LIMIT', payload });
  const moveBack = () => dispatch({ type: 'MOVE_BACK' });
  const moveForward = () => dispatch({ type: 'MOVE_FORWARD' });

  return {
    changeLimit,
    moveForward,
    moveBack,
    pagination,
  };
};

export default usePagination;
