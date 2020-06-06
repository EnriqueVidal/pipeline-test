import { renderHook, act } from '@testing-library/react-hooks';
import usePagination from '../packs/usePagination';

describe('usePagination', () => {
  const initialValue = {
    page: 1,
    per_page: 5,
    pages: 20,
    total: 100,
  };

  it('moves forward', () => {
    const { result } = renderHook(() => usePagination(initialValue));

    act(result.current.moveForward);
    expect(result.current.pagination.page).toBe(2);
  });

  it('moves backwards', () => {
    const { result } = renderHook(() => usePagination({ ...initialValue, page: 2 }));

    act(result.current.moveBack);
    expect(result.current.pagination.page).toBe(1);
  });

  it('can change limit', () => {
    const { result } = renderHook(() => usePagination(initialValue));

    act(() => result.current.changeLimit(10));
    expect(result.current.pagination.per_page).toBe(10);
  });
});
