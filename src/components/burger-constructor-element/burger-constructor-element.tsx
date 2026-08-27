// #region Imports
import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { moveIngredient, removeIngredient } from '@slices';
import { useDispatch } from '../../services/store';

// #endregion

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        moveIngredient({
          fromIndex: index,
          toIndex: index + 1
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        moveIngredient({
          fromIndex: index,
          toIndex: index - 1
        })
      );
    };

    const handleRemove = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleRemove}
      />
    );
  }
);
