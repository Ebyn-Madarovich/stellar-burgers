// #region Imports
import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';
// #endregion

// #region Types
export type ResetPasswordUIProps = Omit<PageUIProps, 'email' | 'setEmail'> & {
  password: string;
  token: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;
};
// #endregion
