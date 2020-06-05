import * as React from 'react';
import usePagination, { Pagination } from '../packs/usePagination';
import { navigate } from '../packs/navigation';

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

interface Deal {
  id: number;
  name: string;
  user: User;
  deal_stage: Stage;
 }

interface Props {
 deals: {
   entries: Deal[],
   pagination: Pagination,
 },
}

const BASE_API_URL = '/api/v1/deals';

const Deals = ({ deals }: Props) => {
  const [currentDeals, setDeals] = React.useState(deals.entries);
  const {
    changeLimit,
    moveBack,
    moveForward,
    pagination,
  } = usePagination(deals.pagination);

  const { page, per_page: perPage, pages } = pagination;

  React.useEffect(() => {
    const abortController = new AbortController();
    const { page: propsPage, per_page: propsPerPage } = deals.pagination;

    if (page !== propsPage || perPage !== propsPerPage) {
      fetch([BASE_API_URL, page, perPage].join('/'), {
        signal: abortController.signal,
      })
        .then(async (response) => {
          const { entries: deals } = await response.json();

          if (abortController.signal.aborted) {
            return;
          }

          setDeals(deals);
        });
    }

    return () => {
      abortController.abort();
    };
  }, [page, perPage]);

  const handleMoveForward = (event) => {
    event.preventDefault();

    navigate(page + 1);
    moveForward();
  };

  const handleMoveBack = (event) => {
    event.preventDefault();

    navigate(page - 1);
    moveBack();
  };

  const handleSelectLimit = (event) => {
    const { value } = event.target;
    changeLimit(value);
  };

  return (
    <div className="deals">
      <div className="floating-bar columns is-mobile">
        <div className="column">
          <button className="button is-link is-small" disabled={page === 1} onClick={handleMoveBack}>
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
            <button className="button is-link is-small" disabled={page === pages} onClick={handleMoveForward}>
              Forward
              {' '}
              {'>'}
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <pre className="has-text-monospaced">
          {JSON.stringify(currentDeals, null, 2)}
        </pre>
      </div>
    </div>
  );
};

Deals.defaultProps = {
  deals: [],
};

export default Deals;
