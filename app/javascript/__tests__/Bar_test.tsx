import * as React from 'react';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';
import Bar from '../components/Bar';

describe('Bar', () => {
  const handleMoveBack = jest.fn();
  const handleMoveForward = jest.fn();
  const handleSelectLimit = jest.fn();
  const pagination = {
    page: 1,
    per_page: 5,
    pages: 2,
    total: 10,
  };


  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Bar
          handleMoveBack={handleMoveBack}
          handleMoveForward={handleMoveForward}
          handleSelectLimit={handleSelectLimit}
          pagination={pagination}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('mounts', () => {
    const wrapper = mount(
      <Bar
        handleMoveBack={handleMoveBack}
        handleMoveForward={handleMoveForward}
        handleSelectLimit={handleSelectLimit}
        pagination={pagination}
      />,
    );

    expect(wrapper).not.toBeNull();
  });

  it('clicks Forward', () => {
    const wrapper = mount(
      <Bar
        handleMoveBack={handleMoveBack}
        handleMoveForward={handleMoveForward}
        handleSelectLimit={handleSelectLimit}
        pagination={pagination}
      />,
    );

    const forward = wrapper.find('.button').filterWhere((button) => button.text() === 'Forward >');
    forward.simulate('click');

    expect(handleMoveForward).toHaveBeenCalled();
  });

  it('has Back disabled when sitting on the first page', () => {
    const wrapper = mount(
      <Bar
        handleMoveBack={handleMoveBack}
        handleMoveForward={handleMoveForward}
        handleSelectLimit={handleSelectLimit}
        pagination={pagination}
      />,
    );

    const forward = wrapper.find('.button').filterWhere((button) => button.text() === '< Back');
    expect(forward.props().disabled).toBeTruthy();
  });

  it('selects', () => {
    const wrapper = mount(
      <Bar
        handleMoveBack={handleMoveBack}
        handleMoveForward={handleMoveForward}
        handleSelectLimit={handleSelectLimit}
        pagination={pagination}
      />,
    );


    const perPage = wrapper.find('select').first();
    perPage.simulate('change', { target: { value: 5 } });

    expect(handleSelectLimit).toHaveBeenCalled();
  });
});
