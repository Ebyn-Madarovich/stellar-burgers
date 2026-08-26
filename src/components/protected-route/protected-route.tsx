// #region Imports
import { FC, ReactElement } from 'react';
// #endregion

// #region Types
type TProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};
// #endregion

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children }) =>
  children;
