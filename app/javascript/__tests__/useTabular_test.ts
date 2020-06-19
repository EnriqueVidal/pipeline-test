import { renderHook, act } from '@testing-library/react-hooks';
import useTabular from '../packs/useTabular';
import { Deal } from '../packs/pipelines.td';

describe('useTabular', () => {
  const spaceJam = {
    id: 1,
    name: 'SpaceJam',
    deal_stage: { id: 1, percent: 100, name: 'Won!' },
    user: { id: 1, first_name: 'Michael', last_name: 'Jordan' },
    value: '1000000000',
  };

  const ghostBusters = {
    id: 2,
    name: 'Ghostbusters',
    deal_stage: { id: 2, percent: 50, name: 'Negotiating...' },
    user: { id: 2, first_name: 'Bill', last_name: 'Murray' },
    value: '100000000',
  };

  const persona5 = {
    id: 3,
    name: 'Persona 5',
    deal_stage: { id: 3, percent: 100, name: 'Wont!' },
    user: { id: 3, first_name: 'Ren', last_name: 'Amamiya' },
    value: '99999999999999',
  };

  const initialValue = [spaceJam, ghostBusters];
  const stealYourHeart = [persona5];

  it('it starts with ASC direction', () => {
    const { result } = renderHook(() => useTabular<Deal>(initialValue));
    expect(result.current.direction).toBe('ASC');
  });

  it('sorts by property in any direction', () => {
    const { result } = renderHook(() => useTabular<Deal>(initialValue));

    /* sort ASC */
    act(() => result.current.sortColumn('value'));
    expect(result.current.currentEntries).toEqual(initialValue.reverse());

    /* sort DESC */
    act(() => result.current.sortColumn('value'));
    expect(result.current.currentEntries).toEqual(initialValue);
  });

  it('replaces currentEntries', () => {
    const { result } = renderHook(() => useTabular<Deal>(initialValue));

    expect(result.current.currentEntries).toEqual(initialValue);
    act(() => result.current.setEntries(stealYourHeart));
    expect(result.current.currentEntries).toEqual(stealYourHeart);
  });
});
