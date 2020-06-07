import * as React from 'react';
import Bar from './Bar';
import DealRow from './DealRow';
import useTabular from '../packs/useTabular';
import usePagination from '../packs/usePagination';
import { navigate } from '../packs/navigation';
import { Deal, Pagination } from '../packs/pipelines.td';

interface Props {
  entries: Deal[],
  pagination: Pagination,
}

const BASE_API_URL = '/api/v1/deals';

const Deals = ({ entries: entriesProp, pagination: paginationProp }: Props) => {
  const {
    currentEntries, direction, setEntries, sortColumn,
  } = useTabular<Deal>(entriesProp);

  const {
    changeLimit,
    moveBack,
    moveForward,
    pagination,
  } = usePagination(paginationProp);

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

        setEntries(entries);
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
            {currentEntries.map((deal) => <DealRow key={deal.id} deal={deal} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deals;
