// #region Imports
import { TNewOrder } from '@api';
// #endregion

// #region Types
export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TNewOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
// #endregion
