// #region Imports
import { TIngredient } from '@utils-types';
// #endregion

// #region Types
export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  ingredientsCounters: Record<string, number>;
};
// #endregion
