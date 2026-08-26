// #region Imports
import { ReactNode } from 'react';
// #endregion

// #region Types
export type TModalProps = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
};
// #endregion
