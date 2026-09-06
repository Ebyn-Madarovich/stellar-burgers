// #region Imports
import { ReactNode } from 'react';
// #endregion

// #region Types
export type TModalUIProps = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
};
// #endregion
