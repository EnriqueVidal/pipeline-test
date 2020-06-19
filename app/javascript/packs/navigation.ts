export const navigate = (page: number) => (
  window.history.pushState({}, '', `/${page}`)
);
