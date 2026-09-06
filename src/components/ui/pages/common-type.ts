// #region Imports
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
// #endregion

// #region Types
export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
};
// #endregion
