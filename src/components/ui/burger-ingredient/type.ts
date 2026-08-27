// #region Imports
import { Location } from 'react-router-dom';
import { TIngredient } from '@utils-types';
// #endregion

// #region Types
export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
  handleAdd: () => void;
};
// #endregion
