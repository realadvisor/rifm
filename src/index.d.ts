import * as React from 'react';

interface RifmRenderArgs<E> {
  value: string;
  onChange: React.ChangeEventHandler<E>;
}

interface RifmProps<E> {
  value: string;
  onChange: (str: string) => void;
  format: (str: string) => string;
  replace?: (str: string) => string;
  append?: (str: string) => string;
  mask?: boolean;
  accept?: RegExp;
  children: (args: RifmRenderArgs<E>) => React.ReactNode;
}

declare class Rifm<E = HTMLInputElement> extends React.Component<
  RifmProps<E>
> {}

export { Rifm };
