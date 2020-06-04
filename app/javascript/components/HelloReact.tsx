import * as React from 'react';

interface Props {
  name: string;
 }

const HelloReact = ({ name }: Props) => (
  <h1 className="title">
    {' '}
    Hello
    {name}
    !
  </h1>
);

export default HelloReact;
