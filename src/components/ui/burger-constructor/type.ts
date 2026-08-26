// #region Imports
import { TOrder } from '@utils-types';
// #endregion

// #region Types
export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
// #endregion
