// #region Imports
import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';
// #endregion

// #region Types
export type LoginUIProps = PageUIProps & {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};
// #endregion
