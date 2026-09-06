// #region Imports
import { TIngredient } from '@utils-types';
// #endregion

// #region Types
export type TIngredientsCategoryProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
};
// #endregion
