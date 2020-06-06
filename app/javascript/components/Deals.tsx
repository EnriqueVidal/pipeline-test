import * as React from 'react';
import Bar from './Bar';
import DealRow from './DealRow';
import useTabular, { Deal } from '../packs/useTabular';
import usePagination, { Pagination } from '../packs/usePagination';
import { navigate } from '../packs/navigation';

interface Props {
 deals: {
   entries: Deal[],
   pagination: Pagination,
 },
}

const BASE_API_URL = '/api/v1/deals';

const Deals = ({ deals }: Props) => {
  const {
    currentDeals, direction, setDeals, sortColumn,
  } = useTabular(deals.entries);

  const {
    changeLimit,
    moveBack,
    moveForward,
    pagination,
  } = usePagination(deals.pagination);

  const { page, per_page: perPage } = pagination;

  const sortableTile = `Sort ${direction}`;

  React.useEffect(() => {
    const abortController = new AbortController();

    fetch([BASE_API_URL, page, perPage].join('/'), {
      signal: abortController.signal,
    })
      .then(async (response) => {
        const { entries } = await response.json();

        if (abortController.signal.aborted) {
          return;
        }

        setDeals(entries);
      });

    return () => abortController.abort();
  }, [page, perPage]);

  const handleMoveBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate(page - 1);
    moveBack();
  };

  const handleMoveForward = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate(page + 1);
    moveForward();
  };

  const handleSelectLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    changeLimit(parseInt(value, 10));
  };

  const handleSort = (columnName: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    sortColumn(columnName);
  };

  return (
    <div className="deals">
      <Bar
        handleMoveBack={handleMoveBack}
        handleMoveForward={handleMoveForward}
        handleSelectLimit={handleSelectLimit}
        pagination={pagination}
      />
      <div className="content">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>
                <a href="#" onClick={handleSort('id')} title={sortableTile}>ID</a>
              </th>
              <th>User</th>
              <th>Name</th>
              <th>
                <a href="#" onClick={handleSort('value')} title={sortableTile}>Value</a>
              </th>
              <th>Stage</th>
              <th>
                <a
                  href="#"
                  onClick={handleSort('deal_stage.percent')}
                  title={sortableTile}
                >
                  Progress
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDeals.map((deal) => <DealRow key={deal.id} deal={deal} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Deals.defaultProps = {
  deals: [],
};

export default Deals;
