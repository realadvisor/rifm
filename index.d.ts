import React from 'react';

interface RifmProps {
  value: string;
  onChange: (str: string) => void;
  format: (str: string) => string;
  replace?: (str: string) => boolean;
  refuse?: RegExp;
  children: (
    value: string,
    onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
  ) => React.ReactNode;
}

declare class Rifm extends React.Component<RifmProps> {}

export { Rifm };
