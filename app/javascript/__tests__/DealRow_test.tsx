import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DealRow from '../components/DealRow';

describe('DealRow', () => {
  const persona5 = {
    id: 3,
    name: 'Persona 5',
    deal_stage: { id: 3, percent: 100, name: 'Wont!' },
    user: { id: 3, first_name: 'Ren', last_name: 'Amamiya' },
    value: '99999999999999',
  };

  it('matches snapshot', () => {
    const tree = renderer
      .create(<DealRow deal={persona5} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
