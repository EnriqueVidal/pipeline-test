import * as React from 'react';
import { Pagination } from '../packs/pipelines.td';

interface Props {
 handleMoveBack: React.MouseEventHandler<HTMLButtonElement>;
  handleMoveForward: React.MouseEventHandler<HTMLButtonElement>;
  handleSelectLimit: React.ChangeEventHandler<HTMLSelectElement>;
  pagination: Pagination;
}

const Bar = ({
  handleMoveBack, handleMoveForward, handleSelectLimit, pagination,
}: Props) => {
  const { page, pages, per_page: perPage } = pagination;

  return (
    <div className="floating-bar columns is-mobile">
      <div className="column">
        <button
          className="button is-link is-small"
          disabled={page === 1}
          onClick={handleMoveBack}
          type="button"
        >
          {'<'}
          {' '}
          Back
        </button>
      </div>
      <div className="column">
        <div className="field">
          <div className="control is-expanded">
            <div className="select is-fullwidth is-small">
              <select id="perPage" onChange={handleSelectLimit} value={perPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="buttons is-right">
          <button
            className="button is-link is-small"
            disabled={page === pages}
            onClick={handleMoveForward}
            type="button"
          >
            Forward
            {' '}
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bar;
