import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Deals from '../components/Deals';

describe('Deals', () => {
  const spaceJam = {
    id: 1,
    name: 'SpaceJam',
    deal_stage: { id: 1, percent: 100, name: 'Won!' },
    user: { id: 1, first_name: 'Michael', last_name: 'Jordan' },
    value: '1000000000',
  };

  const pagination = {
    page: 1,
    per_page: 1,
    total: 2,
    pages: 1,
  };

  const firstPage = { entries: [spaceJam], pagination };

  global.fetch = jest.fn(async () => ({
    json: () => Promise.resolve(firstPage),
  }));

  it('matches snapshot', () => {
    const tree = renderer
      .create(<Deals deals={firstPage} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('mounts', () => {
    const wrapper = mount(<Deals deals={firstPage} />);
    expect(wrapper).not.toBeNull();
  });
});
