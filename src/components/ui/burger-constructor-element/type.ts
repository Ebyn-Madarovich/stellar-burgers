// #region Imports
import { TConstructorIngredient } from '@utils-types';
// #endregion

// #region Types
export type BurgerConstructorElementUIProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleClose: () => void;
};
// #endregion
