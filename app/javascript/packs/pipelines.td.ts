export interface Pagination {
 page: number;
 per_page: number;
 pages: number;
 total: number;
}

export interface Stage {
  id: number;
  percent: number;
  name: string;
}

export interface User {
 id: number;
 first_name: string;
 last_name: string;
}

export interface Deal {
  id: number;
  name: string;
  deal_stage: Stage;
  user: User;
  value: string;
 }
