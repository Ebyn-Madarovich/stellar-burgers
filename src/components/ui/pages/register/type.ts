// #region Imports
import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';
// #endregion

// #region Types
export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
};
// #endregion
