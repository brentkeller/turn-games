import * as React from 'react';
import { MainHeader } from './MainHeader';

interface AppShellProps {
  children?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
};
