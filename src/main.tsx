import { FC } from 'react';
import { render } from 'react-dom';

console.log('Hello World');

export type Foo = {
  bar: string;
};

const Component: FC<Foo> = ({ bar }) => <h1>{bar}</h1>;

render(<Component bar="hello world" />, document.body);
