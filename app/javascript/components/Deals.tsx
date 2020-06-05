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

interface Deal {
  id: number;
  name: string;
  user: User;
  deal_stage: Stage;
 }

interface Pagination {
 page: number;
 per_page: number;
 pages: number;
 total: number;
}

interface Props {
 deals: {
   entries: Deal[],
   pagination: Pagination,
 },
}

const Deals = ({ deals }: Props) => (
  <div className="deals">
    <pre className="has-text-monospaced">
      {JSON.stringify(deals, null, 2)}
    </pre>
  </div>
);

export default Deals;
